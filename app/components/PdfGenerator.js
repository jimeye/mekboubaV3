'use client';

import { useState } from 'react';

export default function PdfGenerator() {
  const [isGenerating, setIsGenerating] = useState(false);
  const [error, setError] = useState('');

  const generatePdf = async (type) => {
    setIsGenerating(true);
    setError('');

    try {
      const response = await fetch('/api/generate-pdf', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          type: type,
          url: `${window.location.origin}/${type}`
        }),
      });

      if (!response.ok) {
        throw new Error('Erreur lors de la génération du PDF');
      }

      // Télécharger le PDF
      const blob = await response.blob();
      const url = window.URL.createObjectURL(blob);
      const a = document.createElement('a');
      a.href = url;
      a.download = `mekbouba-${type}.pdf`;
      document.body.appendChild(a);
      a.click();
      window.URL.revokeObjectURL(url);
      document.body.removeChild(a);

    } catch (err) {
      setError(err.message);
      console.error('Erreur:', err);
    } finally {
      setIsGenerating(false);
    }
  };

  return (
    <div className="fixed bottom-4 right-4 z-50">
      <div className="bg-white rounded-lg shadow-lg p-4 border">
        <h3 className="text-lg font-semibold mb-3">Générer PDF</h3>
        
        <div className="space-y-2">
          <button
            onClick={() => generatePdf('newsletter')}
            disabled={isGenerating}
            className="w-full bg-accent-red text-white px-4 py-2 rounded hover:bg-accent-red/90 disabled:opacity-50"
          >
            {isGenerating ? 'Génération...' : 'Newsletter PDF'}
          </button>
          
          <button
            onClick={() => generatePdf('newsletter2')}
            disabled={isGenerating}
            className="w-full bg-accent-red text-white px-4 py-2 rounded hover:bg-accent-red/90 disabled:opacity-50"
          >
            {isGenerating ? 'Génération...' : 'Newsletter2 PDF'}
          </button>
        </div>

        {error && (
          <p className="text-red-500 text-sm mt-2">{error}</p>
        )}
      </div>
    </div>
  );
} 