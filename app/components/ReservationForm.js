'use client';

import { useState, useEffect } from 'react';

export default function ReservationForm() {
  const [formData, setFormData] = useState({
    deliveryDate: '',
    deliveryTime: '',
    address: '',
    phone: '',
    email: '',
    sbmQuantity: 0,
    bbmQuantity: 0,
    notes: ''
  });

  const [availableDates, setAvailableDates] = useState([]);
  const [total, setTotal] = useState(0);
  const [deliveryFee, setDeliveryFee] = useState(15);

  // Prix des plats
  const prices = {
    sbm: 26,
    bbm: 26
  };

  // Générer les vendredis disponibles (prochaines 4 semaines)
  useEffect(() => {
    const dates = [];
    const today = new Date();
    let currentDate = new Date(today);
    
    // Trouver le prochain vendredi
    while (currentDate.getDay() !== 5) { // 5 = vendredi
      currentDate.setDate(currentDate.getDate() + 1);
    }
    
    // Ajouter 4 vendredis
    for (let i = 0; i < 4; i++) {
      const friday = new Date(currentDate);
      friday.setDate(currentDate.getDate() + (i * 7));
      dates.push(friday.toISOString().split('T')[0]);
    }
    
    setAvailableDates(dates);
  }, []);

  // Calculer le total
  useEffect(() => {
    const subtotal = (formData.sbmQuantity * prices.sbm) + (formData.bbmQuantity * prices.bbm);
    const totalItems = formData.sbmQuantity + formData.bbmQuantity;
    const finalDeliveryFee = totalItems >= 6 ? 0 : deliveryFee;
    
    setTotal(subtotal + finalDeliveryFee);
  }, [formData.sbmQuantity, formData.bbmQuantity]);

  const handleSubmit = (e) => {
    e.preventDefault();
    
    // Date de prise de commande (date actuelle)
    const now = new Date();
    const orderDate = now.toLocaleDateString('fr-FR', {
      weekday: 'long',
      year: 'numeric',
      month: 'long',
      day: 'numeric'
    });
    const orderTime = now.toLocaleTimeString('fr-FR', {
      hour: '2-digit',
      minute: '2-digit'
    });
    
    // Créer le message WhatsApp
    const message = `Commande Mekbouba

Commande prise le: ${orderDate} à ${orderTime}
Date de livraison: ${formData.deliveryDate}
Heure: ${formData.deliveryTime}
Adresse: ${formData.address}

Sandwich Boulettes Mekbouba: ${formData.sbmQuantity} x 26€ = ${formData.sbmQuantity * 26}€
Box Boulettes Mekbouba: ${formData.bbmQuantity} x 26€ = ${formData.bbmQuantity * 26}€

Livraison: ${formData.sbmQuantity + formData.bbmQuantity >= 6 ? 'Gratuite' : '15€'}
Total: ${total}€

Téléphone: ${formData.phone}
Email: ${formData.email}

Notes: ${formData.notes || 'Aucune'}

Merci de confirmer cette commande !`;

    const whatsappUrl = `https://wa.me/33652696976?text=${encodeURIComponent(message)}`;
    window.open(whatsappUrl, '_blank');
  };

  const isOrderTimeValid = () => {
    const now = new Date();
    const day = now.getDay(); // 0 = dimanche, 1 = lundi, etc.
    const hour = now.getHours();
    
    // Commande possible du lundi (1) au jeudi (4) avant 12h
    return day >= 1 && day <= 4 && hour < 12;
  };

  if (!isOrderTimeValid()) {
    return (
      <div className="bg-yellow-50 border border-yellow-200 rounded-lg p-6 text-center">
        <div className="text-4xl mb-4">⏰</div>
        <h3 className="text-xl font-bold text-yellow-800 mb-2">Commandes fermées</h3>
        <p className="text-yellow-700 mb-4">
          Les commandes sont ouvertes du <strong>lundi au jeudi midi</strong> uniquement.
        </p>
        <p className="text-sm text-yellow-600">
          Revenez lundi prochain pour commander votre livraison du vendredi !
        </p>
      </div>
    );
  }

  return (
    <div className="bg-white rounded-lg shadow-xl p-6 max-w-2xl mx-auto">
      <div className="text-center mb-6">
        <h2 className="text-3xl font-bold text-gray-800 mb-2">🍽️ Réserver chez Mekbouba</h2>
        <p className="text-gray-600">Delivery Jeudi & Vendredi</p>
      </div>

      <form onSubmit={handleSubmit} className="space-y-6">
        {/* Date et heure */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📅 Date de livraison (vendredi)
            </label>
            <select
              value={formData.deliveryDate}
              onChange={(e) => setFormData({...formData, deliveryDate: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
              required
            >
              <option value="">Choisir une date</option>
              {availableDates.map((date) => (
                <option key={date} value={date}>
                  {new Date(date).toLocaleDateString('fr-FR', { 
                    weekday: 'long', 
                    day: 'numeric', 
                    month: 'long' 
                  })}
                </option>
              ))}
            </select>
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              ⏰ Heure de livraison
            </label>
            <select
              value={formData.deliveryTime}
              onChange={(e) => setFormData({...formData, deliveryTime: e.target.value})}
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
              required
            >
              <option value="">Choisir une heure</option>
              <option value="12:00">12:00</option>
              <option value="12:30">12:30</option>
              <option value="13:00">13:00</option>
              <option value="13:30">13:30</option>
              <option value="14:00">14:00</option>
              <option value="18:00">18:00</option>
              <option value="18:30">18:30</option>
              <option value="19:00">19:00</option>
              <option value="19:30">19:30</option>
              <option value="20:00">20:00</option>
            </select>
          </div>
        </div>

        {/* Adresse */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📍 Adresse de livraison (Ibiza)
          </label>
          <input
            type="text"
            value={formData.address}
            onChange={(e) => setFormData({...formData, address: e.target.value})}
            placeholder="Votre adresse complète à Ibiza"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
            required
          />
        </div>

        {/* Contact */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📞 Téléphone
            </label>
            <input
              type="tel"
              value={formData.phone}
              onChange={(e) => setFormData({...formData, phone: e.target.value})}
              placeholder="+33 6 52 69 69 76"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
              required
            />
          </div>
          
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-2">
              📧 Email
            </label>
            <input
              type="email"
              value={formData.email}
              onChange={(e) => setFormData({...formData, email: e.target.value})}
              placeholder="votre@email.com"
              className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
              required
            />
          </div>
        </div>

        {/* Menu */}
        <div className="bg-gray-50 p-4 rounded-lg">
          <h3 className="text-lg font-semibold text-gray-800 mb-4">🍽️ Votre commande</h3>
          
          <div className="space-y-4">
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">🥪 Sandwich Boulettes Mekbouba</h4>
                <p className="text-sm text-gray-600">26€</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, sbmQuantity: Math.max(0, formData.sbmQuantity - 1)})}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{formData.sbmQuantity}</span>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, sbmQuantity: formData.sbmQuantity + 1})}
                  className="w-8 h-8 bg-accent-red text-white rounded-full flex items-center justify-center hover:bg-accent-red/90"
                >
                  +
                </button>
              </div>
            </div>
            
            <div className="flex items-center justify-between">
              <div>
                <h4 className="font-medium">🍽️ Box Boulettes Mekbouba</h4>
                <p className="text-sm text-gray-600">26€</p>
              </div>
              <div className="flex items-center space-x-2">
                <button
                  type="button"
                  onClick={() => setFormData({...formData, bbmQuantity: Math.max(0, formData.bbmQuantity - 1)})}
                  className="w-8 h-8 bg-gray-200 rounded-full flex items-center justify-center hover:bg-gray-300"
                >
                  -
                </button>
                <span className="w-8 text-center">{formData.bbmQuantity}</span>
                <button
                  type="button"
                  onClick={() => setFormData({...formData, bbmQuantity: formData.bbmQuantity + 1})}
                  className="w-8 h-8 bg-accent-red text-white rounded-full flex items-center justify-center hover:bg-accent-red/90"
                >
                  +
                </button>
              </div>
            </div>
          </div>
        </div>

        {/* Notes */}
        <div>
          <label className="block text-sm font-medium text-gray-700 mb-2">
            📝 Notes spéciales (allergies, préférences...)
          </label>
          <textarea
            value={formData.notes}
            onChange={(e) => setFormData({...formData, notes: e.target.value})}
            placeholder="Allergies, préférences de cuisson, instructions spéciales..."
            rows="3"
            className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-accent-red focus:border-transparent"
          />
        </div>

        {/* Total */}
        <div className="bg-accent-red/10 p-4 rounded-lg">
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Sous-total:</span>
            <span>{(formData.sbmQuantity * prices.sbm) + (formData.bbmQuantity * prices.bbm)}€</span>
          </div>
          <div className="flex justify-between items-center mb-2">
            <span className="font-medium">Livraison:</span>
            <span className={formData.sbmQuantity + formData.bbmQuantity >= 6 ? 'text-green-600 font-bold' : ''}>
              {formData.sbmQuantity + formData.bbmQuantity >= 6 ? 'Gratuite' : '15€'}
            </span>
          </div>
          <div className="border-t pt-2 flex justify-between items-center">
            <span className="text-lg font-bold">Total:</span>
            <span className="text-lg font-bold">{total}€</span>
          </div>
          {formData.sbmQuantity + formData.bbmQuantity >= 6 && (
            <p className="text-sm text-green-600 mt-2">🎉 Livraison gratuite dès 6 produits !</p>
          )}
        </div>

        {/* Boutons */}
        <div className="flex space-x-4">
          <button
            type="button"
            onClick={() => setFormData({
              deliveryDate: '',
              deliveryTime: '',
              address: '',
              phone: '',
              email: '',
              sbmQuantity: 0,
              bbmQuantity: 0,
              notes: ''
            })}
            className="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg font-semibold hover:bg-gray-300 transition-colors"
          >
            🔄 Réinitialiser
          </button>
          <button
            type="submit"
            disabled={total === 0}
            className="flex-1 px-4 py-3 bg-accent-red text-white rounded-lg font-semibold hover:bg-accent-red/90 transition-colors disabled:bg-gray-300 disabled:cursor-not-allowed"
          >
            📱 Commander sur WhatsApp
          </button>
        </div>
      </form>
    </div>
  );
} 