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
    
    if (commandeIds.length <= 2) {
      return NextResponse.json({ 
        message: 'Il y a déjà 2 commandes ou moins, rien à faire.',
        commandes: commandeIds 
      });
    }
    
    // On garde les deux premières (les plus récentes)
    const toKeep = commandeIds.slice(0, 2);
    const toDelete = commandeIds.slice(2);

    // Remplace la liste par les deux dernières
    await redis.del(keyList);
    for (let i = toKeep.length - 1; i >= 0; i--) {
      await redis.lpush(keyList, toKeep[i]);
    }
    
    console.log(`✅ Commandes conservées: ${toKeep.join(', ')}`);
    console.log(`🗑️ Commandes supprimées: ${toDelete.join(', ')}`);

    // Supprime les clés orphelines (commande:...) des commandes supprimées
    for (const id of toDelete) {
      const key = `commande:${id}`;
      await redis.del(key);
      console.log(`🗑️ Clé supprimée: ${key}`);
    }
    
    return NextResponse.json({ 
      message: 'Nettoyage terminé avec succès!',
      commandesConservees: toKeep,
      commandesSupprimees: toDelete
    });
    
  } catch (error) {
    console.error('❌ Erreur lors du nettoyage:', error);
    return NextResponse.json({ error: 'Erreur lors du nettoyage' }, { status: 500 });
  }
} 