#!/usr/bin/env node

const sharp = require('sharp');
const fs = require('fs');
const path = require('path');
const { promisify } = require('util');
const readdir = promisify(fs.readdir);
const stat = promisify(fs.stat);

// Formats d'image supportés
const SUPPORTED_FORMATS = ['.jpg', '.jpeg', '.png', '.bmp', '.tiff', '.gif', '.svg', '.heic', '.heif'];

async function convertToWebP(inputPath, outputPath, quality = 80) {
  try {
    const ext = path.extname(inputPath).toLowerCase();
    
    // Utiliser ImageMagick pour HEIC/HEIF
    if (ext === '.heic' || ext === '.heif') {
      const { exec } = require('child_process');
      const { promisify } = require('util');
      const execAsync = promisify(exec);
      
      await execAsync(`magick "${inputPath}" -quality ${quality} "${outputPath}"`);
      console.log(`✅ Converti (ImageMagick): ${inputPath} → ${outputPath}`);
    } else {
      // Utiliser Sharp pour les autres formats
      await sharp(inputPath)
        .webp({ quality })
        .toFile(outputPath);
      console.log(`✅ Converti (Sharp): ${inputPath} → ${outputPath}`);
    }
  } catch (error) {
    console.error(`❌ Erreur conversion ${inputPath}:`, error.message);
  }
}

async function processFile(filePath, outputDir, quality, skipExisting = false) {
  const ext = path.extname(filePath).toLowerCase();
  
  if (!SUPPORTED_FORMATS.includes(ext)) {
    console.log(`⏭️  Ignoré (format non supporté): ${filePath}`);
    return;
  }

  const fileName = path.basename(filePath, ext);
  const outputPath = path.join(outputDir, `${fileName}.webp`);
  
  // Vérifier si le fichier WebP existe déjà
  if (skipExisting && fs.existsSync(outputPath)) {
    console.log(`⏭️  Ignoré (déjà converti): ${filePath}`);
    return;
  }
  
  await convertToWebP(filePath, outputPath, quality);
}

async function processDirectory(dirPath, outputDir, quality, recursive = false, skipExisting = false) {
  try {
    const items = await readdir(dirPath);
    
    for (const item of items) {
      const fullPath = path.join(dirPath, item);
      const stats = await stat(fullPath);
      
      if (stats.isDirectory() && recursive) {
        const subOutputDir = path.join(outputDir, item);
        if (!fs.existsSync(subOutputDir)) {
          fs.mkdirSync(subOutputDir, { recursive: true });
        }
        await processDirectory(fullPath, subOutputDir, quality, recursive, skipExisting);
      } else if (stats.isFile()) {
        await processFile(fullPath, outputDir, quality, skipExisting);
      }
    }
  } catch (error) {
    console.error(`❌ Erreur lecture dossier ${dirPath}:`, error.message);
  }
}

function showHelp() {
  console.log(`
🖼️  Convertisseur d'images vers webp

Usage:
  node convert-to-webp.js <source> [options]

Arguments:
  source          Fichier ou dossier à convertir

Options:
  -o, --output        Dossier de sortie (défaut: ./webp-output)
  -q, --quality       Qualité WebP (1-100, défaut: 80)
  -r, --recursive     Traitement récursif des dossiers
  --skip-existing     Ignorer les images déjà converties
  -h, --help          Afficher cette aide

Exemples:
  node convert-to-webp.js image.jpg
  node convert-to-webp.js images/ -o converted/ -q 90
  node convert-to-webp.js photos/ -r -q 85

Formats supportés: ${SUPPORTED_FORMATS.join(', ')}
`);
}

async function main() {
  const args = process.argv.slice(2);
  
  if (args.includes('-h') || args.includes('--help') || args.length === 0) {
    showHelp();
    return;
  }

  const source = args[0];
  const outputIndex = args.indexOf('-o') !== -1 ? args.indexOf('-o') : args.indexOf('--output');
  const qualityIndex = args.indexOf('-q') !== -1 ? args.indexOf('-q') : args.indexOf('--quality');
  const recursive = args.includes('-r') || args.includes('--recursive');
  const skipExisting = args.includes('--skip-existing');

  const outputDir = outputIndex !== -1 ? args[outputIndex + 1] : './output-webp';
  const quality = qualityIndex !== -1 ? parseInt(args[qualityIndex + 1]) : 80;

  if (!fs.existsSync(source)) {
    console.error(`❌ Source introuvable: ${source}`);
    return;
  }

  if (!fs.existsSync(outputDir)) {
    fs.mkdirSync(outputDir, { recursive: true });
  }

  const stats = await stat(source);
  
  if (stats.isFile()) {
    await processFile(source, outputDir, quality, skipExisting);
  } else if (stats.isDirectory()) {
    await processDirectory(source, outputDir, quality, recursive, skipExisting);
  }

  console.log(`\n🎉 Conversion terminée! Fichiers webp dans: ${outputDir}`);
}

// Vérifier si Sharp est installé
try {
  require('sharp');
} catch (error) {
  console.error(`
❌ Sharp n'est pas installé!

Pour installer Sharp:
  npm install sharp

Ou pour l'installer globalement:
  npm install -g sharp
`);
  process.exit(1);
}

main().catch(console.error); 