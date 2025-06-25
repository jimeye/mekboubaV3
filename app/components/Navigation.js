'use client';

import { useState, useEffect } from 'react';

export default function Navigation() {
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  return (
    <nav
      className="fixed w-full z-50 bg-transparent"
    >
      <div className="container mx-auto px-4">
        <div className="flex items-center justify-end h-20">
        </div>
      </div>
    </nav>
  );
} 