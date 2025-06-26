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
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
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
            {commandes.map((commande, index) => {
              const data = commande.orderData || {};
              // Numéro de commande formaté (ex: CMD 407-55517)
              const numCmd = commande.id ? `CMD ${commande.id.slice(-8)}` : `CMD #${index + 1}`;
              // Date et heure de commande (format 25/06/2025 à 20:19)
              const dateCmd = commande.createdAt ? new Date(commande.createdAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
              // Paiement (toujours CB en ligne ici)
              const paiement = 'Paiement CB en ligne effectué';
              // Sous-total, livraison, total (fallback si non présents)
              const sousTotal = data.total ? (data.total - (data.livraison || 15)) : '';
              const livraison = data.livraison || 15;
              const total = data.total || '';
              // Notes
              const notes = data.notes && data.notes.trim() !== '' ? data.notes : 'Aucune';
              return (
                <div key={index} className="bg-white rounded-lg shadow overflow-hidden p-6">
                  <div className="mb-2 font-bold text-lg">Commande {numCmd}</div>
                  <div className="text-xs text-gray-500 mb-2">-----------------------------------</div>
                  <div className="mb-2 text-sm">Commandé le {dateCmd}</div>
                  <div className="mb-2 text-sm">Nom: <b>{data.lastName || ''}</b></div>
                  <div className="mb-2 text-sm">Prénom: <b>{data.firstName || ''}</b></div>
                  <div className="mb-2 text-sm">Téléphone: <b>{data.phone || ''}</b></div>

                  <div className="mt-4 font-semibold text-base">Livraison :</div>
                  <div className="mb-1 text-sm">Date: {data.deliveryDate} à {data.deliveryTime}</div>
                  {data.isHotel === 'yes' ? (
                    <>
                      <div className="mb-1 text-sm">Hôtel: {data.selectedHotel}</div>
                      <div className="mb-1 text-sm">Chambre: {data.roomNumber}</div>
                    </>
                  ) : (
                    <>
                      <div className="mb-1 text-sm">Adresse: {data.address}</div>
                      <div className="mb-1 text-sm">Code postal: {data.postalCode}</div>
                      <div className="mb-1 text-sm">Ville: {data.city}</div>
                      <div className="mb-1 text-sm">Pays: {data.country}</div>
                    </>
                  )}

                  <div className="mt-4 font-semibold text-base">Détails de la commande :</div>
                  <div className="mb-1 text-sm">SBM: {data.sbmLots?.length || 0} x 26€</div>
                  {data.sbmLots?.map((lot, i) => (
                    <div key={i} className="ml-2 text-xs">
                      SBM #{i + 1}: Piment({lot.options?.piment ? 'Oui' : 'Non'}), Oeuf({lot.options?.oeuf ? 'Oui' : 'Non'}), Mekbouba({lot.options?.mekbouba ? 'Oui' : 'Non'}), Boulettes supp: {lot.boulettesSupp || 0}
                    </div>
                  ))}
                  <div className="mb-1 text-sm">BBM: {data.bbmLots?.length || 0} x 26€</div>
                  {data.bbmLots?.map((lot, i) => (
                    <div key={i} className="ml-2 text-xs">
                      BBM #{i + 1}: Piment({lot.options?.piment ? 'Oui' : 'Non'}), Oeuf({lot.options?.oeuf ? 'Oui' : 'Non'}), Mekbouba({lot.options?.mekbouba ? 'Oui' : 'Non'}), Boulettes supp: {lot.boulettesSupp || 0}
                    </div>
                  ))}

                  <div className="mb-1 text-sm">Notes: {notes}</div>
                  <div className="text-xs text-gray-500 mb-2">-----------------------------------</div>
                  <div className="mb-1 text-sm">Sous-total: {sousTotal}€</div>
                  <div className="mb-1 text-sm">Livraison: {livraison}€</div>
                  <div className="mb-1 text-base font-bold">TOTAL PAYÉ: {total}€</div>
                  <div className="mt-2 text-sm text-green-700 font-semibold">{paiement}</div>
                </div>
              );
            })}
          </div>
        )}
      </div>
    </div>
  );
} 