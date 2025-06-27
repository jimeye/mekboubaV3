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

export async function GET() {
  if (!hasUpstash || !redis) {
    return NextResponse.json({ error: 'Upstash non configuré' }, { status: 500 });
  }
  // Incrémente le compteur global
  const counterKey = 'orderNumberCounter';
  const counter = await redis.incr(counterKey);
  // Génère le numéro de commande du type CMD JJMM-555XXX (3 chiffres)
  const now = new Date();
  const day = now.getDate().toString().padStart(2, '0');
  const month = (now.getMonth() + 1).toString().padStart(2, '0');
  const numCmd = `CMD ${day}${month}-555${counter.toString().padStart(3, '0')}`;
  return NextResponse.json({ orderNumber: numCmd });
} 