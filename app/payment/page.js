'use client';

import { useState, useEffect } from 'react';
import { loadStripe } from '@stripe/stripe-js';
import { Elements, CardElement, useStripe, useElements, PaymentRequestButtonElement } from '@stripe/react-stripe-js';
import { useRouter, useSearchParams } from 'next/navigation';

// Charger Stripe (remplacer par ta clé publique)
const stripePromise = loadStripe(process.env.NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY || 'pk_test_...');

const PaymentForm = ({ orderData, paymentType, amount }) => {
  const stripe = useStripe();
  const elements = useElements();
  const router = useRouter();
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [paymentRequest, setPaymentRequest] = useState(null);
  const [prButtonReady, setPrButtonReady] = useState(false);
  const [success, setSuccess] = useState(false);

  useEffect(() => {
    if (stripe) {
      const pr = stripe.paymentRequest({
        country: 'FR',
        currency: 'eur',
        total: {
          label: 'Total',
          amount: amount * 100,
        },
        requestPayerName: true,
        requestPayerEmail: true,
      });

      // Gérer les événements Apple Pay
      pr.on('paymentmethod', async (event) => {
        setLoading(true);
        setError(null);

        try {
          // Créer l'intention de paiement
          const response = await fetch('/api/create-payment-intent', {
            method: 'POST',
            headers: {
              'Content-Type': 'application/json',
            },
            body: JSON.stringify({
              amount: amount * 100,
              paymentType,
              orderData
            }),
          });

          const { clientSecret, error: apiError } = await response.json();

          if (apiError) {
            throw new Error(apiError);
          }

          // Confirmer le paiement Apple Pay
          const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
            payment_method: event.paymentMethod.id,
          });

          if (confirmError) {
            event.complete('fail');
            setError(confirmError.message);
          } else {
            event.complete('success');
            setSuccess(true);
            // Succès - rediriger vers confirmation
            const successUrl = paymentType === 'cash_validation' 
              ? `/payment-success?type=cash&orderData=${encodeURIComponent(JSON.stringify(orderData))}`
              : `/payment-success?type=full&orderData=${encodeURIComponent(JSON.stringify(orderData))}`;
            
            router.push(successUrl);
          }
        } catch (err) {
          event.complete('fail');
          setError(err.message);
        } finally {
          setLoading(false);
        }
      });

      pr.on('cancel', () => {
        setError('Paiement annulé');
      });

      pr.canMakePayment().then(result => {
        if (result) {
          setPaymentRequest(pr);
        }
      });
    }
  }, [stripe, amount, paymentType, orderData, router]);

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setError(null);

    if (!stripe || !elements) {
      setLoading(false);
      return;
    }

    try {
      // Créer l'intention de paiement
      const response = await fetch('/api/create-payment-intent', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          amount: amount * 100, // Convertir en centimes
          paymentType,
          orderData
        }),
      });

      const { clientSecret, error: apiError } = await response.json();

      if (apiError) {
        throw new Error(apiError);
      }

      // Confirmer le paiement
      const { error: confirmError } = await stripe.confirmCardPayment(clientSecret, {
        payment_method: {
          card: elements.getElement(CardElement),
        }
      });

      if (confirmError) {
        setError(confirmError.message);
      } else {
        // Succès - rediriger vers confirmation
        const successUrl = paymentType === 'cash_validation' 
          ? `/payment-success?type=cash&orderData=${encodeURIComponent(JSON.stringify(orderData))}`
          : `/payment-success?type=full&orderData=${encodeURIComponent(JSON.stringify(orderData))}`;
        
        router.push(successUrl);
      }
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-6">
      <div className="bg-white p-6 rounded-lg shadow-md">
        <h3 className="text-lg font-semibold mb-4">
          {paymentType === 'cash_validation' 
            ? '💰 Validation pour paiement en espèces' 
            : '💳 Paiement complet'
          }
        </h3>
        
        <div className="mb-4">
          <p className="text-gray-600 mb-2">
            {paymentType === 'cash_validation' 
              ? 'Votre carte sera validée (0€) pour confirmer votre commande. Le paiement se fera en espèces à la livraison.'
              : `Montant à payer : ${amount}€`
            }
          </p>
        </div>

        {/* Bouton Apple Pay / Google Pay */}
        {paymentRequest && (
          <div className="mb-6">
            <div className="text-center mb-3">
              <p className="text-sm text-gray-600 mb-2">
                💳 Paiement rapide et sécurisé
              </p>
            </div>
            <PaymentRequestButtonElement
              options={{
                paymentRequest,
                style: {
                  paymentRequestButton: {
                    type: 'default',
                    theme: 'dark',
                    height: '48px',
                  },
                },
              }}
              onReady={() => setPrButtonReady(true)}
              onClick={event => {
                // Optionnel : gestion d'événements
              }}
            />
            {!prButtonReady && (
              <div className="text-gray-500 text-sm mt-2 text-center">Chargement du bouton Apple Pay / Google Pay…</div>
            )}
            <div className="text-center mt-3">
              <p className="text-xs text-gray-500">
                {paymentType === 'cash_validation' 
                  ? 'Validation gratuite pour confirmer votre commande'
                  : `Paiement sécurisé de ${amount}€`
                }
              </p>
            </div>
          </div>
        )}

        {/* Séparateur si Apple Pay est disponible */}
        {paymentRequest && (
          <div className="relative mb-6">
            <div className="absolute inset-0 flex items-center">
              <div className="w-full border-t border-gray-300"></div>
            </div>
            <div className="relative flex justify-center text-sm">
              <span className="px-2 bg-white text-gray-500">ou</span>
            </div>
          </div>
        )}

        <div className="border border-gray-300 rounded-lg p-4 mb-4">
          <CardElement
            options={{
              style: {
                base: {
                  fontSize: '16px',
                  color: '#424770',
                  '::placeholder': {
                    color: '#aab7c4',
                  },
                },
                invalid: {
                  color: '#9e2146',
                },
              },
            }}
          />
        </div>

        {error && (
          <div className="bg-red-50 border border-red-200 text-red-700 px-4 py-3 rounded-lg mb-4">
            {error}
          </div>
        )}

        {success && (
          <div className="text-green-600 font-bold text-center my-4">
            Paiement validé ! Merci pour votre commande.
          </div>
        )}

        <button
          type="submit"
          disabled={!stripe || loading}
          className="w-full bg-accent-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-red/90 disabled:bg-gray-400 disabled:cursor-not-allowed transition-colors"
        >
          {loading ? 'Traitement...' : 
            paymentType === 'cash_validation' 
              ? '✅ Valider ma commande (0€)' 
              : `💳 Payer ${amount}€`
          }
        </button>
      </div>
    </form>
  );
};

export default function PaymentPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [amount, setAmount] = useState(0);

  useEffect(() => {
    const orderDataParam = searchParams.get('orderData');
    const paymentTypeParam = searchParams.get('paymentType');
    const amountParam = searchParams.get('amount');

    if (orderDataParam) {
      setOrderData(JSON.parse(decodeURIComponent(orderDataParam)));
    }
    if (paymentTypeParam) {
      setPaymentType(paymentTypeParam);
    }
    if (amountParam) {
      setAmount(parseInt(amountParam));
    }
  }, [searchParams]);

  if (!orderData || !paymentType) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md">
          <h2 className="text-xl font-semibold text-red-600">Erreur</h2>
          <p className="text-gray-600">Données de commande manquantes</p>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100 py-12">
      <div className="container mx-auto px-4">
        <div className="max-w-md mx-auto">
          <div className="text-center mb-8">
            <h1 className="text-3xl font-bold text-gray-800 mb-2">
              {paymentType === 'cash_validation' ? 'Validation' : 'Paiement'}
            </h1>
            <p className="text-gray-600">
              {paymentType === 'cash_validation' 
                ? 'Confirmez votre commande' 
                : 'Finalisez votre commande'
              }
            </p>
          </div>

          <Elements stripe={stripePromise}>
            <PaymentForm 
              orderData={orderData} 
              paymentType={paymentType} 
              amount={amount}
            />
          </Elements>

          <div className="mt-6 text-center">
            <button
              onClick={() => window.history.back()}
              className="text-gray-500 hover:text-gray-700 underline"
            >
              ← Retour à la commande
            </button>
          </div>
        </div>
      </div>
    </div>
  );
} 