LA BOULETTE IBIZA - SITE WEB
================================

Site web du restaurant cacher "La Boulette Ibiza" à Ibiza.

📁 STRUCTURE DU PROJET
======================

app/                    - Pages et composants Next.js
├── components/         - Composants réutilisables
├── api/               - Routes API (commandes, paiements)
├── menu/              - Page du menu
├── notre-histoire/    - Page "notre histoire"
├── commandes/         - Page des commandes
├── payment/           - Page de paiement
└── ...

public/                - Fichiers statiques
├── images/            - Images du site
└── ...

📋 FONCTIONNALITÉS
==================

✅ Site web responsive
✅ Système de commandes en ligne
✅ Intégration Stripe pour les paiements
✅ Gestion des commandes (admin)
✅ Envoi d'emails automatiques
✅ Optimisation des images WebP

🛠️ CONVERSION D'IMAGES
=======================

Le projet inclut un système de conversion d'images en WebP :

1. Placez vos images dans le dossier images-to-convert/
2. Exécutez : ./convert-new-images.sh
3. Les images WebP apparaissent dans output-webp/

Formats supportés : JPEG, PNG, BMP, TIFF, GIF, SVG, HEIC, HEIF

🚀 DÉMARRAGE
============

1. Installer les dépendances :
   npm install

2. Lancer le serveur de développement :
   npm run dev

3. Ouvrir http://localhost:3000

📧 CONFIGURATION
================

Créer un fichier .env.local avec :
- Variables Stripe
- Configuration email
- Variables Upstash (optionnel)

🌐 DÉPLOIEMENT
==============

Le site est configuré pour Vercel.
Utilisez : vercel --prod

📞 CONTACT
==========

Jimmy Joseph
+33 6 52 69 69 76
info@laboulette-ibiza.com

© 2025 La Boulette Ibiza ��️
Kosher Friendly 