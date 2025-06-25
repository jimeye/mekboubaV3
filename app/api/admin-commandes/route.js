import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET() {
  try {
    // Récupérer tous les IDs de commandes
    const commandeIds = await kv.lrange('commandes', 0, -1);
    
    // Récupérer les détails de chaque commande
    const commandes = [];
    for (const id of commandeIds) {
      const commande = await kv.get(`commande:${id}`);
      if (commande) {
        commandes.push(commande);
      }
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