import { NextResponse } from 'next/server';

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

export const dynamic = "force-dynamic";

export async function POST(request) {
  try {
    if (!hasUpstash || !redis) {
      return NextResponse.json({ error: 'Upstash non configuré' }, { status: 500 });
    }

    const { orderNumber } = await request.json();
    
    if (!orderNumber) {
      return NextResponse.json({ error: 'Numéro de commande requis' }, { status: 400 });
    }

    console.log(`🗑️ Suppression de la commande: ${orderNumber}`);

    // 1. Supprimer de la liste 'commandes'
    const keyList = 'commandes';
    const commandeIds = await redis.lrange(keyList, 0, -1);
    const indexToRemove = commandeIds.indexOf(orderNumber);
    
    if (indexToRemove === -1) {
      return NextResponse.json({ 
        error: `Commande ${orderNumber} non trouvée dans la liste`,
        commandes: commandeIds
      }, { status: 404 });
    }

    // Supprimer de la liste
    await redis.lrem(keyList, 1, orderNumber);
    console.log(`🗑️ Commande supprimée de la liste: ${orderNumber}`);

    // 2. Supprimer la clé 'commande:orderNumber'
    const commandeKey = `commande:${orderNumber}`;
    await redis.del(commandeKey);
    console.log(`🗑️ Clé supprimée: ${commandeKey}`);

    // 3. Supprimer de la liste 'orderNumbers' et la clé 'orderNumber:orderNumber'
    const orderNumbers = await redis.lrange('orderNumbers', 0, -1);
    const orderNumberIndex = orderNumbers.indexOf(orderNumber);
    
    if (orderNumberIndex !== -1) {
      await redis.lrem('orderNumbers', 1, orderNumber);
      console.log(`🗑️ Numéro supprimé de la liste orderNumbers: ${orderNumber}`);
    }

    const orderNumberKey = `orderNumber:${orderNumber}`;
    await redis.del(orderNumberKey);
    console.log(`🗑️ Clé orderNumber supprimée: ${orderNumberKey}`);

    return NextResponse.json({ 
      message: `Commande ${orderNumber} supprimée avec succès!`,
      commandeSupprimee: orderNumber
    });
    
  } catch (error) {
    console.error('❌ Erreur lors de la suppression:', error);
    return NextResponse.json({ error: 'Erreur lors de la suppression' }, { status: 500 });
  }
} 