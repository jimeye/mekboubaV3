#!/bin/bash

# Supprimer les anciens fichiers temporaires
rm -f audio_temp.mp3 audio_final.mp3

URL="$1"

if [ -z "$URL" ]; then
  echo "❌ Fournis l'URL de la vidéo YouTube."
  echo "Usage : ./extract-light-audio.sh https://youtube.com/..."
  exit 1
fi

echo "📥 Téléchargement de la vidéo depuis YouTube..."
yt-dlp -x --audio-format mp3 --audio-quality 9 -o "audio_temp.%(ext)s" "$URL"

echo "🎧 Compression audio légère en mono 64k..."
ffmpeg -i audio_temp.mp3 -ac 1 -b:a 64k audio_final.mp3

echo "✅ Fichier final : audio_final.mp3"
