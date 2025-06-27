'use client';

import { useState, useEffect } from 'react';

if (typeof window !== 'undefined') {
  console.log('CODE CLIENT ADMIN EXÉCUTÉ');
}

// Nouveau composant ticket compact et sûr
function TicketCommande({ commande }) {
  const [open, setOpen] = useState(false);
  const [validated, setValidated] = useState(false);

  // On lit directement les champs sur l'objet commande
  const numCmd = commande.orderNumber || (commande.id ? `CMD ${commande.id.slice(-8)}` : 'CMD');
  const client = commande.customerName || '';
  const phone = commande.phone || '';
  const livraison = commande.hotel === 'yes' || commande.isHotel === 'yes'
    ? `${commande.selectedHotel || commande.hotel} (Chambre: ${commande.roomNumber || ''})`
    : `${commande.address || ''} ${commande.city || ''}`;
  let dateLivraison = '';
  if (commande.deliveryDate && commande.deliveryTime) {
    // Extraction du jour/mois
    const match = commande.deliveryDate.match(/(\d{1,2}) ([a-zéû]+)$/i);
    const moisMap = {
      'janvier': '01', 'février': '02', 'mars': '03', 'avril': '04',
      'mai': '05', 'juin': '06', 'juillet': '07', 'août': '08',
      'septembre': '09', 'octobre': '10', 'novembre': '11', 'décembre': '12'
    };
    if (match) {
      const jour = match[1].padStart(2, '0');
      const mois = moisMap[match[2].toLowerCase()] || '';
      const heure = commande.deliveryTime.split(' ')[0];
      dateLivraison = `liv ${jour}/${mois} ${heure}`;
    } else {
      dateLivraison = `liv ${commande.deliveryDate} ${commande.deliveryTime.split(' ')[0]}`;
    }
  }
  const total = commande.total || commande.amount || 0;
  // Date de commande
  const dateCommande = commande.created ? new Date(commande.created * 1000).toLocaleString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit', 
    year: 'numeric', 
    hour: '2-digit', 
    minute: '2-digit' 
  }) : '';
  // Date de commande format compact
  const dateCommandeCompact = commande.created ? new Date(commande.created * 1000).toLocaleDateString('fr-FR', { 
    day: '2-digit', 
    month: '2-digit'
  }) : '';
  // Debug pour voir la date
  console.log('Debug date commande:', { created: commande.created, dateCompact: dateCommandeCompact });

  return (
    <div className="border border-black/20 rounded-lg bg-white mb-2">
      {/* Ligne principale */}
      <div className="flex items-center px-2 py-1 gap-1 text-xs sm:px-4 sm:py-2 sm:gap-2 sm:text-sm">
        {/* Chevron */}
        <button
          onClick={() => setOpen((v) => !v)}
          className="text-xl focus:outline-none"
          aria-label={open ? 'Fermer le détail' : 'Voir le détail'}
        >
          {open ? '▼' : '►'}
        </button>
        {/* Infos principales */}
        <div className="flex-1 flex flex-wrap items-center text-xs sm:gap-4 sm:text-sm">
          <span className="font-bold flex-shrink-0 mr-1 sm:mr-4 sm:w-36">{commande.orderNumber || numCmd}</span>
          <span className="mr-1 sm:mr-4">{client || 'N/A'}</span>
          <span>{phone || 'N/A'}</span>
          {(livraison && dateLivraison) ? (
            <span className="ml-2 sm:ml-4">{livraison} {dateLivraison}</span>
          ) : livraison ? (
            <span className="ml-2 sm:ml-4">{livraison}</span>
          ) : dateLivraison ? (
            <span className="ml-2 sm:ml-4">{dateLivraison}</span>
          ) : null}
          <span className="font-bold text-green-700 pl-2 sm:ml-2">{total}&nbsp;€</span>
        </div>
        {/* Bouton à valider */}
        <button
          onClick={() => setValidated(v => !v)}
          className={
            validated
              ? 'bg-transparent text-2xl text-green-600 px-3 py-1 border-none shadow-none'
              : 'bg-white text-gray-800 px-3 py-1 rounded transition text-2xl flex items-center justify-center'
          }
        >
          {validated ? '✅' : '⏳'}
        </button>
      </div>
      {/* Détail dépliable */}
      {open && (
        <div className="px-6 py-4 border-t border-black/10 bg-gray-50 text-sm">
          {/* Détail WhatsApp-like */}
          <div className="whitespace-pre-wrap">
            <div className="mb-2 font-bold text-lg">Détails de la commande</div>
            <div className="mb-1">SBM: {commande.sbmCount || 0} x 26&nbsp;€</div>
            {Array.isArray(commande.sbmLots) && commande.sbmLots.map((lot, i) => (
              <div key={i} className="ml-2 text-xs mb-1">
                SBM #{i + 1}: Piment {lot.options?.piment ? '✅' : '❌'} Oeuf {lot.options?.oeuf ? '✅' : '❌'} Mekbouba {lot.options?.mekbouba ? '✅' : '❌'}
              </div>
            ))}
            <div className="mb-1">BBM: {commande.bbmCount || 0} x 26&nbsp;€</div>
            {Array.isArray(commande.bbmLots) && commande.bbmLots.map((lot, i) => (
              <div key={i} className="ml-2 text-xs mb-1">
                BBM #{i + 1}: Piment {lot.options?.piment ? '✅' : '❌'} Oeuf {lot.options?.oeuf ? '✅' : '❌'} Mekbouba {lot.options?.mekbouba ? '✅' : '❌'}
              </div>
            ))}
            {/* Calcul du sous-total (SBM + BBM + Boulettes Marchi) */}
            {(() => {
              const sbm = commande.sbmCount || 0;
              const bbm = commande.bbmCount || 0;
              const marchi = commande.boulettesSuppGlobal || 0;
              const sousTotal = commande.sousTotal || (sbm * 26 + bbm * 26 + marchi * 5);
              return (
                <>
                  {marchi > 0 && (
                    <div className="mb-1">Boulettes Marchi : {marchi} x 5€</div>
                  )}
                  <div className="mb-1">Sous-total: {sousTotal}&nbsp;€</div>
                </>
              );
            })()}
            <div className="mb-1">Notes: {commande.notes && commande.notes.trim() !== '' ? commande.notes : 'Aucune'}</div>
            <div className="mb-1">Livraison: {commande.livraison === 0 ? 'GRATUITE' : `${commande.livraison || 15}€`}</div>
            <div className="mb-1 font-bold">TOTAL PAYÉ: {commande.total || ''}&nbsp;€</div>
            <div className="mt-2 text-green-700 font-semibold">Paiement CB en ligne effectué</div>
          </div>
        </div>
      )}
    </div>
  );
}

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
    setStartDate(null);
    setEndDate(null);
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
      console.log('Commandes récupérées:', data.commandes);
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
      // Total payé
      if (commande.total) {
        totalPaye += parseFloat(commande.total);
      } else if (commande.amount) {
        totalPaye += parseFloat(commande.amount) / 100;
      }
      // Nombre de produits (SBM + BBM)
      const sbmCount = commande.sbmCount || 0;
      const bbmCount = commande.bbmCount || 0;
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
      <style jsx>{`
        /* Masquer le bouton chat sur cette page */
        :global(.fixed.bottom-6.right-4) {
          display: none !important;
        }
      `}</style>
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
                <p className="text-lg font-bold text-green-600 text-center">{totalPaye.toFixed(2)}&nbsp;€</p>
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
          <div className="space-y-2">
            {filteredCommandes.map((commande, index) => (
              <TicketCommande key={commande.id || commande.orderNumber || index} commande={commande} />
            ))}
          </div>
        )}
        </div>
      </div>
    </div>
  );
}