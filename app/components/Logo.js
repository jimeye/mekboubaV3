'use client';

export default function Logo({ isVisible }) {
  return (
    <div className={`text-white landscape:pl-6 md:pl-8 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <h1 className="text-2xl md:text-3xl font-bold">
        LA BOULETTE IBIZA 🌶️
      </h1>
    </div>
  );
} 