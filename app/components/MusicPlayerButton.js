"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayerButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Détecter si c'est un appareil mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
      // Sur desktop : démarrage automatique après 2 secondes
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            console.log('Musique démarrée automatiquement');
            setIsPlaying(true);
          }).catch((error) => {
            console.log('Autoplay bloqué par le navigateur:', error);
            // Le bouton reste en mode "play" pour que l'utilisateur puisse cliquer
          });
        }
      }, 2000);

      return () => clearTimeout(timer);
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
        console.log('Musique mise en pause');
      } else {
        audioRef.current.play().then(() => {
          setIsPlaying(true);
          console.log('Musique lancée manuellement');
        }).catch((error) => {
          console.log('Erreur lors du lancement:', error);
        });
      }
    }
  };

  return (
    <div className="fixed bottom-6 left-4 z-50">
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-black/60 transition-all duration-300 transform hover:scale-110"
        style={{
          backdropFilter: "blur(4px)",
        }}
        aria-label={isPlaying ? "Pause musique" : "Lancer musique"}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className="text-xl">🎙️</span>
        )}
      </button>
      <audio
        ref={audioRef}
        src="/mekbouba-music.mp3"
        loop
        preload="auto"
      />
    </div>
  );
} 