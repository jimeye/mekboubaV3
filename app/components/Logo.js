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
      <div className="flex flex-col items-center justify-center w-full text-center">
        <h1 className="text-2xl md:text-3xl font-bold">
          LA BOULETTE IBIZA 🌶️<br />
          <span className="text-lg md:text-xl">Kosher Friendly</span>
        </h1>
        {!isHomePage && (
          <Link href="/" className="block -mt-4 text-white/80 text-2xl transition-colors cursor-pointer" style={{ marginLeft: '11rem' }} title="Retour à l'accueil">
            ←
          </Link>
        )}
      </div>
    </div>
  );
} 