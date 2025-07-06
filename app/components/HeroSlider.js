'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { useRouter } from 'next/navigation';

const slides = [
  {
    id: 3,
    image: '/images/uneexperienceunique-ibiza-kosher-cacher-friendly.webp',
    title: 'Sandwich Boulettes Mekbouba',
    description: 'Le Sandwich Boulette Mekbouba qui te fera oublier celui de ta mère'
  },
  {
    id: 1,
    image: '/images/mekbouba1.webp',
    title: 'Cuisine Judéo-Tunisienne',
    description: 'Une Expérience Culinaire Unique<br/>À Ibiza Kosher Friendly'
  },
  {
    id: 2,
    image: '/images/nos specialites.webp',
    title: 'Boulettes Marchi',
    description: 'Boeuf, Oignons, Persil,<br/>Coriandre & Rose'
  },
  {
    id: 4,
    image: '/images/slider4-small.webp',
    title: 'Mekbouba',
    description: 'Poivrons, Piments, Tomates & Zeit'
  }
];

export default function HeroSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const router = useRouter();

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  const handleReservationClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    router.push('/reservation');
  };

  return (
    <div className="relative h-screen overflow-hidden">
      <div className="relative w-full h-screen">
        {/* Logo fixe */}
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden md:block">
          <div className="relative w-32 h-32 md:w-52 md:h-52">
            <Image
              src="/images/logoile.png"
              alt="Logo Ile"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </div>

        {/* Logo mobile */}
        <div className="absolute top-[20%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden">
          <div className="relative w-32 h-32 md:w-52 md:h-52 scale-[1.46]">
            <Image
              src="/images/logoile.png"
              alt="Logo Ile"
              fill
              className="object-contain"
              unoptimized
              priority
            />
          </div>
        </div>

        {slides.map((slide, index) => (
          <div
            key={slide.id}
            className={`absolute inset-0 transition-opacity duration-1000 ${
              currentSlide === index ? 'opacity-100' : 'opacity-0'
            }`}
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                unoptimized
              />
              <div className="absolute inset-0 bg-black/30" />
              <div className="absolute inset-0 flex flex-col items-center justify-center text-white z-10">
                <h1 className="text-4xl md:text-6xl font-bold mb-4 text-center">{slide.title}</h1>
                <p className="text-xl md:text-2xl text-center max-w-2xl px-4" dangerouslySetInnerHTML={{ __html: slide.description }}></p>
                <a 
                  href="#menu"
                  className="mt-6 bg-accent-red hover:bg-accent-red/90 text-white text-center py-3 px-6 rounded-lg font-semibold transition-colors duration-300"
                >
                  Notre Menu
                </a>
                <p className="text-xl md:text-2xl text-white/90 mt-2 mb-1 text-[1.2em] text-center">*Uniquement le vendredi</p>
                <p className="text-base md:text-lg text-white/90 text-[0.63em] -mt-1 text-center">Pré-Commande Obligatoire<br />Free Delivery pour 6 BBM et SBM</p>
                <a 
                  href="/reservation"
                  className="text-sm md:text-base text-white/80 text-[0.55em] mt-24 hover:text-white transition-colors duration-300 cursor-pointer underline block relative z-50"
                >
                  Réservez votre plaisir dès maintenant – c'est open 🚀
                </a>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="absolute bottom-2 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 md:space-x-3 hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-125' : 'bg-white/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
} 