'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';

export default function Logo({ isVisible }) {
  const pathname = usePathname();
  const isHomePage = pathname === '/';

  return (
    <div className={`text-white landscape:pl-6 md:pl-8 transition-all duration-300 ${
      isVisible ? 'opacity-100' : 'opacity-0'
    }`}>
      <div className="flex flex-col items-center justify-center w-full">
        <h1 className="text-2xl md:text-3xl font-bold text-center">
          LA BOULETTE IBIZA 🌶️
        </h1>
        <div className="text-base md:text-lg text-left w-full -mt-2">
          Kosher Friendly
        </div>
        {!isHomePage && (
          <Link href="/" className="block -mt-6 text-white/80 text-2xl transition-colors cursor-pointer" style={{ marginLeft: '11rem' }} title="Retour à l'accueil">
            ←
          </Link>
        )}
      </div>
    </div>
  );
} 