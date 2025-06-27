// Script de nettoyage des doublons dans Upstash Redis
// À lancer avec: node utils/clean_upstash_duplicates.js

const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function cleanDuplicates() {
  const keyList = 'commandes';
  const commandeIds = await redis.lrange(keyList, 0, -1);
  const seen = new Set();
  const uniqueIds = [];
  const duplicates = [];

  for (const id of commandeIds) {
    if (seen.has(id)) {
      duplicates.push(id);
    } else {
      seen.add(id);
      uniqueIds.push(id);
    }
  }

  // Remplace la liste par la version sans doublons
  if (duplicates.length > 0) {
    await redis.del(keyList);
    for (let i = uniqueIds.length - 1; i >= 0; i--) {
      await redis.lpush(keyList, uniqueIds[i]);
    }
    console.log(`Doublons supprimés: ${duplicates.length}`);
  } else {
    console.log('Aucun doublon trouvé.');
  }

  // Optionnel: supprimer les clés orphelines (commande:...) qui ne sont plus dans la liste
  // const allKeys = await redis.keys('commande:*');
  // for (const key of allKeys) {
  //   const id = key.split(':')[1];
  //   if (!seen.has(id)) {
  //     await redis.del(key);
  //     console.log(`Clé orpheline supprimée: ${key}`);
  //   }
  // }
}

cleanDuplicates().then(() => process.exit(0)); 