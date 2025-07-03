'use client';

import Link from 'next/link';

export default function Logo({ isVisible }) {
  return (
    <div className={`text-white landscape:pl-6 md:pl-8 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <Link href="/" className="focus:outline-none">
        <h1 className="text-2xl md:text-3xl font-bold">
          LA BOULETTE IBIZA 🌶️
        </h1>
      </Link>
    </div>
  );
} 