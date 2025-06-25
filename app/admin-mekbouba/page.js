'use client';

import { useState, useEffect } from 'react';

// Page admin pour Mekbouba - Gestion des commandes
export default function AdminPage() {
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
      case 'paid':
        return 'bg-green-100 text-green-800';
      case 'pending':
        return 'bg-yellow-100 text-yellow-800';
      default:
        return 'bg-gray-100 text-gray-800';
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

  if (error) {
    return (
      <div className="min-h-screen bg-gray-50 py-8">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="bg-red-50 border border-red-200 rounded-lg p-4">
            <p className="text-red-800">Erreur : {error}</p>
            <button 
              onClick={fetchCommandes}
              className="mt-2 bg-accent-red text-white px-4 py-2 rounded hover:bg-accent-red/90"
            >
              Réessayer
            </button>
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
            🍽️ Admin Mekbouba - Gestion des Commandes
          </h1>
          <p className="text-gray-600">
            {commandes.length} commande{commandes.length !== 1 ? 's' : ''} trouvée{commandes.length !== 1 ? 's' : ''}
          </p>
        </div>

        {/* Bouton Actualiser */}
        <div className="mb-6">
          <button
            onClick={fetchCommandes}
            className="bg-accent-red text-white px-6 py-3 rounded-lg font-semibold hover:bg-accent-red/90 transition-colors"
          >
            🔄 Actualiser les commandes
          </button>
        </div>

        {/* Liste des commandes */}
        {commandes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <p className="text-gray-500 text-lg">Aucune commande pour le moment</p>
          </div>
        ) : (
          <div className="space-y-6">
            {commandes.map((commande) => (
              <div key={commande.id} className="bg-white rounded-lg shadow overflow-hidden">
                <div className="p-6">
                  {/* En-tête de la commande */}
                  <div className="flex justify-between items-start mb-4">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-900">
                        Commande #{commande.orderNumber}
                      </h3>
                      <p className="text-sm text-gray-500">
                        Créée le {formatDate(commande.created * 1000)}
                      </p>
                    </div>
                    <div className="flex items-center space-x-2">
                      <span className={`px-3 py-1 rounded-full text-xs font-medium ${getStatusColor(commande.status)}`}>
                        {commande.status === 'paid' ? 'Payée' : 'En attente'}
                      </span>
                      <span className="text-lg font-bold text-accent-red">
                        {commande.total}€
                      </span>
                    </div>
                  </div>

                  {/* Informations client */}
                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">👤 Client</h4>
                      <p className="text-gray-700">{commande.customerName}</p>
                      <p className="text-gray-600">{commande.phone}</p>
                    </div>
                    <div>
                      <h4 className="font-medium text-gray-900 mb-2">📍 Livraison</h4>
                      <p className="text-gray-700">{commande.deliveryAddress}</p>
                      <p className="text-gray-600">
                        {commande.deliveryDate} - {commande.deliveryTime}
                      </p>
                    </div>
                  </div>

                  {/* Détails de la commande */}
                  <div className="border-t pt-4">
                    <h4 className="font-medium text-gray-900 mb-3">🛒 Détails de la commande</h4>
                    <div className="space-y-2">
                      {commande.sbmCount > 0 && (
                        <div className="flex justify-between">
                          <span>SBM (Sandwich Boulettes Mekbouba)</span>
                          <span className="font-medium">{commande.sbmCount} x 26€ = {commande.sbmCount * 26}€</span>
                        </div>
                      )}
                      {commande.bbmCount > 0 && (
                        <div className="flex justify-between">
                          <span>BBM (Burger Boulettes Mekbouba)</span>
                          <span className="font-medium">{commande.bbmCount} x 26€ = {commande.bbmCount * 26}€</span>
                        </div>
                      )}
                      {commande.boulettesSupp > 0 && (
                        <div className="flex justify-between">
                          <span>Boulettes supplémentaires</span>
                          <span className="font-medium">{commande.boulettesSupp} x 5€ = {commande.boulettesSupp * 5}€</span>
                        </div>
                      )}
                      <div className="border-t pt-2 mt-2">
                        <div className="flex justify-between font-bold">
                          <span>Total</span>
                          <span>{commande.total}€</span>
                        </div>
                      </div>
                    </div>
                  </div>

                  {/* Notes */}
                  {commande.notes && (
                    <div className="mt-4 p-3 bg-yellow-50 rounded-lg">
                      <h4 className="font-medium text-gray-900 mb-1">📝 Notes</h4>
                      <p className="text-gray-700">{commande.notes}</p>
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