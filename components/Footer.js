import React from 'react';
import Logo from './Logo';
import { Facebook, Instagram, Twitter, MapPin, Phone, Mail } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-custom-grey text-light-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8">
          {/* Logo et Description */}
          <div className="flex flex-col items-center text-center">
            <Logo size="small" />
            <p className="mt-4 text-light-white/80 text-sm max-w-xs">
              Une expérience culinaire authentique tunisienne dans un cadre chaleureux.
            </p>
          </div>

          {/* Liens Rapides */}
          <div>
            <h3 className="text-lg font-bold mb-4">Liens Rapides</h3>
            <ul className="space-y-2">
              <li>
                <a href="#accueil" className="text-light-white/80 hover:text-accent-yellow transition-colors duration-200 text-sm">
                  Accueil
                </a>
              </li>
              <li>
                <a href="#menu" className="text-light-white/80 hover:text-accent-yellow transition-colors duration-200 text-sm">
                  Menu
                </a>
              </li>
              <li>
                <a href="#histoire" className="text-light-white/80 hover:text-accent-yellow transition-colors duration-200 text-sm">
                  Notre Histoire
                </a>
              </li>
              <li>
                <a href="#avis" className="text-light-white/80 hover:text-accent-yellow transition-colors duration-200 text-sm">
                  Avis
                </a>
              </li>
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="text-lg font-bold mb-4">Contact</h3>
            <ul className="space-y-3">
              <li className="flex items-start space-x-2">
                <MapPin size={18} className="text-accent-yellow mt-1 flex-shrink-0" />
                <span className="text-sm">123 Rue de la Mekbouba, 75001 Paris</span>
              </li>
              <li className="flex items-center space-x-2">
                <Phone size={18} className="text-accent-yellow flex-shrink-0" />
                <span className="text-sm">01 23 45 67 89</span>
              </li>
              <li className="flex items-center space-x-2">
                <Mail size={18} className="text-accent-yellow flex-shrink-0" />
                <span className="text-sm">contact@boulettesmekbouba.fr</span>
              </li>
            </ul>
          </div>

          {/* Réseaux Sociaux */}
          <div>
            <h3 className="text-lg font-bold mb-4">Suivez-nous</h3>
            <div className="flex space-x-4">
              <a
                href="#"
                className="text-light-white/80 hover:text-accent-yellow transition-colors duration-200"
              >
                <Facebook size={20} />
              </a>
              <a
                href="#"
                className="text-light-white/80 hover:text-accent-yellow transition-colors duration-200"
              >
                <Instagram size={20} />
              </a>
              <a
                href="#"
                className="text-light-white/80 hover:text-accent-yellow transition-colors duration-200"
              >
                <Twitter size={20} />
              </a>
            </div>
          </div>
        </div>

        {/* Copyright */}
        <div className="border-t border-light-white/20 mt-8 pt-8 text-center text-light-white/60 text-sm">
          <p>&copy; {new Date().getFullYear()} Boulettes Mekbouba. Tous droits réservés.</p>
        </div>
      </div>
    </footer>
  );
};

export default Footer; 