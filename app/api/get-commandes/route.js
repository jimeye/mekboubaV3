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
      console.log('[API LOG] Fichier commandes.json non trouvé, retourne tableau vide');
      return [];
    }
    const data = fs.readFileSync(COMMANDES_FILE, 'utf8');
    console.log('[API LOG] Lecture du fichier commandes.json OK');
    return JSON.parse(data);
  } catch (error) {
    console.error('[API LOG] Erreur lecture commandes:', error);
    return [];
  }
}

export async function GET(request) {
  try {
    console.log('[API LOG] Début GET /api/get-commandes');
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');
    console.log('[API LOG] Paramètre date:', date);

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
    console.log('[API LOG] Nombre de commandes lues:', commandes.length);

    // Filtrer par date si spécifiée
    const filteredCommandes = date 
      ? commandes.filter(commande => {
          const commandeDate = new Date(commande.orderData.deliveryDate);
          const selectedDate = new Date(date);
          return commandeDate.toDateString() === selectedDate.toDateString();
        })
      : commandes;
    console.log('[API LOG] Nombre de commandes après filtre date:', filteredCommandes.length);

    // Traiter les commandes pour l'affichage
    const processedCommandes = filteredCommandes.map(commande => {
      const { orderData } = commande;
      const { deliveryDate, deliveryTime, firstName, lastName, phone, sbmLots, bbmLots, notes, isHotel, selectedHotel, roomNumber, otherHotelName, otherHotelAddress, otherHotelPostalCode, otherHotelCity, otherHotelCountry, address, postalCode, city, country, boulettesSuppGlobal } = orderData;

      // Calculer les totaux
      const sbmCount = sbmLots && Array.isArray(sbmLots) ? sbmLots.reduce((sum, lot) => sum + lot.qty, 0) : 0;
      const bbmCount = bbmLots && Array.isArray(bbmLots) ? bbmLots.reduce((sum, lot) => sum + lot.qty, 0) : 0;
      const boulettesSupp = boulettesSuppGlobal || 0;
      const total = (sbmCount + bbmCount) * 26 + (boulettesSupp * 5);

      // Construire l'adresse de livraison
      let deliveryAddress = '';
      if (isHotel === 'yes') {
        if (selectedHotel === 'Autre') {
          deliveryAddress = `${otherHotelName} - Chambre ${roomNumber}`;
        } else {
          deliveryAddress = `${selectedHotel} - Chambre ${roomNumber}`;
        }
      } else {
        deliveryAddress = `${address}, ${postalCode} ${city}, ${country}`;
      }

      // Convertir l'heure de livraison en minutes pour le tri
      const timeToMinutes = (timeStr) => {
        const time = timeStr.split(' à ')[0]; // Prendre le début de la plage horaire
        const [hours, minutes] = time.split(':').map(Number);
        return hours * 60 + minutes;
      };

      return {
        id: commande.id,
        orderNumber: `CMD${new Date(commande.createdAt).getTime()}`,
        deliveryDate,
        deliveryTime,
        deliveryTimeMinutes: timeToMinutes(deliveryTime),
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
        amount: total * 100 // Convertir en centimes pour compatibilité
      };
    });
    console.log('[API LOG] Nombre de commandes après mapping:', processedCommandes.length);

    // Trier par date de livraison puis par heure
    const sortedCommandes = processedCommandes.sort((a, b) => {
      if (a.deliveryDate !== b.deliveryDate) {
        return a.deliveryDate.localeCompare(b.deliveryDate);
      }
      return a.deliveryTimeMinutes - b.deliveryTimeMinutes;
    });
    console.log('[API LOG] Commandes triées, retour JSON');

    return NextResponse.json({ commandes: sortedCommandes });

  } catch (error) {
    console.error('[API LOG] Erreur récupération commandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
} 