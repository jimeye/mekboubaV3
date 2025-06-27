// Script pour ne garder que les deux dernières commandes dans Upstash Redis
// À lancer avec: node utils/clean_upstash_duplicates.js

const { Redis } = require('@upstash/redis');

const redis = new Redis({
  url: process.env.UPSTASH_REDIS_REST_URL,
  token: process.env.UPSTASH_REDIS_REST_TOKEN,
});

async function keepLastTwo() {
  const keyList = 'commandes';
  const commandeIds = await redis.lrange(keyList, 0, -1);
  if (commandeIds.length <= 2) {
    console.log('Il y a déjà 2 commandes ou moins, rien à faire.');
    return;
  }
  // On garde les deux premiers (les plus récents)
  const toKeep = commandeIds.slice(0, 2);
  const toDelete = commandeIds.slice(2);

  // Remplace la liste par les deux derniers
  await redis.del(keyList);
  for (let i = toKeep.length - 1; i >= 0; i--) {
    await redis.lpush(keyList, toKeep[i]);
  }
  console.log(`Commandes conservées: ${toKeep.join(', ')}`);
  console.log(`Commandes supprimées: ${toDelete.join(', ')}`);

  // Supprime les clés orphelines (commande:...) des commandes supprimées
  for (const id of toDelete) {
    const key = `commande:${id}`;
    await redis.del(key);
    console.log(`Clé supprimée: ${key}`);
  }
}

keepLastTwo().then(() => process.exit(0)); 