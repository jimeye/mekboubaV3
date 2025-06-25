'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';
import Link from 'next/link';

export default function HeroSliderNew({ images, onSliderScroll }) {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  // Forcer le scroll vers le haut au chargement de la page
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTop = 0;
    }
    // Forcer aussi le scroll de la page principale
    window.scrollTo(0, 0);
  }, []);

  // Auto-play désactivé pour éviter les conflits de scroll
  // useEffect(() => {
  //   const timer = setInterval(() => {
  //     setCurrentSlide((prev) => (prev + 1) % images.length);
  //   }, 8000); // 8 secondes par slide

  //   return () => clearInterval(timer);
  // }, [images.length]);

  const handleSliderScroll = (event) => {
    const isScrolled = event.currentTarget.scrollTop > 1;
    if (onSliderScroll) {
      onSliderScroll(isScrolled);
    }
  };

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % images.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + images.length) % images.length);
  };

  const goToSlide = (index) => {
    setCurrentSlide(index);
  };

  // Gestion du swipe tactile
  const onTouchStart = (e) => {
    setTouchEnd(null);
    setTouchStart(e.targetTouches[0].clientX);
  };

  const onTouchMove = (e) => {
    setTouchEnd(e.targetTouches[0].clientX);
  };

  const onTouchEnd = () => {
    if (!touchStart || !touchEnd) return;
    
    const distance = touchStart - touchEnd;
    const isLeftSwipe = distance > 50;
    const isRightSwipe = distance < -50;

    if (isLeftSwipe) {
      nextSlide();
    }
    if (isRightSwipe) {
      prevSlide();
    }
  };

  return (
    <div 
      ref={sliderRef}
      className="relative h-screen overflow-y-auto"
      onScroll={handleSliderScroll}
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full">
        {/* Logo mobile - visible seulement dans le slider */}
        <div className="fixed top-[17%] left-1/2 transform -translate-x-1/2 -translate-y-1/2 z-20 hidden">
          <div className="relative w-32 h-32 md:w-52 md:h-52 scale-[1.46]">
            <Image
              src="/images/logo ile.png"
              alt="Logo Ile"
              fill
              className="object-contain"
              priority
              sizes="(max-width: 768px) 128px, 208px"
              quality={85}
            />
          </div>
        </div>

        {/* Slides en scroll vertical */}
        {images.map((slide, index) => (
          <div
            key={slide.id}
            className="relative w-full h-screen"
          >
            <div className="relative w-full h-full">
              <Image
                src={slide.image}
                alt={slide.title}
                fill
                className="object-cover"
                priority={index === 0}
                sizes="100vw"
                quality={85}
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
                <p className="text-xl md:text-2xl text-white/90 mt-6 mb-1 text-[1.2em]">*Uniquement le vendredi</p>
                <p className="text-base md:text-lg text-white/90 text-[0.63em] -mt-1">Pré-Commande Obligatoire</p>
                
                {/* Lien de réservation avec ID unique */}
                <div className="mt-16 md:mt-20 relative z-50">
                  <Link 
                    href="/reservation"
                    id="reservation-link-slider"
                    target="_blank"
                    rel="noopener noreferrer"
                    className="text-lg md:text-xl text-white/80 hover:text-white transition-colors duration-300 cursor-pointer block text-center"
                    style={{ pointerEvents: 'auto' }}
                  >
                    Réservez votre plaisir dès maintenant<br />
                    lancement officiel le 30/06 !
                  </Link>
                  <p className="text-lg md:text-xl text-white/80 mt-6 text-center">
                    Passez votre commande du<br />
                    Dimanche au Jeudi max 12h<br />
                    Vous serez livrés le vendredi
                  </p>
                </div>
              </div>
            </div>
          </div>
        ))}
      </div>
      
      {/* Navigation Dots */}
      <div className="fixed bottom-4 md:bottom-8 left-1/2 transform -translate-x-1/2 flex space-x-1 md:space-x-2 z-30 hidden">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => goToSlide(index)}
            className={`w-2 h-2 md:w-3 md:h-3 rounded-full transition-all duration-300 ${
              index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
            }`}
            aria-label={`Aller au slide ${index + 1}`}
          />
        ))}
      </div>

      {/* Swipe Instructions (Mobile) */}
      {/* <div className="absolute bottom-20 left-1/2 transform -translate-x-1/2 z-30 text-white/70 text-sm bg-black/30 px-4 py-2 rounded-full backdrop-blur-sm md:hidden">
        ← Glissez pour naviguer →
      </div> */}
    </div>
  );
} 