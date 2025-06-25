# Restaurant Mekbouba - Site de Commande avec Paiement Stripe

Site web de restaurant avec système de commande et paiement intégré via Stripe (incluant Apple Pay).

## 🚀 Déploiement sur Vercel

### Prérequis
- Compte Stripe (mode test activé)
- Compte GitHub relié à Vercel
- Clés Stripe valides (publique et secrète)

### 1. Variables d'environnement

#### En local (.env.local)
```
STRIPE_SECRET_KEY=sk_test_...
NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY=pk_test_...
```

#### Sur Vercel
1. Dashboard Vercel > Projet > Settings > Environment Variables
2. Ajouter :
   - `STRIPE_SECRET_KEY` (Type: Plaintext, Environment: Production & Preview)
   - `NEXT_PUBLIC_STRIPE_PUBLISHABLE_KEY` (Type: Plaintext, Environment: Production & Preview)

⚠️ **Important** : Les clés Stripe de test expirent en 7 jours. Les régénérer si nécessaire.

### 2. Déploiement
# Test de déploiement Vercel V3
```bash
# Ajouter tous les fichiers
git add .

# Commit avec message descriptif
git commit -m "feat: intégration Stripe paiement Apple Pay + guide déploiement"

# Pousser sur GitHub
git push
```

Le déploiement se fait automatiquement sur Vercel après chaque push.

### 3. Test Apple Pay

1. Ouvrir le site déployé sur Vercel (URL HTTPS)
2. Aller sur la page de paiement
3. Sur Safari (Mac/iPhone/iPad) avec une carte enregistrée dans Wallet
4. Le bouton Apple Pay apparaît automatiquement dans le formulaire Stripe
5. Effectuer un paiement test

## 🔧 Configuration Technique

### Fonctionnalités
- ✅ Système de commande avec panier
- ✅ Paiement Stripe (cartes + Apple Pay)
- ✅ Formulaire de réservation
- ✅ Interface responsive
- ✅ Gestion des commandes

### Technologies
- Next.js 13.5.11
- Stripe (paiement)
- Tailwind CSS (styling)
- Vercel (déploiement)

## 📱 Apple Pay

### Prérequis
- Safari sur appareil Apple
- Carte enregistrée dans Apple Wallet
- Site en HTTPS (automatique sur Vercel)

### Activation
Apple Pay s'active automatiquement via Stripe Elements si :
- Le domaine est en HTTPS
- L'utilisateur a une carte dans Wallet
- Le navigateur est Safari

## 🚨 Points de vigilance

1. **Clés Stripe** : Régénérer si expirées (>7 jours)
2. **Variables d'environnement** : Vérifier sur Vercel
3. **Cache** : Supprimer `.next` si problèmes
4. **Apple Pay** : Test uniquement sur Safari + Wallet

## 🔄 Commandes utiles

```bash
# Développement local
npm run dev

# Build de production
npm run build

# Nettoyer le cache
rm -rf .next
npm run dev

# Vérifier les variables d'environnement
echo $STRIPE_SECRET_KEY
```

## 📞 Support

En cas de problème :
1. Vérifier les clés Stripe dans le dashboard
2. Contrôler les variables d'environnement sur Vercel
3. Tester en local avec `npm run dev`
4. Consulter les logs Vercel pour les erreurs

---

**Note** : Ce projet utilise Stripe en mode test. Pour la production, utiliser les clés live et valider le domaine dans le dashboard Stripe.

## 🚀 Démarrage rapide

1. Installer les dépendances :
```bash
npm install
```

2. Lancer le serveur de développement :
```bash
npm run dev
```

3. Ouvrir [http://localhost:3000](http://localhost:3000) dans votre navigateur.

## 📁 Structure du projet

```
restaurant-website/
├── app/                    # Dossier principal de l'application
│   ├── page.js            # Page d'accueil
│   └── layout.js          # Layout principal
├── public/                # Fichiers statiques
│   └── images/           # Images du site
├── styles/               # Styles globaux
└── package.json         # Dépendances et scripts
```

## 🛠 Technologies utilisées

- Next.js 13.5.11
- React
- Tailwind CSS
- Node.js

## 📱 Fonctionnalités

- Design responsive
- Menu interactif
- Intégration WhatsApp pour les commandes
- Galerie d'images
- Formulaire de contact

## 🔄 Mise à jour

Pour mettre à jour le site :

1. Faire les modifications dans le code
2. Tester en local avec `npm run dev`
3. Commiter les changements :
```bash
git add .
git commit -m "Description des changements"
git push
```

## 📞 Contact

Pour toute question ou suggestion :
- Téléphone : +33 6 52 69 69 76
- Email : info@mekbouba.com

## 📝 Notes

- Le site est optimisé pour mobile et desktop
- Les images sont optimisées pour le web
- Le site utilise des couleurs personnalisées (voir tailwind.config.js) 

http://localhost:3001/menu 

# Dossier réseaux sociaux

Un dossier `reseaux/` sera créé à la racine du projet pour accueillir :
- Les images du slider (copiées depuis public/images)
- Les textes formatés pour Instagram, Facebook, TikTok (un fichier par réseau)
- Un README d'instructions pour l'utilisation 
