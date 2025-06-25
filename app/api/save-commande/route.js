import { NextResponse } from 'next/server';
import { kv } from '@vercel/kv';

export async function POST(request) {
  try {
    const { paymentIntentId, orderData } = await request.json();

    // Sauvegarder la commande complète dans Vercel KV
    const commandeKey = `commande:${paymentIntentId}`;
    const commande = {
      id: paymentIntentId,
      orderData: orderData,
      createdAt: new Date().toISOString(),
      status: 'en_attente'
    };

    await kv.set(commandeKey, commande);
    
    // Ajouter à la liste des commandes
    await kv.lpush('commandes', paymentIntentId);

    return NextResponse.json({ success: true });
  } catch (error) {
    console.error('Erreur sauvegarde commande:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la sauvegarde' },
      { status: 500 }
    );
  }
}

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

    // Trier par date de création (plus récentes en premier)
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