'use client';

import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function Newsletter() {
  const [isMounted, setIsMounted] = useState(false);

  useEffect(() => {
    setIsMounted(true);
  }, []);

  if (!isMounted) {
    return null;
  }

  return (
    <div className="min-h-screen bg-black text-white">
      <div className="relative min-h-screen">
        <div className="absolute inset-0 z-0">
          <Image
            src="/images/slider4-small.jpg"
            alt=""
            fill
            className="object-cover opacity-90"
            unoptimized
          />
        </div>
        <div className="relative z-10 container mx-auto px-4 py-8">
          <div className="max-w-4xl mx-auto">
            <div className="text-center mb-12">
              <div className="relative z-10">
                {/* En-tête */}
                <div className="relative h-48 print:h-[80mm]">
                  <div className="absolute inset-0 flex items-center justify-center pt-12">
                    <div className="text-center relative w-full h-full">
                      <p className="text-xl md:text-2xl text-white/90 mb-1 -mt-16 text-[1.2em]">*Uniquement le vendredi</p>
                      <p className="text-base md:text-lg text-white/90 text-[0.63em] -mt-1">Pré-Commande Obligatoire</p>
                      <a href="https://mekbouba.vercel.app" target="_blank" rel="noopener noreferrer" className="block relative z-10">
                        <h1 className="text-4xl font-bold text-white mb-6 scale-[1.07]">🌶️ MEKBOUBA, BOULETTES & PIMENT 🌶️</h1>
                        <p className="text-3xl text-white mt-48 print:mt-48 print:relative print:top-0">Maintenant à Ibiza</p>
                      </a>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-8">
              {/* Sandwich Boulettes Mekbouba */}
              <div className="rounded-lg shadow-lg overflow-hidden flex-1 max-w-sm flex flex-col relative border-2 border-accent-red bg-black/70 min-h-[24rem]">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/une experience unique-small.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <h2 className="text-2xl font-bold mb-4 text-white text-center">Sandwich Boulettes<br/>Mekbouba SBM</h2>
                  <p className="text-white mb-6 flex-grow">
                    Découvrez notre sandwich signature : des boulettes de bœuf hachées fraîches, 
                    marinées dans nos épices secrètes, servies dans un pain frais avec nos sauces 
                    maison et une touche de piment du Maroc. Une explosion de saveurs à chaque bouchée !
                  </p>
                  <a 
                    href="https://wa.me/33652696976?text=Envie de régaler vos papilles ? %0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-2 rounded-lg font-semibold transition-colors duration-300 mt-auto"
                  >
                    🥪 Commander
                  </a>
                </div>
              </div>

              {/* Box Boulettes Mekbouba */}
              <div className="rounded-lg shadow-lg overflow-hidden flex-1 max-w-sm flex flex-col relative border-2 border-accent-red bg-black/70 min-h-[24rem]">
                <div className="absolute inset-0 z-0">
                  <Image
                    src="/images/nos specialites-small.jpg"
                    alt=""
                    fill
                    className="object-cover"
                    unoptimized
                  />
                </div>
                <div className="relative z-10 p-6 flex flex-col h-full">
                  <h2 className="text-2xl font-bold mb-4 text-white text-center">Box Boulettes<br/>Mekbouba BBM</h2>
                  <p className="text-white mb-6 flex-grow">
                    Notre box complète : 4 boulettes de bœuf hachées fraîches, riz parfumé, 
                    salade fraîche, sauces maison et piment du Maroc. Parfait pour un repas 
                    complet et savoureux !
                  </p>
                  <a 
                    href="https://wa.me/33652696976?text=Envie de régaler vos papilles ?%0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="block w-full bg-accent-red hover:bg-accent-red/90 text-white text-center py-2 rounded-lg font-semibold transition-colors duration-300 mt-auto"
                  >
                    🍽️ Commander
                  </a>
                </div>
              </div>
            </div>
          </div>

          {/* Footer sur la photo de fond */}
          <div className="mt-32 -mx-4 -mx-8 -mx-16 -mx-32">
            <div className="bg-accent-red text-white py-8 px-32">
              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                <div>
                  <h3 className="text-lg font-semibold mb-4">Contact</h3>
                  <a href="https://wa.me/33652696976?text=Envie de régaler vos papilles ?%0A%0ACommandez dès maintenant vos Sandwichs Boulettes Mekbouba ou nos délicieuses Box Boulettes Mekbouba !%0A%0AMerci de nous indiquer :%0A- Le nombre de sandwichs et/ou de box souhaité(s)%0A- Votre localisation sur l'île%0A- L'heure de livraison souhaitée%0A%0ALivraison 15 € — Offerte dès 6 produits commandés%0AOn s'occupe du reste, et promis, c'est une explosion de saveurs !" target="_blank" rel="noopener noreferrer" className="text-sm hover:text-gray-200 transition-colors block mb-2">Téléphone: +33 6 52 69 69 76</a>
                  <a href="mailto:info@mekbouba.com" className="text-gray-200 transition-colors">Email: info@mekbouba.com</a>
                </div>
                <div>
                  <h3 className="text-lg font-semibold mb-4">Pré-Commande Obligatoire</h3>
                  <p className="text-sm mb-2">Lundi - Jeudi max 12h</p>
                  <p className="text-sm">Cuisine certifiée 100% Judéo-Tunisienne</p>
                  <p className="text-sm mt-2">© 2025 MEKBOUBA, BOULETTES & PIMENTS 🌶️</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 