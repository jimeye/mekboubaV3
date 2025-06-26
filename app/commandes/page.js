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
        {/* Header */}
        <div className="mb-8">
          <h1 className="text-3xl font-bold text-gray-900 mb-2">
            Cmd Ibiza
          </h1>
          <p className="text-gray-600">
            Interface d'administration pour suivre les commandes en temps réel
          </p>
        </div>

        {/* Bouton Actualiser */}
        <div className="mb-6">
          <button
            onClick={fetchCommandes}
            className="bg-accent-red text-white px-6 py-2 rounded-lg hover:bg-accent-red/90 transition-colors"
          >
            🔄 Actualiser les commandes
          </button>
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
                        {commande.customerName} • {commande.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <span className={`inline-flex px-2 py-1 text-xs font-semibold rounded-full ${getStatusColor(commande.status)}`}>
                        {commande.status}
                      </span>
                      <p className="text-lg font-bold text-accent-red mt-1">
                        {commande.total}€
                      </p>
                    </div>
                  </div>
                </div>
                
                <div className="px-6 py-4">
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📅 Livraison</h4>
                      <p className="text-sm text-gray-600">
                        {commande.deliveryDate} à {commande.deliveryTime}
                      </p>
                    </div>
                    
                    <div>
                      <h4 className="font-semibold text-gray-900 mb-2">📍 Adresse</h4>
                      <p className="text-sm text-gray-600">
                        {commande.isHotel === 'yes' ? (
                          <>
                            Hôtel : {commande.selectedHotel}<br />
                            Chambre : {commande.roomNumber}
                          </>
                        ) : (
                          <>
                            {commande.address}<br />
                            {commande.postalCode} {commande.city}
                          </>
                        )}
                      </p>
                    </div>
                  </div>
                  
                  <div className="mt-4">
                    <h4 className="font-semibold text-gray-900 mb-2">🍽️ Commandes</h4>
                    <div className="space-y-2">
                      {commande.sbmLots?.map((lot, lotIndex) => (
                        <div key={lotIndex} className="flex justify-between text-sm">
                          <span>SBM - {lot.qty}x</span>
                          <span className="font-semibold">{lot.qty * 26}€</span>
                        </div>
                      ))}
                      {commande.bbmLots?.map((lot, lotIndex) => (
                        <div key={lotIndex} className="flex justify-between text-sm">
                          <span>BBM - {lot.qty}x</span>
                          <span className="font-semibold">{lot.qty * 26}€</span>
                        </div>
                      ))}
                    </div>
                  </div>
                  
                  {commande.notes && (
                    <div className="mt-4">
                      <h4 className="font-semibold text-gray-900 mb-2">📝 Notes</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-3 rounded">
                        {commande.notes}
                      </p>
                    </div>
                  )}
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
} 