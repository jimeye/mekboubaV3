#!/bin/bash

# Script pour convertir les nouvelles images
# Usage: ./convert-new-images.sh [qualité]

QUALITY="${1:-85}"
SOURCE_DIR="./images-to-convert"
OUTPUT_DIR="./output-webp"

echo "🖼️  Conversion des nouvelles images"
echo "Source: $SOURCE_DIR"
echo "Sortie: $OUTPUT_DIR"
echo "Qualité: $QUALITY"
echo ""

# Vérifier si le dossier source existe et contient des images
if [ ! -d "$SOURCE_DIR" ]; then
    echo "❌ Le dossier $SOURCE_DIR n'existe pas"
    echo "Création du dossier..."
    mkdir -p "$SOURCE_DIR"
    echo "✅ Dossier créé. Placez vos images dans $SOURCE_DIR"
    exit 1
fi

# Compter les images dans le dossier source
IMAGE_COUNT=$(find "$SOURCE_DIR" -type f \( -iname "*.jpg" -o -iname "*.jpeg" -o -iname "*.png" -o -iname "*.bmp" -o -iname "*.tiff" -o -iname "*.gif" -o -iname "*.heic" -o -iname "*.heif" \) | wc -l)

if [ "$IMAGE_COUNT" -eq 0 ]; then
    echo "❌ Aucune image trouvée dans $SOURCE_DIR"
    echo "Placez vos images à convertir dans ce dossier"
    exit 1
fi

echo "📁 $IMAGE_COUNT image(s) trouvée(s)"
echo ""

# Créer le dossier de sortie
mkdir -p "$OUTPUT_DIR"

# Convertir les images
echo "🔄 Conversion en cours..."
node convert-to-webp.js "$SOURCE_DIR" -o "$OUTPUT_DIR" -q "$QUALITY" --skip-existing

echo ""
echo "✅ Conversion terminée!"
echo "📁 Images converties dans: $OUTPUT_DIR"
echo ""
echo "💡 Prochaines étapes:"
echo "1. Vérifiez la qualité des images converties"
echo "2. Copiez les images webp vers votre projet"
echo "3. Supprimez les originaux du dossier $SOURCE_DIR si tout est OK" 