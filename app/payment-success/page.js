'use client';

import { useState, useEffect, useRef } from 'react';
import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

console.log('PAGE PAYMENT SUCCESS CHARGÉE');

export default function PaymentSuccessPage() {
  const searchParams = useSearchParams();
  const [orderData, setOrderData] = useState(null);
  const [paymentType, setPaymentType] = useState(null);
  const [whatsappSent, setWhatsappSent] = useState(false);
  const [orderNumber, setOrderNumber] = useState(null);
  const orderNumberGenerated = useRef(false);
  const [commandeSaved, setCommandeSaved] = useState(false);

  useEffect(() => {
    const orderDataParam = searchParams.get('orderData');
    const paymentTypeParam = searchParams.get('type');
    const paymentIntentId = searchParams.get('payment_intent');

    console.log('[DEBUG] Paramètres URL:', { orderDataParam, paymentTypeParam, paymentIntentId });

    if (orderDataParam) {
      let parsedOrderData = JSON.parse(decodeURIComponent(orderDataParam));
      setOrderNumber(parsedOrderData.orderNumber || null);
      setOrderData(parsedOrderData);
    }
    if (paymentTypeParam) {
      setPaymentType(paymentTypeParam);
    }

    // Sauvegarder la commande complète UNE SEULE FOIS
    if (orderDataParam && paymentIntentId && !commandeSaved) {
      let parsedOrderData = JSON.parse(decodeURIComponent(orderDataParam));
      saveCommande(parsedOrderData, paymentIntentId);
      setCommandeSaved(true);
    } else {
      console.log('[DEBUG] saveCommande non appelée - paramètres manquants ou déjà sauvegardée:', { orderDataParam: !!orderDataParam, paymentIntentId: !!paymentIntentId, commandeSaved });
    }
  }, [searchParams, commandeSaved]);

  const saveCommande = async (orderData, paymentIntentId) => {
    console.log('[DEBUG] saveCommande appelée avec:', { orderData, paymentIntentId });
    try {
      const requestBody = {
        paymentIntentId,
        commande: orderData
      };
      console.log('[DEBUG] Corps de la requête:', requestBody);
      
      const response = await fetch('/api/save-commande', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(requestBody)
      });
      
      const result = await response.json();
      console.log('[DEBUG] Réponse API save-commande:', result);
    } catch (error) {
      console.error('Erreur sauvegarde commande:', error);
    }
  };

  // useEffect(() => {
  //   // On envoie le message WhatsApp pour tous les types de paiement
  //   if (orderData && !whatsappSent) {
  //     sendWhatsAppMessage();
  //     setWhatsappSent(true);
  //   }
  // }, [orderData, whatsappSent]);

  const sendWhatsAppMessage = () => {
    if (!orderData) return;

    const { deliveryDate, deliveryTime, firstName, lastName, phone, sbmLots, bbmLots, notes, isHotel, selectedHotel, roomNumber, otherHotelName, otherHotelAddress, otherHotelPostalCode, otherHotelCity, otherHotelCountry, address, postalCode, city, country, boulettesSuppGlobal, total } = orderData;

    // Date de prise de commande (date actuelle)
    const now = new Date();
    const orderDate = now.toLocaleDateString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric'
    });
    const orderTime = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });

    // Extraire le jour et mois de la date de livraison
    const deliveryDateParts = deliveryDate.split(' ');
    const day = deliveryDateParts[1];
    const month = deliveryDateParts[2];
    
    const monthNames = {
      'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
      'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
      'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
    };
    const monthNumber = monthNames[month?.toLowerCase()] || '';

    const orderNumber = orderData.orderNumber || '--';

    const sbmDetails = Array.isArray(sbmLots)
      ? sbmLots.map((lot, index) =>
          `\n  SBM #${index + 1}: Piment(${lot.options?.piment ? 'Oui' : 'Non'}), Oeuf(${lot.options?.oeuf ? 'Oui' : 'Non'}), Mekbouba(${lot.options?.mekbouba ? 'Oui' : 'Non'})`
        ).join('')
      : '';
    
    const bbmDetails = Array.isArray(bbmLots)
      ? bbmLots.map((lot, index) =>
          `\n  BBM #${index + 1}: Piment(${lot.options?.piment ? 'Oui' : 'Non'}), Oeuf(${lot.options?.oeuf ? 'Oui' : 'Non'}), Mekbouba(${lot.options?.mekbouba ? 'Oui' : 'Non'})`
        ).join('')
      : '';

    // Construire l'adresse selon le type de livraison
    let deliveryAddress = '';
    if (isHotel === 'yes') {
      if (selectedHotel === 'Autre') {
        deliveryAddress = `Hôtel: ${otherHotelName}\nChambre: ${roomNumber}\nAdresse: ${otherHotelAddress}, ${otherHotelPostalCode}, ${otherHotelCity}, ${otherHotelCountry}`;
      } else {
        deliveryAddress = `Hôtel: ${selectedHotel}\nChambre: ${roomNumber}`;
      }
    } else {
      deliveryAddress = `Adresse: ${address}, ${postalCode}, ${city}, ${country}`;
    }

    const sbmCount = Array.isArray(sbmLots) ? sbmLots.reduce((sum, lot) => sum + lot.qty, 0) : 0;
    const bbmCount = Array.isArray(bbmLots) ? bbmLots.reduce((sum, lot) => sum + lot.qty, 0) : 0;
    const subtotal = sbmCount * 26 + bbmCount * 26 + (boulettesSuppGlobal * 5);
    const totalItems = sbmCount + bbmCount;
    const deliveryFee = totalItems >= 6 ? 0 : 15;
    const totalPaye = total;

    const paymentInfo = paymentType === 'cash' 
      ? 'Paiement en espèces à la livraison'
      : 'Paiement CB en ligne effectué';

    const message = `\nCommande ${orderNumber}\n-----------------------------------\nCommandé le ${orderDate} à ${orderTime}\nNom: ${lastName}\nPrénom: ${firstName}\nTéléphone: ${phone}\n\nLivraison :\nDate: ${deliveryDate} à ${deliveryTime}\n${deliveryAddress}\n\nDétails de la commande :\nSBM: ${sbmCount} x 26€${sbmDetails}\nBBM: ${bbmCount} x 26€${bbmDetails}${boulettesSuppGlobal > 0 ? `\nBoulettes Marchi : ${boulettesSuppGlobal} x 5€` : ''}\n\nNotes: ${notes || 'Aucune'}\n-----------------------------------\nSous-total: ${subtotal}€\nLivraison: ${deliveryFee}€\nTOTAL PAYÉ: ${totalPaye}€\n\n${paymentInfo}\n`;

    const whatsappUrl = `https://wa.me/33652696976?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  if (!orderData) {
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
          <div className="bg-white p-8 rounded-lg shadow-md text-center">
            <div className="text-4xl mb-1">
              {paymentType === 'cash' ? '✅' : '💳'}
            </div>
            
            <h1 className="text-xl font-bold text-gray-800 mb-4">
              {paymentType === 'cash' 
                ? 'Commande confirmée !' 
                : 'Paiement réussi !'
              }
            </h1>
            
            <p className="text-gray-600 mb-6">
              {paymentType === 'cash' 
                ? `Merci ${orderData?.firstName}, votre commande a été validée. Le paiement se fera en espèces à la livraison.`
                : `Merci ${orderData?.firstName}, votre commande a été payée et confirmée pour un montant de ${orderData?.total}€.`
              }
            </p>

            <div className="bg-green-50 border border-green-200 rounded-lg p-4 mb-6">
              <p className="text-green-800 text-sm">
                ⚠️ ENVOYEZ IMPÉRATIVEMENT CE MESSAGE POUR LANCER LA COMMANDE EN CUISINE 👨🏻‍🍳
              </p>
            </div>

            <div className="space-y-4">
              <button
                onClick={sendWhatsAppMessage}
                className="block w-full bg-green-500 text-white py-3 px-6 rounded-lg font-semibold hover:bg-green-600 transition-colors animate-pulse"
                style={{
                  animation: 'heartbeat 1.5s ease-in-out infinite'
                }}
              >
                ENVOYER SUR WHATSAPP
              </button>
            </div>

            {/* Ticket de commande */}
            <div className="mt-8 bg-gray-50 border border-gray-200 rounded-lg p-6">
              <h3 className="text-lg font-bold text-gray-800 mb-4 text-center">
                📋 Détails de votre commande
              </h3>
              
              <div className="space-y-3 text-sm">
                <div className="flex justify-between items-center">
                  <span className="font-semibold">Numéro de commande :</span>
                  <span className="bg-blue-100 text-blue-800 px-2 py-1 rounded font-mono">{orderData?.orderNumber || '--'}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Nom :</span>
                  <span>{orderData?.lastName} {orderData?.firstName}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Téléphone :</span>
                  <span>{orderData?.phone}</span>
                </div>
                
                <div className="flex justify-between">
                  <span>Date de livraison :</span>
                  <span>{orderData?.deliveryDate} à {orderData?.deliveryTime}</span>
                </div>
                
                <div className="border-t pt-3">
                  <div className="font-semibold mb-2">Adresse de livraison :</div>
                  <div className="text-gray-600">
                    {orderData?.isHotel === 'yes' ? (
                      orderData?.selectedHotel === 'Autre' ? (
                        <>
                          <div>Hôtel : {orderData?.otherHotelName}</div>
                          <div>Chambre : {orderData?.roomNumber}</div>
                          <div>{orderData?.otherHotelAddress}, {orderData?.otherHotelPostalCode}</div>
                          <div>{orderData?.otherHotelCity}, {orderData?.otherHotelCountry}</div>
                        </>
                      ) : (
                        <>
                          <div>Hôtel : {orderData?.selectedHotel}</div>
                          <div>Chambre : {orderData?.roomNumber}</div>
                        </>
                      )
                    ) : (
                      <>
                        <div>{orderData?.address}</div>
                        <div>{orderData?.postalCode} {orderData?.city}</div>
                        <div>{orderData?.country}</div>
                      </>
                    )}
                  </div>
                </div>
                
                <div className="border-t pt-3">
                  <div className="font-semibold mb-2">Produits commandés :</div>
                  {Array.isArray(orderData?.sbmLots) && orderData.sbmLots.length > 0 && (
                    <div className="mb-2">
                      <div className="font-medium">SBM : {orderData.sbmLots.reduce((sum, lot) => sum + lot.qty, 0)} x 26€</div>
                    </div>
                  )}
                  {Array.isArray(orderData?.bbmLots) && orderData.bbmLots.length > 0 && (
                    <div className="mb-2">
                      <div className="font-medium">BBM : {orderData.bbmLots.reduce((sum, lot) => sum + lot.qty, 0)} x 26€</div>
                    </div>
                  )}
                  {orderData?.boulettesSuppGlobal > 0 && (
                    <div className="mb-2">
                      <div className="font-medium">Boulettes Marchi : {orderData.boulettesSuppGlobal} x 5€</div>
                    </div>
                  )}
                </div>
                
                {orderData?.notes && (
                  <div className="border-t pt-3">
                    <div className="font-semibold mb-1">Notes :</div>
                    <div className="text-gray-600 italic">{orderData.notes}</div>
                  </div>
                )}
                
                <div className="border-t pt-3">
                  <div className="flex justify-between font-semibold">
                    <span>Total payé :</span>
                    <span className="text-lg text-green-600">{orderData?.total}€</span>
                  </div>
                </div>
              </div>
            </div>

            {/* Bouton retour à l'accueil après le ticket */}
            <div className="mt-6">
              <Link 
                href="/"
                className="block w-full bg-accent-red text-white py-3 px-6 rounded-lg font-semibold hover:bg-accent-red/90 transition-colors"
              >
                🏠 Retour à l'accueil
              </Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}
