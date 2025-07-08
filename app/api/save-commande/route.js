import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';
import nodemailer from 'nodemailer';

// Détection Upstash
const hasUpstash = process.env.UPSTASH_REDIS_REST_URL && process.env.UPSTASH_REDIS_REST_TOKEN;
let redis = null;
if (hasUpstash) {
  const { Redis } = require('@upstash/redis');
  redis = new Redis({
    url: process.env.UPSTASH_REDIS_REST_URL,
    token: process.env.UPSTASH_REDIS_REST_TOKEN,
  });
}

// Chemin vers le fichier JSON des commandes
const COMMANDES_FILE = path.join(process.cwd(), 'data', 'commandes.json');

// Fonction pour s'assurer que le dossier data existe
function ensureDataDir() {
  const dataDir = path.dirname(COMMANDES_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

// Fonction pour lire les commandes
function readCommandes() {
  try {
    ensureDataDir();
    if (!fs.existsSync(COMMANDES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(COMMANDES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('[API LOG] Erreur lecture commandes:', error);
    return [];
  }
}

// Fonction pour écrire les commandes
function writeCommandes(commandes) {
  try {
    ensureDataDir();
    fs.writeFileSync(COMMANDES_FILE, JSON.stringify(commandes, null, 2), 'utf8');
  } catch (error) {
    console.error('[API LOG] Erreur écriture commandes:', error);
  }
}

// Fonction pour générer un joli template HTML de confirmation de commande
function generateOrderEmailHTML(commande) {
  const { firstName, lastName, email, phone, orderNumber, deliveryDate, deliveryTime, sbmLots, bbmLots, boulettesSuppGlobal, notes, isHotel, selectedHotel, roomNumber, address, postalCode, city, country, total } = commande;
  const produits = [
    ...(sbmLots || []).map(lot => `<li>${lot.qty} x Sandwich Boulettes Mekbouba</li>`),
    ...(bbmLots || []).map(lot => `<li>${lot.qty} x Boulettes Mekbouba Box</li>`),
    boulettesSuppGlobal ? `<li>${boulettesSuppGlobal} x Boulettes supplémentaires</li>` : ''
  ].filter(Boolean).join('');
  const adresseLivraison = isHotel === 'yes'
    ? `${selectedHotel} - Chambre ${roomNumber}`
    : `${address}, ${postalCode} ${city}, ${country}`;
  return `
    <div style="font-family:Arial,sans-serif;max-width:600px;margin:auto;border:1px solid #eee;padding:24px;border-radius:12px;">
      <h2 style="color:#b91c1c;">Merci pour votre commande !</h2>
      <p>Bonjour <b>${firstName} ${lastName}</b>,</p>
      <p>Votre commande <b>${orderNumber}</b> a bien été validée et payée.</p>
      <h3>Détails de la commande :</h3>
      <ul>${produits}</ul>
      <p><b>Date de livraison :</b> ${deliveryDate} à ${deliveryTime}</p>
      <p><b>Adresse de livraison :</b> ${adresseLivraison}</p>
      <p style="font-size:1.1em;"><b>Total payé :</b> <span style="color:#b91c1c;font-size:1.2em;">${(total || 0).toFixed(2)} €</span></p>
      ${notes ? `<p><b>Notes :</b> ${notes}</p>` : ''}
      <hr style="margin:24px 0;">
      <p>Nous vous remercions pour votre confiance.<br>L'équipe La Boulette Ibiza 🌶️</p>
      <p style="font-size:12px;color:#888;">Ceci est un email automatique, merci de ne pas répondre directement.</p>
      <div style="margin-top:32px;text-align:center;color:#b91c1c;font-size:1.1em;line-height:1.1;">
        LA BOULETTE IBIZA 🌶️<br>
        🕍 Kosher Friendly 🕍<br>
        Cuisine certifiée 100% judéo-tunisienne,<br>
        transmise de génération en génération.<br>
        Viande Kosher by Bovini.
      </div>
    </div>
  `;
}

// Fonction d'envoi d'email avec Nodemailer
async function sendOrderConfirmationEmail(commande) {
  // Configure le transporteur SMTP Ionos
  const transporter = nodemailer.createTransport({
    host: 'smtp.ionos.fr',
    port: 465,
    secure: true,
    auth: {
      user: process.env.IONOS_EMAIL_USER,
      pass: process.env.IONOS_EMAIL_PASS,
    },
  });
  const html = generateOrderEmailHTML(commande);
  const mailOptions = {
    from: `La Boulette Ibiza <${process.env.IONOS_EMAIL_USER}>`,
    to: commande.email,
    bcc: 'info@laboulette-ibiza.com', // copie admin
    subject: `Confirmation de votre commande ${commande.orderNumber}`,
    html,
  };
  await transporter.sendMail(mailOptions);
}

export async function POST(req) {
  console.log('[API LOG] save-commande appelée');
  try {
    const body = await req.json();
    const { paymentIntentId, commande } = body;
    if (!paymentIntentId || !commande) {
      console.log('[API LOG] Données manquantes', { paymentIntentId, commande });
      return NextResponse.json({ error: 'Données manquantes' }, { status: 400 });
    }

    // Créer la structure complète de la commande
    const commandeComplete = {
      id: paymentIntentId,
      paymentIntentId,
      orderData: commande,
      createdAt: new Date().toISOString(),
      status: 'payé'
    };

    // Vérification d'unicité du numéro de commande (orderNumber)
    const orderNumber = commande?.orderNumber;
    if (!orderNumber) {
      return NextResponse.json({ error: 'Numéro de commande manquant' }, { status: 400 });
    }

    if (hasUpstash && redis) {
      try {
        // Vérification atomique avec SETNX
        const orderNumberKey = `orderNumber:${orderNumber}`;
        const setnxRes = await redis.set(orderNumberKey, paymentIntentId, { nx: true });
        if (!setnxRes) {
          // La clé existe déjà, donc commande déjà enregistrée
          return NextResponse.json({ ok: true, idempotent: true, message: 'Commande déjà existante pour ce numéro (atomic)' });
        }
        // Ajout dans la liste des commandes
        const keyList = 'commandes';
        const keyDetail = `commande:${paymentIntentId}`;
        await redis.lpush(keyList, paymentIntentId);
        await redis.set(keyDetail, JSON.stringify(commandeComplete));
        // Ajout du orderNumber dans la liste dédiée
        await redis.lpush('orderNumbers', orderNumber);
        // ENVOI EMAIL ICI
        await sendOrderConfirmationEmail(commande);
        return NextResponse.json({ ok: true });
      } catch (err) {
        console.error('[API LOG] Erreur Upstash', err);
        return NextResponse.json({ error: 'Erreur Upstash', details: err?.message || err }, { status: 500 });
      }
    } else {
      // Mode local : fichier JSON
      console.log('[API LOG] Utilisation fichier JSON local');
      const commandes = readCommandes();
      if (commandes.some(c => c.orderData?.orderNumber === orderNumber)) {
        return NextResponse.json({ ok: true, idempotent: true, message: 'Commande déjà existante pour ce numéro' });
      }
      commandes.push(commandeComplete);
      writeCommandes(commandes);
      // ENVOI EMAIL ICI
      await sendOrderConfirmationEmail(commande);
      return NextResponse.json({ ok: true });
    }
  } catch (error) {
    console.error('[API LOG] Erreur générale save-commande', error);
    return NextResponse.json({ error: 'Erreur serveur', details: error?.message || error }, { status: 500 });
  }
}

export async function GET() {
  try {
    let commandes = [];
    if (hasUpstash && redis) {
      // Upstash Redis
      const commandeIds = await redis.lrange('commandes', 0, -1);
      for (const id of commandeIds) {
        const commande = await redis.get(`commande:${id}`);
        if (commande) commandes.push(commande);
      }
    } else {
      // Fichier local
      commandes = readCommandes();
    }
    commandes.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
    return NextResponse.json(commandes);
  } catch (error) {
    console.error('Erreur lecture commandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la lecture' },
      { status: 500 }
    );
  }
} 