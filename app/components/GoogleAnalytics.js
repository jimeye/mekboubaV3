'use client';

import { useEffect } from 'react';
import Script from 'next/script';

export default function GoogleAnalytics() {
  useEffect(() => {
    // Initialiser Google Analytics
    if (typeof window !== 'undefined' && window.gtag) {
      window.gtag('config', 'G-XXXXXXXXXX', { // REMPLACER PAR VOTRE VRAI ID (ex: G-ABC123DEF4)
        page_title: 'Mekbouba Restaurant',
        page_location: window.location.href,
      });
    }
  }, []);

  return (
    <>
      {/* Google Analytics Script */}
      <Script
        src="https://www.googletagmanager.com/gtag/js?id=G-XXXXXXXXXX" // REMPLACER PAR VOTRE VRAI ID
        strategy="afterInteractive"
      />
      <Script id="google-analytics" strategy="afterInteractive">
        {`
          window.dataLayer = window.dataLayer || [];
          function gtag(){dataLayer.push(arguments);}
          gtag('js', new Date());
          gtag('config', 'G-XXXXXXXXXX', { // REMPLACER PAR VOTRE VRAI ID
            page_title: 'Mekbouba Restaurant',
            page_location: window.location.href,
          });
        `}
      </Script>
    </>
  );
} 