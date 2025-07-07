'use client'

export default function AvisPage() {
  return (
    <main className="min-h-screen relative">
      {/* Image de fond */}
      <div 
        className="absolute inset-0 bg-cover bg-center bg-no-repeat"
        style={{
          backgroundImage: "url('/images/uneexperienceunique-ibiza-kosher-cacher-friendly-avis.webp')"
        }}
      >
        <div className="absolute inset-0 bg-black/50"></div>
      </div>

      {/* Contenu */}
      <div className="relative z-10 py-16">
        <div className="container mx-auto px-4">
          {/* Titre principal */}
          <div className="text-center mb-12">
            <h1 className="text-4xl md:text-5xl font-bold text-white mb-4">
              Retour d'expérience
            </h1>
            <p className="text-lg text-gray-200 max-w-2xl mx-auto">
              Découvrez ce que nos clients disent de leur expérience chez La Boulette Ibiza
            </p>
          </div>

          {/* Section des avis Google */}
          <div className="max-w-4xl mx-auto">
            <div className="bg-white/95 backdrop-blur-sm rounded-2xl shadow-2xl p-8 mb-8">
              <div className="flex items-center justify-center mb-6">
                <div className="flex items-center space-x-2">
                  <svg className="w-8 h-8 text-yellow-400" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  <h2 className="text-2xl font-bold text-gray-800">Avis Google</h2>
                </div>
              </div>
              
              {/* Placeholder pour les avis - à remplacer par les vrais avis */}
              <div className="space-y-6">
                <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-lg">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Il y a 9 heures</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Excellent - J'ai retrouvé les saveurs de mon enfance, cuisine maison traditionnelle.... Un régal !!!!!"
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- Didier</p>
                </div>

                <div className="border-l-4 border-orange-500 pl-6 py-4 bg-orange-50 rounded-r-lg">
                  <div className="flex items-center mb-2">
                    <div className="flex text-yellow-400">
                      {[...Array(5)].map((_, i) => (
                        <svg key={i} className="w-5 h-5" fill="currentColor" viewBox="0 0 20 20">
                          <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                        </svg>
                      ))}
                    </div>
                    <span className="ml-2 text-sm text-gray-600">Il y a 1 mois</span>
                  </div>
                  <p className="text-gray-700 italic">
                    "Un vrai goût de Tunisie à Ibiza ! Les saveurs sont authentiques et le service est impeccable."
                  </p>
                  <p className="text-sm text-gray-500 mt-2">- Client Google</p>
                </div>
              </div>

              {/* Bouton pour voir plus d'avis sur Google */}
              <div className="text-center mt-8">
                <a 
                  href="https://www.google.com/search?q=LA+BOULETTES+IBIZA" 
                  target="_blank" 
                  rel="noopener noreferrer"
                  className="inline-flex items-center px-6 py-3 bg-orange-500 text-white font-semibold rounded-lg hover:bg-orange-600 transition-colors"
                >
                  <svg className="w-5 h-5 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                  Voir tous nos avis sur Google
                </a>
              </div>
            </div>
          </div>
        </div>
      </div>
    </main>
  )
} 