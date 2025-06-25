import React, { useState, useEffect } from 'react';
import Logo from './Logo';
import { Menu, X } from 'lucide-react';

const Navigation = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [isScrolled, setIsScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setIsScrolled(window.scrollY > 50);
    };

    window.addEventListener('scroll', handleScroll);
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const navLinks = [
    { href: '#accueil', label: 'Accueil' },
    { href: '#histoire', label: 'Notre Histoire' },
    { href: '#menu', label: 'Menu' },
    { href: '#avis', label: 'Avis' },
    { href: '#contact', label: 'Contact' },
  ];

  return (
    <nav className={`fixed w-full z-50 transition-all duration-300 ${
      isScrolled ? 'bg-white shadow-md' : 'bg-transparent'
    }`}>
      <div className="container mx-auto px-4">
        <div className="flex justify-between items-center h-20">
          <Logo />
          
          {/* Menu Desktop */}
          <div className="hidden md:flex space-x-8">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="text-custom-grey hover:text-accent-red transition-colors duration-200 relative group"
              >
                {link.label}
                <span className="absolute bottom-0 left-0 w-0 h-0.5 bg-accent-red transition-all duration-200 group-hover:w-full" />
              </a>
            ))}
          </div>

          {/* Bouton Menu Mobile */}
          <button
            className="md:hidden text-custom-grey"
            onClick={() => setIsOpen(!isOpen)}
          >
            {isOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {/* Menu Mobile */}
        <div
          className={`md:hidden transition-all duration-300 ease-in-out ${
            isOpen
              ? 'max-h-64 opacity-100'
              : 'max-h-0 opacity-0 overflow-hidden'
          }`}
        >
          <div className="py-4 space-y-4">
            {navLinks.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className="block text-custom-grey hover:text-accent-red transition-colors duration-200"
                onClick={() => setIsOpen(false)}
              >
                {link.label}
              </a>
            ))}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navigation; 