import puppeteer from 'puppeteer';
import { NextResponse } from 'next/server';

export async function POST(request) {
  try {
    const { url, type } = await request.json();
    
    // Lancer le navigateur
    const browser = await puppeteer.launch({
      headless: 'new',
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    
    const page = await browser.newPage();
    
    // Définir la taille de la page pour A4
    await page.setViewport({
      width: 794, // A4 width in pixels at 96 DPI
      height: 1123, // A4 height in pixels at 96 DPI
      deviceScaleFactor: 1,
    });
    
    // Naviguer vers la page
    const targetUrl = url || `http://localhost:3000/${type || 'newsletter'}`;
    await page.goto(targetUrl, { waitUntil: 'networkidle0' });
    
    // Attendre que le contenu soit chargé
    await page.waitForTimeout(2000);
    
    // Générer le PDF
    const pdf = await page.pdf({
      format: 'A4',
      printBackground: true,
      margin: {
        top: '0.5in',
        right: '0.5in',
        bottom: '0.5in',
        left: '0.5in'
      }
    });
    
    await browser.close();
    
    // Retourner le PDF
    return new NextResponse(pdf, {
      status: 200,
      headers: {
        'Content-Type': 'application/pdf',
        'Content-Disposition': `attachment; filename="mekbouba-${type || 'newsletter'}.pdf"`
      }
    });
    
  } catch (error) {
    console.error('Erreur lors de la génération du PDF:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la génération du PDF' },
      { status: 500 }
    );
  }
} 