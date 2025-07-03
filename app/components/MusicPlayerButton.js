"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayerButton() {
  const audioRef = useRef(null);
  const [isPlaying, setIsPlaying] = useState(true);

  useEffect(() => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.play().catch(() => {});
      } else {
        audioRef.current.pause();
      }
    }
  }, [isPlaying]);

  // Lecture automatique au chargement
  useEffect(() => {
    if (audioRef.current) {
      audioRef.current.play().catch(() => {});
    }
  }, []);

  return (
    <>
      <audio
        ref={audioRef}
        src={encodeURI("/עומר אדם - שווארמה ודמעה.mp3")}
        loop
      />
      <button
        aria-label={isPlaying ? "Couper la musique" : "Activer la musique"}
        onClick={() => setIsPlaying((p) => !p)}
        className="fixed bottom-4 left-4 z-50 w-14 h-14 rounded-full bg-black/40 shadow-lg flex items-center justify-center text-white text-2xl hover:bg-black/60 transition-colors focus:outline-none"
        style={{ backdropFilter: "blur(4px)" }}
      >
        {isPlaying ? (
          <svg width="28" height="28" viewBox="0 0 28 28" fill="none" xmlns="http://www.w3.org/2000/svg">
            <rect x="6" y="5" width="4" height="18" rx="2" fill="white"/>
            <rect x="18" y="5" width="4" height="18" rx="2" fill="white"/>
          </svg>
        ) : (
          <span style={{fontSize: '1.7rem', lineHeight: 1}}>🎙️</span>
        )}
      </button>
    </>
  );
} 