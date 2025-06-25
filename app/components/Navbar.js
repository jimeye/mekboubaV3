'use client';

import Logo from './Logo'
import { useEffect, useState } from 'react';

export default function Navbar({ isVisible }) {

  return (
    <nav className={`fixed top-0 left-0 right-0 z-50 bg-transparent transition-all duration-300 ${isVisible ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}>
      <div className="container mx-auto pl-2 landscape:pl-0 landscape:-ml-4 md:pl-6 pr-4 py-4 flex justify-start">
        <div className="transition-all duration-300 opacity-100">
          <Logo isVisible={isVisible} />
        </div>
      </div>
    </nav>
  )
} 