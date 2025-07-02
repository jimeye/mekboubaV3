import Navbar from '../components/Navbar';
import Link from 'next/link';
import Image from 'next/image';

export default function MenuPage() {
  return (
    <main className="min-h-screen bg-white">
      <Navbar />
      <div className="container mx-auto px-4 py-20">
        <div className="text-center mb-16">
          <h1 className="text-5xl font-bold text-gray-800 mb-6">La Boulette Ibiza – Restaurant cacher friendly à Ibiza</h1>
          <div className="w-24 h-1 bg-accent-red mx-auto mb-6"></div>
          <p className="text-xl text-gray-600 max-w-2xl mx-auto">
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
                <div className="bg-orange-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-orange-800 text-center font-semibold">
                    🚚 Livraison gratuite pour 5 SBM
                  </p>
                </div>
                <Link 
                  href="/reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-5 py-1.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center mt-auto text-base"
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
                <div className="bg-green-50 p-3 rounded-lg mb-4">
                  <p className="text-sm text-green-800 text-center font-semibold">
                    🚚 Livraison gratuite pour 5 BBM
                  </p>
                </div>
                <Link 
                  href="/reservation"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="inline-flex items-center justify-center space-x-2 bg-accent-red hover:bg-accent-red/90 text-white px-5 py-1.5 rounded-xl font-semibold transition-all duration-300 transform hover:scale-105 shadow-lg w-full text-center mt-auto text-base"
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
    </main>
  );
} 