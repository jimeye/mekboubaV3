GUIDE DE CONVERSION D'IMAGES EN WEBP
=====================================

Ce guide explique comment convertir vos images en format WebP pour optimiser votre site web.

📁 STRUCTURE DES DOSSIERS
=========================

Le projet contient maintenant ces dossiers :
- images-to-convert/ : Placez ici vos nouvelles images à convertir
- output-webp/ : Les images converties seront sauvegardées ici

🛠️ SCRIPTS DISPONIBLES
=======================

1. convert-to-webp.js (Node.js avec Sharp)
   - Conversion de haute qualité
   - Support de nombreux formats
   - Options de compression avancées

2. convert-images.sh (Script bash simple)
   - Utilise ImageMagick
   - Conversion rapide
   - Interface simple

3. convert-new-images.sh (Script pour nouvelles images)
   - Convertit automatiquement les images du dossier images-to-convert/
   - Sauvegarde dans output-webp/
   - Idéal pour le workflow quotidien

📋 PRÉREQUIS
============

Pour le script Node.js :
- Node.js installé
- Package Sharp : npm install sharp

Pour les scripts bash :
- ImageMagick installé
- Sur macOS : brew install imagemagick
- Sur Ubuntu : sudo apt-get install imagemagick

🚀 UTILISATION RAPIDE
=====================

1. Placez vos images dans le dossier images-to-convert/

2. Exécutez le script bash de conversion :
   chmod +x convert-new-images.sh
   ./convert-new-images.sh

3. Vos images converties seront dans output-webp/

Note : Cette méthode utilise ImageMagick (script bash), pas Node.js

📖 UTILISATION DÉTAILLÉE
========================

SCRIPT NODE.JS (convert-to-webp.js)
-----------------------------------

Installation :
npm install sharp

Utilisation :
node convert-to-webp.js [dossier_source] [dossier_destination]

Exemples :
- Convertir toutes les images du dossier actuel :
  node convert-to-webp.js

- Convertir un dossier spécifique :
  node convert-to-webp.js ./mes-images ./images-converties

- Convertir une image spécifique :
  node convert-to-webp.js ./image.jpg ./output/

SCRIPT BASH SIMPLE (convert-images.sh)
--------------------------------------

Installation ImageMagick :
# macOS
brew install imagemagick

# Ubuntu/Debian
sudo apt-get install imagemagick

Utilisation :
./convert-images.sh [fichier_source] [fichier_destination]

Exemples :
- Convertir une image :
  ./convert-images.sh photo.jpg photo.webp

- Convertir avec qualité spécifique :
  ./convert-images.sh photo.jpg photo.webp 80

SCRIPT NOUVELLES IMAGES (convert-new-images.sh)
-----------------------------------------------

Ce script automatise la conversion des nouvelles images :

1. Placez vos images dans images-to-convert/
2. Exécutez : ./convert-new-images.sh
3. Les images converties apparaissent dans output-webp/

⚙️ OPTIONS DE CONVERSION
========================

QUALITÉ (0-100) :
- 90-100 : Qualité maximale, fichiers plus gros
- 70-89 : Bon équilibre qualité/taille
- 50-69 : Compression plus forte
- 0-49 : Compression maximale (déconseillé)

FORMATS SUPPORTÉS :
- JPEG, PNG, TIFF, BMP, GIF
- Formats RAW (NEF, CR2, etc.)
- Formats vectoriels (SVG)

🔧 DÉPANNAGE
============

ERREUR "Sharp not found" :
npm install sharp

ERREUR "ImageMagick not found" :
# macOS
brew install imagemagick

# Ubuntu
sudo apt-get install imagemagick

ERREUR "Permission denied" :
chmod +x convert-images.sh
chmod +x convert-new-images.sh

ERREUR "No such file or directory" :
Vérifiez que les dossiers images-to-convert/ et output-webp/ existent

📊 COMPARAISON DES MÉTHODES
===========================

NODE.JS (Sharp) :
✅ Qualité optimale
✅ Support de nombreux formats
✅ Options avancées
❌ Nécessite Node.js
❌ Plus lent pour de gros volumes

BASH (ImageMagick) :
✅ Rapide
✅ Simple à utiliser
✅ Pas de dépendances Node.js
❌ Moins d'options de compression
❌ Nécessite ImageMagick

💡 CONSEILS D'OPTIMISATION
==========================

1. CHOIX DE LA QUALITÉ :
   - Photos : 80-90
   - Logos/icônes : 90-100
   - Images web : 70-85

2. TAILLE DES IMAGES :
   - Avant conversion : redimensionnez si nécessaire
   - Utilisez des outils comme ImageMagick ou Sharp

3. NOMENCLATURE :
   - Gardez les noms originaux
   - Ajoutez des suffixes si nécessaire (ex: _webp)

4. ORGANISATION :
   - Gardez les originaux en backup
   - Organisez par dossiers thématiques

🔄 WORKFLOW RECOMMANDÉ
======================

1. Préparez vos images (redimensionnement si nécessaire)
2. Placez-les dans images-to-convert/
3. Exécutez convert-new-images.sh
4. Vérifiez la qualité dans output-webp/
5. Intégrez les images WebP dans votre site

📱 OPTIMISATION MOBILE
======================

Pour les sites mobiles :
- Utilisez une qualité de 70-80
- Redimensionnez à la taille d'affichage
- Testez sur différents appareils

🌐 INTÉGRATION WEB
==================

Dans votre HTML :
<img src="image.webp" alt="Description" />

Avec fallback :
<picture>
  <source srcset="image.webp" type="image/webp">
  <img src="image.jpg" alt="Description">
</picture>

📈 AVANTAGES WEBP
=================

- Taille réduite de 25-35% vs JPEG
- Support de la transparence
- Compression sans perte possible
- Support moderne des navigateurs

⚠️ LIMITATIONS
==============

- Support limité sur Internet Explorer
- Nécessite un fallback pour les anciens navigateurs
- Certains outils peuvent ne pas supporter WebP

🔗 RESSOURCES UTILES
====================

- Documentation Sharp : https://sharp.pixelplumbing.com/
- Documentation ImageMagick : https://imagemagick.org/
- Can I Use WebP : https://caniuse.com/webp
- Google WebP : https://developers.google.com/speed/webp

📞 SUPPORT
==========

En cas de problème :
1. Vérifiez les prérequis
2. Consultez les messages d'erreur
3. Testez avec une image simple
4. Vérifiez les permissions des fichiers

🎯 CONCLUSION
=============

La conversion en WebP améliore significativement les performances de votre site web. Utilisez le script qui correspond le mieux à vos besoins et votre environnement de développement.

Bonnes conversions ! 🚀 