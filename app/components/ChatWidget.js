'use client';

import { useEffect } from 'react';

export default function ChatWidget() {
  useEffect(() => {
    // Script Tawk.to
    const script = document.createElement('script');
    script.async = true;
    script.src = 'https://embed.tawk.to/YOUR_TAWK_TO_WIDGET_ID/default';
    script.charset = 'UTF-8';
    script.setAttribute('crossorigin', '*');
    
    document.head.appendChild(script);

    // Configuration du widget
    window.Tawk_API = window.Tawk_API || {};
    window.Tawk_LoadStart = new Date();
    
    // Personnalisation du widget
    window.Tawk_API.onLoad = function() {
      // Personnaliser le widget
      window.Tawk_API.setAttributes({
        'name': 'Client Mekbouba',
        'email': '',
        'phone': '',
        'restaurant': 'Mekbouba, Boulettes & Piments'
      });
      
      // Message de bienvenue personnalisé
      window.Tawk_API.maximize();
      window.Tawk_API.sendMessage('🍽️ Bonjour ! Bienvenue chez Mekbouba. Comment puis-je vous aider aujourd\'hui ?');
    };

    // Nettoyage lors du démontage
    return () => {
      if (document.head.contains(script)) {
        document.head.removeChild(script);
      }
    };
  }, []);

  return null; // Ce composant ne rend rien visuellement
} 