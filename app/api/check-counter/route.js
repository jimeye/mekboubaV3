import { NextResponse } from 'next/server';

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

export async function GET() {
  try {
    if (!hasUpstash || !redis) {
      return NextResponse.json({ error: 'Upstash non configuré' }, { status: 500 });
    }

    const counterKey = 'orderNumberCounter';
    
    // Récupère la valeur actuelle du compteur
    const currentCounter = await redis.get(counterKey);
    
    // Récupère toutes les clés qui commencent par 'orderNumber'
    const keys = await redis.keys('orderNumber*');
    
    return NextResponse.json({ 
      currentCounter: currentCounter || 0,
      counterKey: counterKey,
      allCounterKeys: keys,
      upstashUrl: process.env.UPSTASH_REDIS_REST_URL ? '✅ Configuré' : '❌ Non configuré'
    });
    
  } catch (error) {
    console.error('❌ Erreur check-counter:', error);
    return NextResponse.json({ error: 'Erreur lors de la vérification' }, { status: 500 });
  }
}

export async function POST() {
  try {
    if (!hasUpstash || !redis) {
      return NextResponse.json({ error: 'Upstash non configuré' }, { status: 500 });
    }
    const counterKey = 'orderNumberCounter';
    await redis.set(counterKey, 0);
    return NextResponse.json({ message: 'Compteur réinitialisé à 0' });
  } catch (error) {
    console.error('❌ Erreur reset-counter:', error);
    return NextResponse.json({ error: 'Erreur lors de la réinitialisation' }, { status: 500 });
  }
} 