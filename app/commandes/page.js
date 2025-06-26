'use client';

import { useState, useEffect } from 'react';

// Page admin pour Mekbouba - Gestion des commandes
export default function CommandesPage() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    fetchCommandes();
  }, []);

  const fetchCommandes = async () => {
    try {
      setLoading(true);
      const response = await fetch('/api/admin-commandes');
      if (!response.ok) {
        throw new Error('Erreur lors de la récupération des commandes');
      }
      const data = await response.json();
      setCommandes(data.commandes || []);
    } catch (err) {
      setError(err.message);
    } finally {
      setLoading(false);
    }
  };

  const formatDate = (dateString) => {
    return new Date(dateString).toLocaleString('fr-FR', {
      day: '2-digit',
      month: '2-digit',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'payé': return 'bg-green-100 text-green-800';
      case 'en attente': return 'bg-yellow-100 text-yellow-800';
      case 'annulé': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center">
            <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-red mx-auto"></div>
            <p className="mt-4 text-gray-600">Chargement des commandes...</p>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {/* Header avec date */}
        <div className="mb-8 flex justify-between items-start">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            🍽️ Cmd Ibiza
          </h1>
          <div className="text-right">
            <p className="text-lg font-semibold text-gray-700">
              {new Date().toLocaleDateString('fr-FR', {
                weekday: 'long',
                year: 'numeric',
                month: 'long',
                day: 'numeric'
              })}
            </p>
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Erreur :</strong> {error}
          </div>
        )}

        {/* Liste des commandes */}
        {commandes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              Aucune commande
            </h3>
            <p className="text-gray-600">
              Aucune commande n'a été passée pour le moment.
            </p>
          </div>
        ) : (
          <div className="space-y-6">
            {commandes.map((commande, index) => (
              <div key={index} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="px-6 py-4 border-b border-gray-200">
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Commande #{index + 1}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {commande.orderData?.firstName} {commande.orderData?.lastName} • {commande.orderData?.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(commande.status)}`}>
                        {commande.status}
                      </span>
                      <p className="text-lg font-bold text-accent-red mt-1">
                        {commande.orderData?.total || 'Calculer'}€
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  {/* Informations de livraison */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📅 Livraison</h4>
                      <p className="text-sm text-gray-600">
                        {commande.orderData?.deliveryDate} à {commande.orderData?.deliveryTime}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📍 Adresse</h4>
                      <p className="text-sm text-gray-600">
                        {commande.orderData?.isHotel === 'yes' ? (
                          <>
                            Hôtel : {commande.orderData?.selectedHotel}<br />
                            Chambre : {commande.orderData?.roomNumber}
                          </>
                        ) : (
                          <>
                            {commande.orderData?.address}<br />
                            {commande.orderData?.postalCode} {commande.orderData?.city}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  {/* Détails des commandes SBM */}
                  {commande.orderData?.sbmLots && commande.orderData.sbmLots.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">🥪 SBM - Sandwich Boulettes Mekbouba</h4>
                      <div className="space-y-2">
                        {commande.orderData.sbmLots.map((lot, lotIndex) => (
                          <div key={lotIndex} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-semibold">SBM - {lot.qty}x</span>
                              <span className="font-semibold text-accent-red">{lot.qty * 26}€</span>
                            </div>
                            {lot.options && (
                              <div className="text-xs text-gray-600">
                                <span className="font-medium">Options :</span>
                                {lot.options.piment && <span className="ml-1">🌶️ Piment</span>}
                                {lot.options.oeuf && <span className="ml-1">🥚 Œuf</span>}
                                {lot.options.mekbouba && <span className="ml-1">🍽️ Mekbouba</span>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Détails des commandes BBM */}
                  {commande.orderData?.bbmLots && commande.orderData.bbmLots.length > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">🥪 BBM - Burger Boulettes Mekbouba</h4>
                      <div className="space-y-2">
                        {commande.orderData.bbmLots.map((lot, lotIndex) => (
                          <div key={lotIndex} className="bg-gray-50 p-3 rounded">
                            <div className="flex justify-between text-sm mb-1">
                              <span className="font-semibold">BBM - {lot.qty}x</span>
                              <span className="font-semibold text-accent-red">{lot.qty * 26}€</span>
                            </div>
                            {lot.options && (
                              <div className="text-xs text-gray-600">
                                <span className="font-medium">Options :</span>
                                {lot.options.piment && <span className="ml-1">🌶️ Piment</span>}
                                {lot.options.oeuf && <span className="ml-1">🥚 Œuf</span>}
                                {lot.options.mekbouba && <span className="ml-1">🍽️ Mekbouba</span>}
                              </div>
                            )}
                          </div>
                        ))}
                      </div>
                    </div>
                  )}

                  {/* Boulettes supplémentaires globales */}
                  {commande.orderData?.boulettesSuppGlobal > 0 && (
                    <div className="mb-4">
                      <h4 className="font-semibold text-gray-900 mb-2">🍖 Boulettes supplémentaires</h4>
                      <div className="bg-gray-50 p-3 rounded">
                        <div className="flex justify-between text-sm">
                          <span>Boulettes supplémentaires globales</span>
                          <span className="font-semibold text-accent-red">+{commande.orderData.boulettesSuppGlobal}</span>
                        </div>
                      </div>
                    </div>
                  )}

                  {/* Notes */}
                  {commande.orderData?.notes && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📝 Notes</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {commande.orderData.notes}
                      </p>
                    </div>
                  )}

                  {/* Informations de contact */}
                  <div className="mt-4 pt-4 border-t border-gray-200">
                    <h4 className="font-semibold text-gray-900 mb-2">📞 Contact</h4>
                    <div className="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm text-gray-600">
                      <div>
                        <span className="font-medium">Nom :</span> {commande.orderData?.firstName} {commande.orderData?.lastName}
                      </div>
                      <div>
                        <span className="font-medium">Téléphone :</span> {commande.orderData?.phone}
                      </div>
                      <div>
                        <span className="font-medium">Pays :</span> {commande.orderData?.country}
                      </div>
                      <div>
                        <span className="font-medium">Date de commande :</span> {formatDate(commande.createdAt)}
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 