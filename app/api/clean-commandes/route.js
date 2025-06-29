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

export async function POST() {
  try {
    if (!hasUpstash || !redis) {
      return NextResponse.json({ error: 'Upstash non configuré' }, { status: 500 });
    }

    const keyList = 'commandes';
    const commandeIds = await redis.lrange(keyList, 0, -1);
    
    console.log(`📋 Commandes trouvées: ${commandeIds.length}`);
    console.log(`📝 IDs: ${commandeIds.join(', ')}`);
    
    if (commandeIds.length === 0) {
      return NextResponse.json({ 
        message: "Il n'y a déjà aucune commande.",
        commandes: []
      });
    }
    // On ne garde aucune commande
    const toDelete = commandeIds;
    await redis.del(keyList);
    console.log(`🗑️ Toutes les commandes supprimées: ${toDelete.join(', ')}`);
    // Supprime les clés orphelines (commande:...) des commandes supprimées
    for (const id of toDelete) {
      const key = `commande:${id}`;
      await redis.del(key);
      console.log(`🗑️ Clé supprimée: ${key}`);
    }

    // Supprimer toutes les clés orderNumber:... listées dans la liste Redis 'orderNumbers'
    const orderNumbers = await redis.lrange('orderNumbers', 0, -1);
    if (orderNumbers.length > 0) {
      const orderNumberKeys = orderNumbers.map(num => `orderNumber:${num}`);
      await redis.del(...orderNumberKeys);
      await redis.del('orderNumbers'); // Vider la liste
      console.log(`🗑️ Clés orderNumber supprimées: ${orderNumberKeys.join(', ')}`);
    }

    // Réinitialiser le compteur à zéro
    await redis.set('orderNumberCounter', 0);
    return NextResponse.json({ 
      message: 'Toutes les commandes et clés orderNumber ont été supprimées et le compteur a été réinitialisé!',
      commandesSupprimees: toDelete,
      orderNumberKeysSupprimees: orderNumberKeys
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
    return NextResponse.json({ error: 'Erreur lors du nettoyage' }, { status: 500 });
  }
} 