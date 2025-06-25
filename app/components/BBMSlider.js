'use client';

import { useState, useEffect, useRef } from 'react';
import Image from 'next/image';

export default function BBMSlider() {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [touchStart, setTouchStart] = useState(null);
  const [touchEnd, setTouchEnd] = useState(null);
  const sliderRef = useRef(null);

  const bbmImages = [
    '/images/bbm1.webp', // Image BBM principale
    '/images/nos specialites.jpg', // Image de backup
    '/images/une experience unique.jpg', // Image de backup
    '/images/mekbouba1.jpeg', // Image de backup
  ];

  // Forcer le scroll vers le haut au chargement
  useEffect(() => {
    if (sliderRef.current) {
      sliderRef.current.scrollTop = 0;
    }
  }, []);

  // Auto-play pour le slider BBM
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentSlide((prev) => (prev + 1) % bbmImages.length);
    }, 4000); // 4 secondes par slide

    return () => clearInterval(timer);
  }, [bbmImages.length]);

  const nextSlide = () => {
    setCurrentSlide((prev) => (prev + 1) % bbmImages.length);
  };

  const prevSlide = () => {
    setCurrentSlide((prev) => (prev - 1 + bbmImages.length) % bbmImages.length);
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
      className="relative h-64 overflow-hidden"
      onTouchStart={onTouchStart}
      onTouchMove={onTouchMove}
      onTouchEnd={onTouchEnd}
    >
      <div className="relative w-full h-full">
        <Image
          src={bbmImages[currentSlide]}
          alt={`BBM ${currentSlide + 1}`}
          fill
          className="object-cover group-hover:scale-110 transition-transform duration-500"
          sizes="(max-width: 768px) 100vw, (max-width: 1024px) 50vw, 33vw"
          quality={85}
        />
      </div>
      
      {/* Navigation Dots */}
      {bbmImages.length > 1 && (
        <div className="absolute bottom-2 left-1/2 transform -translate-x-1/2 flex space-x-1 z-30">
          {bbmImages.map((_, index) => (
            <button
              key={index}
              onClick={() => goToSlide(index)}
              className={`w-2 h-2 rounded-full transition-all duration-300 ${
                index === currentSlide ? 'bg-white scale-110' : 'bg-white/50 hover:bg-white/75'
              }`}
              aria-label={`Aller au slide ${index + 1}`}
            />
          ))}
        </div>
      )}
    </div>
  );
} 