import { NextResponse } from 'next/server';
import Stripe from 'stripe';
// import { Redis } from '@upstash/redis';

const stripe = new Stripe(process.env.STRIPE_SECRET_KEY);
// const redis = new Redis({
//   url: process.env.UPSTASH_REDIS_REST_URL,
//   token: process.env.UPSTASH_REDIS_REST_TOKEN,
// });

export async function POST(request) {
  try {
    const { amount, paymentType, orderData } = await request.json();

    // Génère un identifiant unique pour la commande
    const commandeId = crypto.randomUUID ? crypto.randomUUID() : Math.random().toString(36).substring(2);

    // Stocke la commande complète dans Redis (désactivé)
    // await redis.set(`commande:${commandeId}`, JSON.stringify(orderData));
    console.log('Commande à enregistrer :', commandeId, orderData);

    let paymentIntent;

    if (paymentType === 'cash_validation') {
      paymentIntent = await stripe.paymentIntents.create({
        amount: 0, // 0€ pour validation
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: { commandeId },
      });
    } else {
      paymentIntent = await stripe.paymentIntents.create({
        amount: amount, // Montant en centimes
        currency: 'eur',
        payment_method_types: ['card'],
        metadata: { commandeId },
      });
    }

    return NextResponse.json({ clientSecret: paymentIntent.client_secret, commandeId });
  } catch (error) {
    console.error('Erreur création payment intent:', error);
    return NextResponse.json({ error: 'Erreur lors de la création du paiement' }, { status: 500 });
  }
} 
