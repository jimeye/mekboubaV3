import React from 'react';

const Logo = ({ size = 'default' }) => {
  const textSize = size === 'small' ? 'text-lg' : 'text-3xl';

  return (
    <div className="group relative inline-block">
      <div className="bg-transparent px-6 py-3 rounded-lg transform transition-transform duration-300 hover:scale-105">
        <div className="relative">
          {/* Texte d'ombre */}
          <div className={`absolute -left-1 -bottom-1 ${textSize} font-lilita tracking-widest uppercase text-custom-grey`}>
            <span>BOULETTES</span>
            <span className="ml-2">MEKBOUBA</span>
          </div>
          {/* Texte principal */}
          <div className={`relative ${textSize} font-lilita tracking-widest uppercase text-[#FFF200]`}>
            <span>BOULETTES</span>
            <span className="ml-2">MEKBOUBA</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Logo; 