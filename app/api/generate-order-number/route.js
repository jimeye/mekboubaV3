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

export async function GET(req) {
  if (!hasUpstash || !redis) {
    return NextResponse.json({ error: 'Upstash non configuré' }, { status: 500 });
  }
  // Infos de debug
  const nowDate = new Date().toISOString();
  const ip = req?.headers?.get('x-forwarded-for') || req?.ip || 'inconnue';
  const userAgent = req?.headers?.get('user-agent') || 'inconnu';
  // Incrémente le compteur global
  const counterKey = 'orderNumberCounter';
  console.log('🔍 [DEBUG] Appel API generate-order-number', { nowDate, ip, userAgent });
  const counter = await redis.incr(counterKey);
  console.log('🔍 [DEBUG] Compteur incrémenté à:', counter);
  // Génère le numéro de commande du type CMDJJMM-555XXX (3 chiffres)
  const now = new Date();
  const day = now.toLocaleString('fr-FR', { day: '2-digit', timeZone: 'Europe/Paris' });
  const month = now.toLocaleString('fr-FR', { month: '2-digit', timeZone: 'Europe/Paris' });
  const numCmd = `CMD${day}${month}-555${counter.toString().padStart(3, '0')}`;
  console.log('🔍 [DEBUG] Numéro généré:', numCmd);
  return NextResponse.json({ orderNumber: numCmd });
} 