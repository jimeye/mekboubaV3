'use client';

import Navbar from '../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';
import { useState, useEffect } from 'react';

export default function MenuPage() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  useEffect(() => {
    const handleScroll = () => {
      const scrollTop = window.scrollY;
      setIsHeaderVisible(scrollTop < 100);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <main className="min-h-screen relative">
      <div className="absolute inset-0 z-0">
        <Image
          src="/images/uneexperienceunique-ibiza-kosher-cacher-friendly.webp"
          alt=""
          fill
          className="object-cover"
          unoptimized
        />
        <div className="absolute inset-0 bg-black/50"></div>
      </div>
      <Navbar isVisible={isHeaderVisible} />
      <div className="container mx-auto px-4 pt-20 pb-8 relative z-10">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-white mb-6">La Boulette Ibiza 🌶️<br />Kosher Friendly</h1>
          <div className="w-24 h-1 bg-accent-red mx-auto mb-6"></div>
          <p className="text-xl text-white/90 max-w-2xl mx-auto text-center">
            Découvrez nos spécialités authentiques,<br className="md:hidden" /> préparées avec passion et des ingrédients<br className="md:hidden" /> de qualité à Ibiza, kosher friendly.
          </p>
        </div>
        
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mx-auto max-w-7xl">
          {/* Sandwich Boulettes Mekbouba */}
          <div className="group relative">
            <div className="shadow-2xl overflow-hidden flex flex-col relative border-2 border-accent-red bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-[650px]">
              <div className="relative h-56 aspect-square">
                <Image
                  src="/images/sbm1.webp"
                  alt="Sandwich Boulettes Mekbouba SBM"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Sandwich Boulettes<br/>Mekbouba SBM<br/>26 €</h3>
                <p className="text-gray-600 mb-4 text-center flex-grow leading-relaxed">
                  Découvrez notre sandwich signature aux boulettes, piment, mekbouba & oeuf, 
                  une explosion de saveurs tunisiennes authentiques.
                </p>
                <div className="bg-orange-50 p-3 rounded-lg mb-4 badge-border-pulse border border-red-500">
                  <p className="text-sm text-orange-800 text-center font-semibold">
                    🚚 Livraison gratuite pour 5 SBM
                  </p>
                </div>
                <Link 
                  href="/reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center mt-auto text-base btn-shine-3d"
                >
                  <span className="text-[1.84rem]">🥪</span>
                  <span>Réserver</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Box Boulettes Mekbouba */}
          <div className="group relative">
            <div className="shadow-2xl overflow-hidden flex flex-col relative border-2 border-accent-red bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-[650px]">
              <div className="relative h-56 aspect-square">
                <Image
                  src="/images/bbm1.webp"
                  alt="Box Boulettes Mekbouba BBM"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Box Boulettes<br/>Mekbouba BBM<br/>26 €</h3>
                <p className="text-gray-600 mb-4 text-center flex-grow leading-relaxed">
                  La même que le SBM boulettes, piment, mekbouba & oeuf dans une box complète 
                  avec accompagnements traditionnels.
                </p>
                <div className="bg-green-50 p-3 rounded-lg mb-4 badge-border-pulse border border-red-500">
                  <p className="text-sm text-green-800 text-center font-semibold">
                    🚚 Livraison gratuite pour 5 BBM
                  </p>
                </div>
                <Link 
                  href="/reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-5 py-3 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center mt-auto text-base btn-shine-3d"
                >
                  <span className="text-[1.84rem]">🍱</span>
                  <span>Réserver</span>
                </Link>
              </div>
            </div>
          </div>

          {/* Tajines Shabbat */}
          <div className="group relative">
            <div className="shadow-2xl overflow-hidden flex flex-col relative border-2 border-accent-red bg-white transform transition-all duration-500 hover:scale-105 hover:shadow-3xl h-[650px]">
              <div className="relative h-56 aspect-square">
                <Image
                  src="/images/tajine2.webp"
                  alt="Tajines Shabbat"
                  fill
                  className="object-cover group-hover:scale-110 transition-transform duration-500"
                  sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                  quality={85}
                />
              </div>
              <div className="p-6 flex flex-col flex-grow">
                <h3 className="text-2xl font-bold mb-4 text-center text-gray-800">Tajines<br/>Shabbat<br/>35 €</h3>
                <p className="text-gray-600 mb-4 text-center flex-grow leading-relaxed">
                  Nos tajines traditionnels, loubia, hams, nikitouche, classique légumes, 
                  5 salades et sa semoule, parfaits pour vos repas entre amis.
                </p>
                <div className="bg-gray-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-gray-600 text-center font-semibold">
                    👥 Minimum 6 personnes
                  </p>
                </div>
                <button 
                  className="inline-flex items-center justify-center space-x-2 bg-gray-400 text-white px-5 py-1.5 rounded-xl font-semibold cursor-not-allowed w-full text-center mt-auto text-base"
                  disabled
                >
                  <span className="text-[1.84rem]">🔜</span>
                  <span>Coming Soon</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* Footer Amélioré */}
      <footer className="bg-accent-red text-white py-6">
        <div className="container mx-auto px-4">
          <div className="grid grid-cols-1 gap-4">
            <div className="text-center">
              <h3 className="text-xl font-bold mb-4">LA BOULETTE IBIZA 🌶️</h3>
              <div className="text-lg mb-4">Kosher Friendly</div>
              <p className="text-sm text-gray-200 mb-4">
                Cuisine certifiée 100% judéo-tunisienne,<br />
                transmise de génération en génération.<br />
                Viande Kosher by <a href="https://bovini.fr/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Bovini</a>.
              </p>
            </div>
            
            <div className="text-center">
              <div className="space-y-2 text-sm">
                <a href="https://wa.me/33652696976" target="_blank" rel="noopener noreferrer" className="block hover:text-gray-200 transition-colors">
                  📞 +33 6 52 69 69 76
                </a>
                <a href="mailto:info@laboulette-ibiza.com" className="block hover:text-gray-200 transition-colors">
                  📧 info@laboulette-ibiza.com
                </a>
                <a 
                  href="https://maps.google.com/maps?q=38.96426,1.47936&z=15"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="block hover:text-gray-200 transition-colors"
                  title="Ouvrir dans Google Maps"
                >
                  🌍 Ibiza, Espagne
                </a>
              </div>
            </div>
            
            <div className="text-center">
              <div className="space-y-2 text-sm text-gray-200">
                <div>⏰ Passez votre commande du<br />Dimanche au Jeudi 12h Max</div>
              </div>
            </div>
          </div>
          
          <div className="border-t border-white/20 mt-8 pt-8 text-center">
            <p className="text-sm text-gray-200">
                              ©2025 La Boulette Ibiza 🌶️ Kosher friendly<br /><span className="text-xs">Tous droits réservés</span>
            </p>
            <p className="text-xs text-gray-200 mt-2">
              <a href="https://wa.me/33608251223?text=Je veux le meme site !!" target="_blank" rel="noopener noreferrer" className="hover:text-gray-200 transition-colors">
                Website design by ©MEKBOUBA STUDIO
              </a>
            </p>
          </div>
        </div>
      </footer>
    </main>
  );
} 