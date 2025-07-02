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
  title: 'Restaurant Cacher à Ibiza – La Boulette',
  description: 'Découvrez notre cuisine traditionnelle cacher, kosher, servie en bord de mer à Ibiza. Idéal pour vos vacances sous le soleil.',
  keywords: 'la boulette ibiza, kosher ibiza, cacher ibiza, kosher friendly ibiza, restaurant kosher friendly, cuisine juive ibiza, boulettes tunisiennes, piments, judéo-tunisien, livraison kosher friendly, bovini, shabbat, chabbat, catering, chef à domicile, habad, loubavitch',
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
