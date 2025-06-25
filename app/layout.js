import { Inter, Lilita_One } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import CustomChat from './components/CustomChat';
import GoogleAnalytics from './components/GoogleAnalytics';

const inter = Inter({ subsets: ['latin'] });
const lilitaOne = Lilita_One({
  weight: '400',
  subsets: ['latin'],
  variable: '--font-lilita',
});

export const metadata = {
  title: 'Mekbouba Food Truck Restaurant - Cuisine Kosher Cacher Ibiza | Boulettes & Piments',
  description: 'Restaurant kosher friendly à Ibiza, cuisine judéo-tunisienne authentique. Boulettes, piments et spécialités cacher. Livraison le vendredi. Commandez en ligne.',
  keywords: 'kosher ibiza, cacher ibiza, kosher friendly ibiza, cacher friendly ibiza, restaurant kosher friendly, cuisine juive ibiza, boulettes tunisiennes, piments, mekbouba, judéo-tunisien, livraison kosher friendly',
};
 
export default function RootLayout({ children }) {
 return (
    <html lang="fr">
      <body className={`${inter.className} ${lilitaOne.variable}`}>
        <Navigation />
        {children}
        <CustomChat />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
