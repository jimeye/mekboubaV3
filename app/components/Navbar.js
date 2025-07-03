'use client';

import Logo from './Logo'
import { useEffect, useState } from 'react';
import Link from 'next/link';

export default function Navbar({ isVisible }) {
  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto pl-2 landscape:pl-0 landscape:-ml-4 md:pl-6 pr-4 py-4 flex justify-between items-center">
        <div className="transition-all duration-300 opacity-100">
          <Logo isVisible={isVisible} />
        </div>
        {/* Hamburger menu */}
        <button
          className="flex flex-col justify-center items-center w-10 h-10 focus:outline-none md:fixed md:top-6 md:right-4 md:z-50"
          onClick={() => setMenuOpen(!menuOpen)}
          aria-label="Ouvrir le menu"
        >
          <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 mb-1 ${menuOpen ? 'rotate-45 translate-y-2' : ''}`}></span>
          <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 mb-1 ${menuOpen ? 'opacity-0' : ''}`}></span>
          <span className={`block w-7 h-1 bg-white rounded transition-all duration-300 ${menuOpen ? '-rotate-45 -translate-y-2' : ''}`}></span>
        </button>
      </div>
      

      
      {/* Overlay menu visible sur tous les écrans */}
      {menuOpen && (
        <div className="fixed top-0 right-0 h-full w-0 min-w-[140px] max-w-[350px] bg-black/80 z-50 flex flex-col items-end p-6">
          <button
            className="text-white text-3xl focus:outline-none self-end mb-8"
            onClick={() => setMenuOpen(false)}
            aria-label="Fermer le menu"
          >
            ×
          </button>
          <nav className="flex flex-col items-end space-y-1 text-right w-full">
            <Link href="/notre-histoire" className="text-white hover:text-accent-red transition-colors text-base whitespace-nowrap" onClick={() => setMenuOpen(false)}>
              Notre Histoire
            </Link>
            <Link href="/menu" className="text-white hover:text-accent-red transition-colors text-base btn-shine-3d" onClick={() => setMenuOpen(false)}>
              Menu
            </Link>
            <Link href="/reservation" className="text-white hover:text-accent-red transition-colors text-base" onClick={() => setMenuOpen(false)}>
              Réserver
            </Link>
          </nav>
        </div>
      )}
    </nav>
  )
} 