import { Lilita_One } from 'next/font/google';
import './globals.css';
import Navigation from './components/Navigation';
import CustomChat from './components/CustomChat';
import GoogleAnalytics from './components/GoogleAnalytics';

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
      <head>
        <title>La Boulette Ibiza 🌶️ Cacher, Kosher Friendly à Ibiza</title>
        <meta name="description" content="Découvrez notre cuisine traditionnelle cacher, kosher, servie en bord de mer à Ibiza. Idéal pour vos vacances sous le soleil." />
        <meta property="og:title" content="La Boulette Ibiza 🌶️ Cacher, Kosher Friendly à Ibiza" />
        <meta property="og:description" content="Découvrez notre cuisine traditionnelle cacher, kosher, servie en bord de mer à Ibiza. Idéal pour vos vacances sous le soleil." />
        <link rel="canonical" href="https://laboulette-ibiza.com/" />
        <meta property="og:url" content="https://laboulette-ibiza.com/" />
        <meta property="og:type" content="website" />
        <meta property="og:image" content="https://laboulette-ibiza.com/images/uneexperienceuniqueW.webp" />
        <meta name="twitter:card" content="summary_large_image" />
        <meta name="twitter:image" content="https://laboulette-ibiza.com/images/uneexperienceuniqueW.webp" />
      </head>
      <body className={`font-sans ${lilitaOne.variable}`}>
        <Navigation />
        {children}
        <CustomChat />
        <GoogleAnalytics />
      </body>
    </html>
  );
}
