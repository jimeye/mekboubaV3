'use client';

import { useState, useEffect } from 'react';

// Page admin pour Mekbouba - Gestion des commandes
export default function CommandesPage() {
  const [commandes, setCommandes] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [startDate, setStartDate] = useState(null);
  const [endDate, setEndDate] = useState(null);
  const [filteredCommandes, setFilteredCommandes] = useState([]);

  useEffect(() => {
    fetchCommandes();
  }, []);

  useEffect(() => {
    filterCommandes();
  }, [commandes, startDate, endDate]);

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

  const filterCommandes = () => {
    let filtered = [...commandes];
    
    if (startDate) {
      const start = new Date(startDate);
      start.setHours(0, 0, 0, 0);
      filtered = filtered.filter(commande => {
        const commandeDate = new Date(commande.createdAt);
        return commandeDate >= start;
      });
    }
    
    if (endDate) {
      const end = new Date(endDate);
      end.setHours(23, 59, 59, 999);
      filtered = filtered.filter(commande => {
        const commandeDate = new Date(commande.createdAt);
        return commandeDate <= end;
      });
    }
    
    setFilteredCommandes(filtered);
  };

  const calculateStats = () => {
    let totalPaye = 0;
    let totalProduits = 0;
    
    filteredCommandes.forEach(commande => {
      const data = commande.orderData || {};
      // Total payé
      if (data.total) {
        totalPaye += parseFloat(data.total);
      }
      // Nombre de produits (SBM + BBM, sans les boulettes supp)
      const sbmCount = data.sbmLots?.length || 0;
      const bbmCount = data.bbmLots?.length || 0;
      totalProduits += sbmCount + bbmCount;
    });
    
    return { totalPaye, totalProduits };
  };

  const clearFilters = () => {
    setStartDate(null);
    setEndDate(null);
  };

  const { totalPaye, totalProduits } = calculateStats();

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
    <div className="min-h-screen bg-white py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative">
        {/* Header avec date */}
        <div className="mb-8">
          <div className="w-full md:w-auto">
            <h1 className="text-2xl md:text-3xl font-bold text-gray-900 mb-2">
              🍽️ Cmd Ibiza
            </h1>
            <p className="text-base md:text-lg font-semibold text-gray-700">
              {new Date().toLocaleDateString('fr-FR', {
                day: '2-digit',
                month: '2-digit',
                year: '2-digit'
              })}
            </p>
          </div>
          {/* Colonne compteurs/filtre positionnée à droite */}
          <div className="absolute top-0 right-0 flex flex-col items-end space-y-2 mt-0 md:mt-2 mr-2 z-10 w-1/3 max-w-[160px] md:w-1/4">
            <div className="bg-white rounded-lg w-full">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-gray-600">Total💰</p>
                <p className="text-lg font-bold text-green-600 text-center">{totalPaye.toFixed(2)}€</p>
              </div>
            </div>
            <div className="bg-white rounded-lg w-full">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-gray-600">Quantité 🍽️</p>
                <p className="text-lg font-bold text-blue-600 text-center">{totalProduits}</p>
              </div>
            </div>
            <div className="bg-white rounded-lg w-full">
              <div className="flex flex-col items-center justify-center">
                <p className="text-sm font-medium text-gray-600 mb-2">Filtre par date</p>
                <div className="flex gap-1 flex-wrap justify-center">
                  <input
                    type="date"
                    value={startDate ? startDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null;
                      setStartDate(date);
                    }}
                    className="text-xs px-1 py-1 border border-gray-300 rounded w-14 md:w-20"
                  />
                  <span className="text-xs text-gray-500">à</span>
                  <input
                    type="date"
                    value={endDate ? endDate.toISOString().split('T')[0] : ''}
                    onChange={(e) => {
                      const date = e.target.value ? new Date(e.target.value) : null;
                      setEndDate(date);
                    }}
                    className="text-xs px-1 py-1 border border-gray-300 rounded w-14 md:w-20"
                  />
                </div>
                {(startDate || endDate) && (
                  <button
                    onClick={clearFilters}
                    className="mt-2 px-2 py-1 text-xs bg-red-500 text-white rounded hover:bg-red-600"
                  >
                    Effacer
                  </button>
                )}
              </div>
            </div>
          </div>
        </div>

        {/* Erreur */}
        {error && (
          <div className="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded mb-6">
            <strong>Erreur :</strong> {error}
          </div>
        )}

        {/* Liste des commandes */}
        <div className="mt-40 md:mt-56">
        {filteredCommandes.length === 0 ? (
          <div className="bg-white rounded-lg shadow p-8 text-center">
            <div className="text-6xl mb-4">📋</div>
            <h3 className="text-xl font-semibold text-gray-900 mb-2">
              {commandes.length === 0 ? 'Aucune commande' : 'Aucune commande trouvée'}
            </h3>
            <p className="text-gray-600">
              {commandes.length === 0 
                ? "Aucune commande n'a été passée pour le moment."
                : "Aucune commande ne correspond aux critères de recherche."}
            </p>
          </div>
        ) : (
          <div className="space-y-4">
            {filteredCommandes.map((commande, index) => {
              const data = commande.orderData || {};
              const numCmd = commande.id ? `CMD ${commande.id.slice(-8)}` : `CMD #${index + 1}`;
              const dateCmd = commande.createdAt ? new Date(commande.createdAt).toLocaleString('fr-FR', { day: '2-digit', month: '2-digit', year: 'numeric', hour: '2-digit', minute: '2-digit' }) : '';
              const paiement = 'Paiement CB en ligne effectué';
              const sousTotal = data.total ? (data.total - (data.livraison || 15)) : '';
              const livraison = data.livraison || 15;
              const total = data.total || '';
              const notes = data.notes && data.notes.trim() !== '' ? data.notes : 'Aucune';
              // Gestion du menu dépliable et du bouton Ready
              const [open, setOpen] = useState(false);
              const [validated, setValidated] = useState(false);
              return (
                <div key={index} className="bg-white border border-black/20 rounded-lg overflow-hidden">
                  {/* Ligne principale compacte */}
                  <div className="flex items-center px-4 py-3 gap-2">
                    {/* Chevron */}
                    <button onClick={() => setOpen(!open)} className="focus:outline-none">
                      <span className={`transition-transform duration-200 ${open ? 'rotate-90' : ''}`}>▶️</span>
                    </button>
                    {/* Infos principales */}
                    <div className="flex-1 flex flex-wrap gap-x-4 gap-y-1 items-center text-sm">
                      <span className="font-bold text-gray-800">{numCmd}</span>
                      <span>{data.lastName} {data.firstName}</span>
                      <span>{data.phone}</span>
                      {data.isHotel === 'yes' ? (
                        <span>Hôtel: {data.selectedHotel} {data.roomNumber && `Chambre: ${data.roomNumber}`}</span>
                      ) : (
                        <span>{data.address}, {data.city}</span>
                      )}
                      <span>{data.deliveryDate} {data.deliveryTime}</span>
                      <span className="font-bold text-green-700">{total}€</span>
                    </div>
                    {/* Bouton à valider/validé */}
                    <button
                      onClick={() => setValidated(!validated)}
                      className={`ml-2 px-3 py-1 rounded transition-all duration-200 text-sm font-semibold
                        ${validated ? 'bg-transparent text-green-600 border-none shadow-none' : 'bg-gray-200 text-gray-700 hover:bg-gray-300'}`}
                      style={{ minWidth: 70 }}
                    >
                      {validated ? '✅' : 'à valider'}
                    </button>
                  </div>
                  {/* Détail dépliable */}
                  {open && (
                    <div className="border-t border-black/10 bg-white px-6 py-4 text-sm animate-fade-in">
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
                  )}
                </div>
              );
            })}
          </div>
        )}
        </div>
      </div>
    </div>
  );
} 