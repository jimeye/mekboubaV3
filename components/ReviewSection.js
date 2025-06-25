import React from 'react';
import { Star } from 'lucide-react';

const reviews = [
  {
    id: 1,
    name: 'Sophie Martin',
    rating: 5,
    comment: 'Les meilleures mekbouba que j\'ai jamais goûtées ! La sauce est parfaitement épicée et les boulettes sont délicieusement moelleuses. Je recommande vivement !'
  },
  {
    id: 2,
    name: 'Thomas Dubois',
    rating: 5,
    comment: 'Une expérience culinaire exceptionnelle. La mekbouba aux herbes avec la sauce harissa est un délice. Le service est impeccable et l\'ambiance est chaleureuse.'
  },
  {
    id: 3,
    name: 'Marie Laurent',
    rating: 5,
    comment: 'Un véritable voyage gustatif en Tunisie ! Les saveurs sont authentiques et les portions sont généreuses. Je reviendrai sans hésiter !'
  }
];

const ReviewSection = () => {
  return (
    <section id="avis" className="py-20 bg-light-white">
      <div className="container">
        <div className="text-center mb-12">
          <h2 className="text-4xl font-bold mb-4">
            Ce que disent nos <span className="text-[#cf0e0e]">clients</span>
          </h2>
          <div className="w-20 h-1 bg-accent-yellow mx-auto" />
        </div>

        <div className="grid md:grid-cols-3 gap-8">
          {reviews.map((review) => (
            <div key={review.id} className="bg-white p-6 rounded-lg shadow-lg">
              <div className="flex text-accent-yellow mb-4">
                {[...Array(review.rating)].map((_, i) => (
                  <Star key={i} size={20} className="fill-current" />
                ))}
              </div>
              <div className="relative pl-4 border-l-4 border-accent-red">
                <p className="text-custom-grey mb-4">{review.comment}</p>
                <p className="font-bold text-custom-grey">{review.name}</p>
              </div>
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default ReviewSection; 