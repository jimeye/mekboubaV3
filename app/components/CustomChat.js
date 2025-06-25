'use client';

import { useState } from 'react';

export default function CustomChat() {
  const [isOpen, setIsOpen] = useState(false);

  const handleQuickMessage = (message) => {
    const whatsappUrl = `https://wa.me/33652696976?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
    setIsOpen(false);
  };

  return (
    <>
      {/* Bouton de chat flottant */}
      <button
        onClick={() => setIsOpen(!isOpen)}
        className="fixed bottom-6 right-4 z-50 bg-accent-red/80 hover:bg-accent-red/90 text-white p-4 rounded-full shadow-lg transition-all duration-300 transform hover:scale-110"
        aria-label="Ouvrir le chat"
      >
        {isOpen ? (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
          </svg>
        ) : (
          <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 12h.01M12 12h.01M16 12h.01M21 12c0 4.418-4.03 8-9 8a9.863 9.863 0 01-4.255-.949L3 20l1.395-3.72C3.512 15.042 3 13.574 3 12c0-4.418 4.03-8 9-8s9 3.582 9 8z" />
          </svg>
        )}
      </button>

      {/* Fenêtre de chat */}
      {isOpen && (
        <div className="fixed bottom-20 right-4 z-40 w-80 h-96 bg-white rounded-lg shadow-2xl border border-gray-200 flex flex-col">
          {/* En-tête */}
          <div className="bg-accent-red text-white p-4 rounded-t-lg">
            <h3 className="font-bold text-lg">💬 Support Mekbouba</h3>
            <p className="text-sm opacity-90">Chat WhatsApp • Réponse rapide</p>
          </div>

          {/* Messages rapides */}
          <div className="flex-1 p-4 overflow-y-auto space-y-3">
            <div className="text-center text-gray-600 text-sm mb-4">
              <p className="mb-2">❓ <strong>Problème pour commander ?</strong></p>
              <p className="text-xs">Sélectionnez votre problème :</p>
            </div>
            
            <div className="space-y-2">
              <button
                onClick={() => handleQuickMessage("Bonjour, j'aimerais passer une commande chez Mekbouba, mais je n'arrive pas à finaliser ma commande. Pouvez-vous m'aider à aller au bout de la commande, s'il vous plaît ?")}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm"
              >
                1️⃣ Je n'arrive pas à finaliser
              </button>
              
              <button
                onClick={() => handleQuickMessage("Bonjour, j'aimerais passer une commande chez Mekbouba, mais je n'arrive pas à payer. Pouvez-vous m'aider à valider mon paiement, s'il vous plaît ?")}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm"
              >
                2️⃣ Je n'arrive pas à payer
              </button>
              
              <button
                onClick={() => handleQuickMessage("Bonjour, j'aimerais passer une commande chez Mekbouba, mais je n'arrive pas à me localiser. Pouvez-vous m'aider à renseigner mon adresse, s'il vous plaît ?")}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm"
              >
                3️⃣ Je n'arrive pas à me localiser
              </button>
              
              <button
                onClick={() => handleQuickMessage("Bonjour, j'aimerais passer une commande chez Mekbouba, mais j'ai un autre problème. Pouvez-vous m'aider, s'il vous plaît ?")}
                className="w-full text-left p-3 bg-gray-50 hover:bg-gray-100 rounded-lg transition-colors duration-200 text-sm"
              >
                4️⃣ Autre
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
} 