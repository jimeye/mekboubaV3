"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayerButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef(null);

  useEffect(() => {
    // Détecter si c'est un appareil mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile) {
      // Sur desktop : démarrage automatique après 3 secondes
      const timer = setTimeout(() => {
        if (audioRef.current) {
          audioRef.current.play().then(() => {
            setIsPlaying(true);
          }).catch((error) => {
            console.log('Autoplay blocked:', error);
            // Si l'autoplay est bloqué, on garde le bouton en mode "play"
          });
        }
      }, 3000);

      return () => clearTimeout(timer);
    }
  }, []);

  const togglePlay = () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        audioRef.current.play();
        setIsPlaying(true);
      }
    }
  };

  return (
    <div className="fixed bottom-4 left-4 z-50">
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
      />
    </div>
  );
} 