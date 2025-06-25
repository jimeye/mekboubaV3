import React from 'react';
import Image from 'next/image';

const menuItems = [
  {
    id: 1,
    name: 'Sandwich Mekbouba',
    description: 'Boulettes de viande hachée, œuf, salade, frites *min 1 personne',
    price: 26.00,
    image: 'https://img.freepik.com/photos-gratuite/pizza-pepperoni-table_140725-5396.jpg',
    tag: 'Populaire'
  },
  {
    id: 2,
    name: 'Box Mekbouba',
    description: 'Boulettes de viande hachée, œuf, salade, frites *min 1 personne',
    price: 26.00,
    image: 'https://img.freepik.com/photos-gratuite/pizza-pepperoni-table_140725-5396.jpg',
    tag: 'Nouveau'
  },
  {
    id: 3,
    name: 'Tajine Shabbat',
    description: 'Plat traditionnel du shabbat, viande mijotée avec légumes et épices. Loubia, Hams, Blé et Niquitouche *min 6 personnes',
    price: 26.00,
    image: 'https://img.freepik.com/photos-gratuite/pizza-pepperoni-table_140725-5396.jpg',
    tag: 'Spécial'
  }
];

const MenuSection = () => {
  return (
    <section id="menu" className="py-20 bg-light-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Notre <span className="text-[#cf0e0e]">Menu</span>
          </h2>
          <div className="w-20 h-1 bg-accent-yellow mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {menuItems.map((item) => (
            <div key={item.id} className="bg-white rounded-lg shadow-lg overflow-hidden h-[450px] flex flex-col">
              <div className="relative h-48">
                <Image
                  src={item.image}
                  alt={item.name}
                  fill
                  className="object-cover"
                />
                <div className="absolute top-4 right-4 bg-accent-yellow text-custom-grey px-3 py-1 rounded-full text-sm font-medium">
                  {item.tag}
                </div>
              </div>
              <div className="p-6 flex-grow flex flex-col">
                <h3 className="text-xl font-bold text-custom-grey mb-2">{item.name}</h3>
                <p className="text-custom-grey/80 mb-4 flex-grow">{item.description}</p>
                <div className="flex justify-between items-center mt-auto">
                  <span className="text-[#cf0e0e] font-bold text-xl">{item.price} €</span>
                  <button className="btn btn-primary group relative overflow-hidden">
                    <span className="relative z-10">Commander</span>
                    <div className="absolute inset-0 bg-accent-red transform -translate-x-full group-hover:translate-x-0 transition-transform duration-300" />
                  </button>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default MenuSection; 