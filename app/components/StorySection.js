import React from 'react';
import Image from 'next/image';

const StorySection = () => {
  return (
    <section id="histoire" className="py-20 bg-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Notre <span className="text-[#cf0e0e]">Histoire</span>
          </h2>
          <div className="w-20 h-1 bg-accent-yellow" />
        </div>

        <div className="grid md:grid-cols-2 gap-12 items-center">
          {/* Image avec effet de survol */}
          <div className="relative w-full h-[400px] overflow-hidden rounded-lg group">
            <Image
              src="/images/mekbouba1.jpeg"
              alt="Notre mekbouba traditionnelle"
              fill
              sizes="(max-width: 768px) 100vw, 50vw"
              style={{ objectFit: 'cover' }}
              className="transform transition-transform duration-500 group-hover:scale-110"
              priority
            />
            <div className="absolute inset-0 bg-gradient-to-t from-black/50 to-transparent opacity-0 group-hover:opacity-100 transition-opacity duration-300" />
          </div>

          {/* Contenu texte */}
          <div className="space-y-6">
            <p className="text-custom-grey mb-6">
              Fondé en 2024, Boulettes Mekbouba est né de la passion pour la cuisine tunisienne authentique. Notre chef, avec plus de 20 ans d'expérience, a créé un concept unique qui allie tradition et modernité.
            </p>
            <p className="text-custom-grey mb-6">
              Chaque boulette est préparée à la main avec des ingrédients frais et des épices soigneusement sélectionnées. Notre secret ? Une recette familiale transmise de génération en génération.
            </p>
            <p className="text-custom-grey">
              Aujourd'hui, nous sommes fiers de partager ces saveurs authentiques avec vous, en créant une expérience culinaire qui vous transporte directement en Tunisie.
            </p>
            <button className="btn btn-primary group relative overflow-hidden">
              <span className="relative z-10">En savoir plus</span>
              <div className="absolute inset-0 bg-accent-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
            </button>
          </div>
        </div>
      </div>
    </section>
  );
};

export default StorySection; 