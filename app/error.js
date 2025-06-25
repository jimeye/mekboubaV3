'use client';

export default function Error({ error, reset }) {
  return (
    <div className="min-h-screen bg-gray-100 flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-md text-center">
        <h2 className="text-xl font-semibold text-red-600 mb-4">Une erreur s'est produite</h2>
        <p className="text-gray-600 mb-6">{error.message}</p>
        <button
          onClick={reset}
          className="bg-accent-red text-white px-6 py-2 rounded-lg hover:bg-accent-red/90 transition-colors"
        >
          Réessayer
        </button>
      </div>
    </div>
  );
} 