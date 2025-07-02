"use client";

import Image from 'next/image';
import Navbar from './components/Navbar';
import Link from 'next/link';
import { useState, useEffect } from 'react';
import HeroSliderNew from './components/HeroSliderNew';

const heroImages = [
  {
    id: 1,
    image: '/images/uneexperienceunique-ibiza-kosher-cacher-friendly.webp',
    title: 'Sandwich Boulettes Mekbouba',
    description: 'Le Sandwich Boulette Mekbouba<br/>qui te fera oublier celui de ta mère'
  },
  {
    id: 2,
    image: '/images/mekbouba1-ibiza-kosher-cacher-friendly.webp',
    title: 'Mekbouba',
    description: 'Poivrons, Piments, Tomates & Zeit'
  },
  {
    id: 3,
    image: '/images/nosspecialites-ibiza-kosher-cacher-friendly.webp',
    title: 'Boulettes Marchi',
    description: 'Boeuf, Oignons, Persil,<br/>Coriandre & Rose'
  },
  {
    id: 4,
    image: '/images/ibizasunshine-ibiza-kosher-cacher-friendly.webp',
    title: 'Ibiza Isla Bonita',
    description: 'Une Expérience Culinaire Unique<br/>À Ibiza Kosher Friendly'
  }
];

const tajineImages = [
  '/images/tajine2.webp', // Image principale des tajines
  '/images/tajine1.webp', // Votre nouvelle image de tajine
  // Ajoutez ici vos nouvelles images de tajines en format WebP
  // Exemple: '/images/tajine3.webp', '/images/tajine4.webp', etc.
];

function OrientationLock({ children }) {
  const [showOverlay, setShowOverlay] = useState(false);

  useEffect(() => {
    const check = () => {
      const isMobile = window.innerWidth < 900;
      const isPortrait = window.matchMedia('(orientation: portrait)').matches;
      setShowOverlay(isMobile && !isPortrait);
    };
    check();
    window.addEventListener('resize', check);
    window.addEventListener('orientationchange', check);
    return () => {
      window.removeEventListener('resize', check);
      window.removeEventListener('orientationchange', check);
    };
  }, []);

  if (showOverlay) {
    return (
      <div className="fixed inset-0 bg-black/90 flex flex-col items-center justify-center z-[9999]">
        <p className="text-white text-2xl font-bold mb-4">Veuillez tourner votre téléphone en mode portrait 📱</p>
      </div>
    );
  }
  return children;
}

export default function HomeNew() {
  const [isHeaderVisible, setIsHeaderVisible] = useState(true);

  // S'assurer que la page se positionne en haut lors du rafraîchissement
  useEffect(() => {
    // Méthode 1: Scroll vers le haut immédiatement
    window.scrollTo(0, 0);
    
    // Méthode 2: Supprimer les ancres dans l'URL
    if (window.location.hash) {
      window.location.hash = '';
    }
    
    // Méthode 3: Forcer le scroll après un délai (pour mobile)
    setTimeout(() => {
      window.scrollTo(0, 0);
      document.body.scrollTop = 0;
      document.documentElement.scrollTop = 0;
    }, 100);
    
    // Méthode 4: Empêcher le scroll automatique du navigateur
    const preventScroll = (e) => {
      e.preventDefault();
      window.scrollTo(0, 0);
    };
    
    // Ajouter l'écouteur temporairement
    window.addEventListener('scroll', preventScroll, { passive: false });
    
    // Retirer l'écouteur après 500ms
    setTimeout(() => {
      window.removeEventListener('scroll', preventScroll);
    }, 500);
    
  }, []);

  const handleSliderScroll = (isScrolledOnSlider) => {
    setIsHeaderVisible(!isScrolledOnSlider);
  };

  return (
    <OrientationLock>
      <main className="min-h-screen bg-white">
        <Navbar isVisible={isHeaderVisible} />
        
        {/* Hero Section avec Images à la Suite */}
        <section id="hero" className="relative">
          <HeroSliderNew images={heroImages} onSliderScroll={handleSliderScroll} />
        </section>
        
        {/* H1 Principal pour SEO */}
        <section className="py-8 bg-white">
          <div className="container mx-auto px-4 text-center">
            <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-4">
              La Boulette Ibiza 🌶️ Cacher, Kosher Friendly à Ibiza
            </h1>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto">
              Découvrez notre cuisine traditionnelle, servie en bord de mer à Ibiza. Idéal pour vos vacances sous le soleil. Cacher, Kosher Friendly.
            </p>
          </div>
        </section>

        {/* About Section */}
        <section id="about" className="relative min-h-screen bg-white py-20 hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">Notre Histoire</h2>
              <div className="w-24 h-1 bg-accent-red mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
              <div className="space-y-6 text-center lg:text-left">
                <h3 className="text-3xl font-bold text-gray-800">Cuisine Judéo-Tunisienne Authentique - Restaurant Kosher Ibiza</h3>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Découvrez l'authenticité de la cuisine judéo-tunisienne transmise de génération en génération. 
                  Restaurant cacher friendly à Ibiza, spécialisé dans les boulettes et piments traditionnels. 
                  Nos recettes traditionnelles, préparées avec des ingrédients frais et des épices sélectionnées, 
                  vous transportent directement dans les saveurs de Tunisie.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Chaque plat raconte une histoire, chaque épice évoque un souvenir. 
                  De nos boulettes maison aux tajines traditionnels, nous préservons 
                  l'héritage culinaire de nos ancêtres.
                </p>
                <p className="text-lg text-gray-600 leading-relaxed">
                  Notre cuisine se distingue par ses <strong>épices authentiques</strong> soigneusement sélectionnées, 
                  notre <strong>chef expérimenté</strong> qui maîtrise parfaitement les techniques traditionnelles, 
                  et nos <strong>recettes traditionnelles</strong> transmises de génération en génération. 
                  Nous sommes fiers d'être <strong>100% Judéo-Tunisien</strong>, préservant ainsi l'authenticité 
                  et les saveurs de notre héritage culinaire.
                </p>
              </div>
              
              <div className="relative">
                <div className="relative h-full min-h-[500px] overflow-hidden shadow-2xl border-2 border-accent-red">
                  <Image
                    src="/images/mekbouba1.jpeg"
                    alt="Cuisine traditionnelle"
                    fill
                    className="object-cover"
                    sizes="(max-width: 768px) 100vw, 50vw"
                    quality={85}
                  />
                  <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent"></div>
                </div>
              </div>
            </div>
          </div>
        </section>

        {/* Menu Section Amélioré */}
        <section id="menu" className="relative min-h-screen bg-gray-50 py-20 transition-all duration-700 ease-in-out">
            <div className="absolute inset-0 z-0">
              <Image
                src="/images/une experience unique.jpg"
                alt=""
                fill
              className="object-cover"
                sizes="100vw"
                quality={75}
              />
          </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Notre Menu</h2>
              <div className="w-24 h-1 bg-accent-red mx-auto mb-6"></div>
              <p className="text-xl text-white max-w-2xl mx-auto">
                Découvrez nos spécialités authentiques, préparées avec passion et des ingrédients de qualité
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
                        🚚 Livraison gratuite pour 6 SBM
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
                    <div className="bg-orange-50 p-3 rounded-lg mb-4 badge-border-pulse border border-red-500">
                      <p className="text-sm text-green-800 text-center font-semibold">
                        🚚 Livraison gratuite pour 6 BBM
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
                    <div className="bg-orange-50 p-3 rounded-lg mb-4 badge-border-pulse border border-red-500">
                      <p className="text-sm text-gray-600 text-center font-semibold">
                        👥 Minimum 6 personnes
                      </p>
                    </div>
                    <button 
                      className="inline-flex items-center justify-center space-x-2 bg-gray-400 text-white px-5 py-3 rounded-xl font-semibold cursor-not-allowed w-full text-center mt-auto text-base btn-shine-3d"
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
        </section>

        {/* Gallery Section */}
        <section id="gallery" className="relative min-h-screen bg-white py-20 hidden">
          <div className="container mx-auto px-4">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-gray-800 mb-6">Diner Room</h2>
              <div className="w-24 h-1 bg-accent-red mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
              {[
                '/images/mekbouba1.jpeg',
                '/images/nos specialites.jpg',
                '/images/une experience unique.jpg',
                '/images/ibizasunshine.webp'
              ].map((image, index) => (
                <div key={index} className="group relative overflow-hidden shadow-lg">
                  <div className="relative h-64">
                    <Image
                      src={image}
                      alt={`Galerie ${index + 1}`}
                      fill
                      className="object-cover group-hover:scale-110 transition-transform duration-500"
                      sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
                      quality={85}
                    />
                    <div className="absolute inset-0 bg-black/0 group-hover:bg-black/30 transition-all duration-300 flex items-center justify-center">
                    </div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </section>

        {/* Contact Section */}
        <section id="contact" className="relative min-h-screen py-20">
                    <div className="absolute inset-0 z-0">
                      <Image
                        src="/images/une experience unique.jpg"
                        alt=""
                        fill
                        className="object-cover"
                        sizes="100vw"
                        quality={75}
                      />
                    </div>
          
          <div className="container mx-auto px-4 relative z-10">
            <div className="text-center mb-16">
              <h2 className="text-5xl font-bold text-white mb-6">Prenez le micro 🎙️</h2>
              <div className="w-24 h-1 bg-accent-red mx-auto"></div>
            </div>
            
            <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 max-w-6xl mx-auto">
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-[400px] flex flex-col">
                <h3 className="text-[1.7rem] font-bold text-white mb-6 text-center">Essentiel</h3>
                <div className="space-y-4 flex-grow text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-[1.2rem]">📞</div>
                    <div>
                      <div className="text-white font-semibold text-base">Téléphone</div>
                      <a href="https://wa.me/33652696976" target="_blank" rel="noopener noreferrer" className="text-white hover:text-accent-red transition-colors text-base">
                        +33 6 52 69 69 76
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-[1.2rem]">📧</div>
                    <div>
                      <div className="text-white font-semibold text-base">Email</div>
                                      <a href="mailto:info@laboulette-ibiza.com" className="text-white hover:text-accent-red transition-colors text-base">
                        info@laboulette-ibiza.com
                      </a>
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-[1.2rem]">🌍</div>
                    <div>
                      <div className="text-white font-semibold text-base">Localisation</div>
                      <a 
                        href="https://maps.google.com/maps?q=38.96426,1.47936&z=15"
                        target="_blank"
                        rel="noopener noreferrer"
                        className="text-white hover:text-accent-red transition-colors duration-300 cursor-pointer text-base"
                        title="Ouvrir dans Plans, Waze ou Google Maps"
                      >
                        Ibiza, Espagne
                      </a>
                    </div>
                  </div>
                    </div>
                  </div>

              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-[400px] flex flex-col">
                <h3 className="text-[1.7rem] font-bold text-white mb-6 text-center">Pré-commande obligatoire</h3>
                <div className="space-y-4 flex-grow text-center">
                  <div className="flex flex-col items-center space-y-2">
                    <div className="text-[1.2rem]">⏰</div>
                    <div className="text-base text-white hover:text-accent-red transition-colors duration-300">
                      Passez votre commande du<br />Dimanche au Jeudi 12h Max<br />Vous serez livrer vendredi !
                    </div>
                  </div>
                  <div className="flex flex-col items-center space-y-2 mt-2">
                    <div className="text-base text-white hover:text-accent-red transition-colors duration-300">
                      Viande Kosher by <a href="https://bovini.fr/" target="_blank" rel="noopener noreferrer" className="underline hover:text-white">Bovini</a>
                    </div>
                  </div>
                </div>
              </div>
              
              <div className="bg-white/10 backdrop-blur-sm p-8 rounded-2xl h-[400px] flex flex-col">
                <h3 className="text-[1.7rem] font-bold text-white mb-6 text-center">Commander maintenant</h3>
                <p className="text-white hover:text-accent-red transition-colors duration-300 mb-6 flex-grow text-center leading-relaxed px-4 text-base">
                  Prêt à découvrir nos saveurs authentiques ?<br />
                  Commandez directement via WhatsApp !
                </p>
                <a 
                  href="/reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-5 py-1.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center mt-auto text-base"
                >
                  <span className="text-[1.84rem]">💬</span>
                  <span>Réserver</span>
                </a>
              </div>
            </div>
          </div>
        </section>

        {/* Footer Amélioré */}
        <footer className="bg-accent-red text-white py-6">
          <div className="container mx-auto px-4">
            <div className="grid grid-cols-1 gap-4">
              <div className="text-center">
                <h3 className="text-xl font-bold mb-4">LA BOULETTE IBIZA 🌶️</h3>
                <div className="text-lg mb-4">🕍 Kosher Friendly 🕍</div>
                <p className="text-sm text-gray-200 mb-4">
                  Cuisine certifiée 100% Judéo-Tunisienne,<br />
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
                  <div>Vous serez livrer vendredi !</div>
                </div>
              </div>
            </div>
            
            <div className="border-t border-white/20 mt-8 pt-8 text-center">
              <p className="text-sm text-gray-200">
                © 2025 La Boulette Ibiza 🌶️ Kosher friendly<br /><span className="text-xs">Tous droits réservés</span>
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
    </OrientationLock>
  );
} 