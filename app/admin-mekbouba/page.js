'use client';

import { useState, useEffect } from 'react';

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
    return new Date(dateString).toLocaleString('fr-FR');
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'nouvelle': return 'bg-blue-100 text-blue-800';
      case 'en_cours': return 'bg-yellow-100 text-yellow-800';
      case 'livrée': return 'bg-green-100 text-green-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  if (loading) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-accent-red mx-auto"></div>
          <p className="mt-4 text-gray-600">Chargement des commandes...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="min-h-screen bg-gray-100 flex items-center justify-center">
        <div className="bg-white p-8 rounded-lg shadow-md text-center">
          <h2 className="text-xl font-semibold text-red-600 mb-4">Erreur</h2>
          <p className="text-gray-600 mb-4">{error}</p>
          <button 
            onClick={fetchCommandes}
            className="bg-accent-red text-white px-4 py-2 rounded-lg hover:bg-accent-red/90"
          >
            Réessayer
          </button>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="container mx-auto px-4 py-8">
        <div className="bg-white rounded-lg shadow-lg p-6">
          <div className="flex justify-between items-center mb-6">
            <h1 className="text-3xl font-bold text-gray-800">🍽️ Admin Mekbouba</h1>
            <div className="flex space-x-4">
              <button 
                onClick={fetchCommandes}
                className="bg-accent-red text-white px-4 py-2 rounded-lg hover:bg-accent-red/90"
              >
                🔄 Actualiser
              </button>
              <div className="text-sm text-gray-600">
                {commandes.length} commande{commandes.length > 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {commandes.length === 0 ? (
            <div className="text-center py-12">
              <div className="text-6xl mb-4">📭</div>
              <h3 className="text-xl font-semibold text-gray-600 mb-2">Aucune commande</h3>
              <p className="text-gray-500">Les commandes apparaîtront ici une fois validées</p>
            </div>
          ) : (
            <div className="space-y-4">
              {commandes.map((commande, index) => (
                <div key={commande.id || index} className="border border-gray-200 rounded-lg p-4 hover:shadow-md transition-shadow">
                  <div className="flex justify-between items-start mb-3">
                    <div>
                      <h3 className="text-lg font-semibold text-gray-800">
                        Commande #{commande.orderNumber || 'N/A'}
                      </h3>
                      <p className="text-sm text-gray-600">
                        {commande.firstName} {commande.lastName} • {commande.phone}
                      </p>
                    </div>
                    <div className="text-right">
                      <div className={`px-2 py-1 rounded-full text-xs font-semibold ${getStatusColor(commande.status)}`}>
                        {commande.status || 'nouvelle'}
                      </div>
                      <p className="text-sm text-gray-600 mt-1">
                        {formatDate(commande.createdAt)}
                      </p>
                    </div>
                  </div>

                  <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-3">
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">📅 Livraison</h4>
                      <p className="text-sm text-gray-600">
                        {commande.deliveryDate} à {commande.deliveryTime}
                      </p>
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-700 mb-1">📍 Adresse</h4>
                      <p className="text-sm text-gray-600">
                        {commande.isHotel === 'yes' 
                          ? `${commande.selectedHotel} - Chambre ${commande.roomNumber}`
                          : `${commande.address}, ${commande.postalCode} ${commande.city}`
                        }
                      </p>
                    </div>
                  </div>

                  <div className="mb-3">
                    <h4 className="font-semibold text-gray-700 mb-1">🛒 Détails de la commande</h4>
                    <div className="text-sm text-gray-600">
                      {commande.sbmLots && commande.sbmLots.length > 0 && (
                        <div className="mb-1">
                          <strong>SBM:</strong> {commande.sbmLots.reduce((sum, lot) => sum + lot.qty, 0)} x 26€
                        </div>
                      )}
                      {commande.bbmLots && commande.bbmLots.length > 0 && (
                        <div className="mb-1">
                          <strong>BBM:</strong> {commande.bbmLots.reduce((sum, lot) => sum + lot.qty, 0)} x 26€
                        </div>
                      )}
                      {commande.boulettesSuppGlobal > 0 && (
                        <div className="mb-1">
                          <strong>Boulettes supp:</strong> {commande.boulettesSuppGlobal} x 5€
                        </div>
                      )}
                      <div className="font-semibold text-accent-red">
                        Total: {commande.total}€
                      </div>
                    </div>
                  </div>

                  {commande.notes && (
                    <div className="mb-3">
                      <h4 className="font-semibold text-gray-700 mb-1">📝 Notes</h4>
                      <p className="text-sm text-gray-600 bg-gray-50 p-2 rounded">
                        {commande.notes}
                      </p>
                    </div>
                  )}

                  <div className="flex justify-between items-center pt-3 border-t border-gray-200">
                    <div className="text-xs text-gray-500">
                      ID: {commande.id}
                    </div>
                    <div className="text-xs text-gray-500">
                      Paiement: {commande.paymentType === 'cash_validation' ? 'Espèces' : 'CB'}
                    </div>
                  </div>
                </div>
              ))}
            </div>
          )}
        </div>
      </div>
    </div>
  );
} 