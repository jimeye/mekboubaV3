import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function GET(request) {
  try {
    const { searchParams } = new URL(request.url);
    const date = searchParams.get('date');

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

    // Filtrer par date si spécifiée
    const filteredCommandes = date 
      ? commandes.filter(commande => {
          const commandeDate = new Date(commande.orderData.deliveryDate);
          const selectedDate = new Date(date);
          return commandeDate.toDateString() === selectedDate.toDateString();
        })
      : commandes;

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

    // Trier par date de livraison puis par heure
    const sortedCommandes = processedCommandes.sort((a, b) => {
      if (a.deliveryDate !== b.deliveryDate) {
        return a.deliveryDate.localeCompare(b.deliveryDate);
      }
      return a.deliveryTimeMinutes - b.deliveryTimeMinutes;
    });

    return NextResponse.json({ commandes: sortedCommandes });

  } catch (error) {
    console.error('Erreur récupération commandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' },
      { status: 500 }
    );
  }
} 