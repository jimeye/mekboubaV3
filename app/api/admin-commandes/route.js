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

function ensureDataDir() {
  const dataDir = path.dirname(COMMANDES_FILE);
  if (!fs.existsSync(dataDir)) {
    fs.mkdirSync(dataDir, { recursive: true });
  }
}

function readCommandes() {
  try {
    ensureDataDir();
    if (!fs.existsSync(COMMANDES_FILE)) {
      return [];
    }
    const data = fs.readFileSync(COMMANDES_FILE, 'utf8');
    return JSON.parse(data);
  } catch (error) {
    console.error('Erreur lecture commandes:', error);
    return [];
  }
}

export async function GET() {
  try {
    let commandes = [];
    
    if (hasUpstash && redis) {
      // Mode production : Upstash Redis
      console.log('[API LOG] Utilisation Upstash Redis');
      const commandeIds = await redis.lrange('commandes', 0, -1);
      
      for (const id of commandeIds) {
        const commandeData = await redis.get(`commande:${id}`);
        if (commandeData) {
          // Parser les données JSON depuis Upstash
          const commande = typeof commandeData === 'string' ? JSON.parse(commandeData) : commandeData;
          commandes.push(commande);
        }
      }
    } else {
      // Mode local : fichier JSON
      console.log('[API LOG] Utilisation fichier JSON local');
      commandes = readCommandes();
    }

    // Traiter les commandes pour l'affichage
    const processedCommandes = commandes.map(commande => {
      const { orderData } = commande;
      const { deliveryDate, deliveryTime, firstName, lastName, phone, sbmLots, bbmLots, notes, isHotel, selectedHotel, roomNumber, address, postalCode, city, country, boulettesSuppGlobal } = orderData;

      // Calculer les totaux
      const sbmCount = sbmLots && Array.isArray(sbmLots) ? sbmLots.reduce((sum, lot) => sum + lot.qty, 0) : 0;
      const bbmCount = bbmLots && Array.isArray(bbmLots) ? bbmLots.reduce((sum, lot) => sum + lot.qty, 0) : 0;
      const boulettesSupp = boulettesSuppGlobal || 0;
      const total = (sbmCount + bbmCount) * 26 + (boulettesSupp * 5);

      // Construire l'adresse de livraison
      let deliveryAddress = '';
      if (isHotel === 'yes') {
        deliveryAddress = `${selectedHotel} - Chambre ${roomNumber}`;
      } else {
        deliveryAddress = `${address}, ${postalCode} ${city}, ${country}`;
      }

      return {
        id: commande.id,
        orderNumber: `CMD${new Date(commande.createdAt).getTime()}`,
        deliveryDate,
        deliveryTime,
        customerName: `${firstName} ${lastName}`,
        phone,
        hotel: isHotel === 'yes' ? selectedHotel : 'Adresse privée',
        roomNumber: isHotel === 'yes' ? roomNumber : '',
        deliveryAddress,
        sbmLots: sbmLots || [],
        bbmLots: bbmLots || [],
        sbmCount,
        bbmCount,
        boulettesSupp,
        total,
        status: commande.status,
        notes: notes || '',
        created: new Date(commande.createdAt).getTime() / 1000,
        amount: total * 100
      };
    });

    // Trier par date de création (plus récent en premier)
    const sortedCommandes = processedCommandes.sort((a, b) => b.created - a.created);
    
    return NextResponse.json({ 
      commandes: sortedCommandes,
      message: 'Commandes récupérées avec succès'
    });
  } catch (error) {
    console.error('Erreur API admin-commandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' }, 
      { status: 500 }
    );
  }
} 