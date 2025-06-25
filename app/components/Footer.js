'use client';

import Link from 'next/link';
import Image from 'next/image';

export default function Footer() {
  return (
    <footer className="bg-black text-white py-12">
      <div className="container mx-auto px-4">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {/* Logo et Description */}
          <div className="text-center md:text-left">
            <div className="mb-4">
              <h3 className="text-xl font-semibold">MEKBOUBA, BOULETTES & PIMENTS 🌶️</h3>
            </div>
            <p className="text-gray-400">
              Une expérience culinaire unique à Ibiza, alliant saveurs tunisiennes authentiques et ambiance chaleureuse.
            </p>
          </div>

          {/* Horaires */}
          <div className="text-center">
            <h3 className="text-xl font-semibold mb-4">Horaires d'ouverture</h3>
            <p className="text-gray-400 mb-2">Lundi - Jeudi max 12h</p>
            <p className="text-gray-400">Vendredi - Samedi max 14h</p>
          </div>

          {/* Contact */}
          <div className="text-center md:text-right">
            <h3 className="text-xl font-semibold mb-4">Contact</h3>
            <p className="text-gray-400 mb-2">Carrer de sa Creu, 07800</p>
            <p className="text-gray-400 mb-2">Ibiza, Espagne</p>
            <p className="text-gray-400">+33 6 52 69 69 76</p>
          </div>
        </div>

        {/* Liens sociaux et mentions légales */}
        <div className="mt-12 pt-8 border-t border-gray-800 text-center">
          <div className="flex justify-center space-x-6 mb-4">
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Instagram
            </a>
            <a href="#" className="text-gray-400 hover:text-white transition-colors">
              Facebook
            </a>
          </div>
          <p className="text-white text-sm">
            © 2025 MEKBOUBA, BOULETTES & PIMENTS 🌶️
          </p>
        </div>
      </div>
    </footer>
  );
} 