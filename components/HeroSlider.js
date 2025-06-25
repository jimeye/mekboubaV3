import React, { useState, useEffect } from 'react';
import Image from 'next/image';

const slides = [
  {
    id: 1,
    image: 'https://img.freepik.com/photos-gratuite/trois-amis-ensemble-manger-pizza-dans-cafe_1303-26152.jpg',
    title: 'Une expérience culinaire unique',
    subtitle: 'Maintenant à Ibiza',
    subtitleSize: 'text-2xl md:text-4xl'
  },
  {
    id: 2,
    image: 'https://img.freepik.com/photos-gratuite/pizza-pepperoni-table_140725-5396.jpg',
    title: 'Saveurs de Tunis X Belleville',
    subtitle: 'Préparées avec passion',
    subtitleSize: 'text-2xl md:text-4xl'
  },
  {
    id: 3,
    image: 'https://img.freepik.com/photos-premium/pizza-fraichement-cuite-champignons-pepperoni-olives-du-basilic_715003-13553.jpg',
    title: 'Tradition tunisienne',
    subtitle: 'Saveurs authentiques kosher friendly',
    subtitleSize: 'text-2xl md:text-4xl'
  }
];

const HeroSlider = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % slides.length);
    }, 5000);

    return () => clearInterval(timer);
  }, []);

  return (
    <div className="relative h-screen w-full overflow-hidden">
      {slides.map((slide, index) => (
        <div
          key={slide.id}
          className={`absolute inset-0 transition-opacity duration-500 ${
            index === currentSlide ? 'opacity-100' : 'opacity-0'
          }`}
        >
          <Image
            src={slide.image}
            alt={slide.title}
            fill
            className="object-cover"
            priority={index === 0}
          />
          <div className="absolute inset-0 bg-gradient-to-b from-black/50 to-transparent" />
          <div className="absolute inset-0 flex flex-col items-center justify-center text-white text-center px-4">
            <h1 className="text-4xl md:text-6xl font-bold mb-4 transform transition-transform duration-500 hover:scale-105">
              {slide.title}
            </h1>
            <p className={`${slide.subtitleSize} mb-8 font-bold text-white`}>
              {slide.subtitle}
            </p>
            <div className="space-x-4">
              <button className="btn btn-primary">Commander</button>
              <button className="btn btn-secondary">Voir le Menu</button>
            </div>
          </div>
        </div>
      ))}

      {/* Indicateurs de navigation */}
      <div className="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-2 hidden">
        {slides.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrentSlide(index)}
            className={`w-3 h-3 rounded-full transition-all duration-300 ${
              index === currentSlide
                ? 'bg-white scale-125'
                : 'bg-white/50 hover:bg-white/75'
            }`}
          />
        ))}
      </div>
    </div>
  );
};

export default HeroSlider;

<style jsx global>{`
  @keyframes flash {
    0%, 100% { opacity: 1; }
    50% { opacity: 0.3; }
  }

  .flash-text {
    animation: flash 1s ease-in-out infinite;
    color: #FFF200;
    text-shadow: 0 0 10px rgba(255, 242, 0, 0.5);
  }
`}</style> 