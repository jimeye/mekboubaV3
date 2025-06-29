import { NextResponse } from 'next/server';
import fs from 'fs';
import path from 'path';

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