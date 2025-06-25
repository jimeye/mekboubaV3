import { NextResponse } from 'next/server';

export async function GET() {
  try {
    // Pour l'instant, on retourne un tableau vide
    // Plus tard, on pourra connecter à une vraie base de données
    const commandes = [];
    
    return NextResponse.json({ 
      commandes,
      message: 'API admin-commandes fonctionnelle'
    });
  } catch (error) {
    console.error('Erreur API admin-commandes:', error);
    return NextResponse.json(
      { error: 'Erreur lors de la récupération des commandes' }, 
      { status: 500 }
    );
  }
} 