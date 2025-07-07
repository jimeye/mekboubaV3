"use client";
import { useEffect, useRef, useState } from "react";

export default function MusicPlayerButton() {
  const [isPlaying, setIsPlaying] = useState(false);
  const [currentTrackIndex, setCurrentTrackIndex] = useState(0);
  const [playlist, setPlaylist] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const audioRef = useRef(null);

  // Fonction pour vérifier si un fichier audio existe
  const checkAudioFile = async (filename) => {
    try {
      const response = await fetch(filename, { method: 'HEAD' });
      return response.ok;
    } catch {
      return false;
    }
  };

  // Fonction pour générer la playlist dynamiquement
  const generatePlaylist = async () => {
    const basePlaylist = [
      "/mekbouba-music.mp3"
    ];
    
    const dynamicPlaylist = [...basePlaylist];
    
    // Vérifier les fichiers mekbouba-music-1.mp3, mekbouba-music-2.mp3, etc.
    let index = 1;
    while (index <= 20) { // Limite à 20 fichiers pour éviter une boucle infinie
      const filename = `/mekbouba-music-${index}.mp3`;
      const exists = await checkAudioFile(filename);
      
      if (exists) {
        dynamicPlaylist.push(filename);
        console.log(`Fichier audio trouvé: ${filename}`);
      } else {
        // Si on ne trouve pas le fichier, on arrête la recherche
        break;
      }
      index++;
    }
    
    setPlaylist(dynamicPlaylist);
    setIsLoading(false);
    console.log(`🎵 Playlist générée avec ${dynamicPlaylist.length} morceaux:`, dynamicPlaylist);
    console.log(`📁 Fichiers détectés:`, dynamicPlaylist.map(file => file.split('/').pop()));
  };

  useEffect(() => {
    generatePlaylist();
  }, []);

  useEffect(() => {
    // Détecter si c'est un appareil mobile
    const isMobile = /Android|webOS|iPhone|iPad|iPod|BlackBerry|IEMobile|Opera Mini/i.test(navigator.userAgent);
    
    if (!isMobile && playlist.length > 0) {
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
  }, [playlist]);

  // Relancer la lecture automatiquement quand on change de morceau
  useEffect(() => {
    if (audioRef.current && isPlaying && playlist.length > 0) {
      audioRef.current.play().catch((e) => {
        console.log('Erreur lors de la lecture automatique du morceau suivant :', e);
      });
    }
  }, [currentTrackIndex, isPlaying, playlist]);

  // Gérer la fin d'un morceau et passer au suivant (ordre naturel)
  const handleTrackEnd = () => {
    if (playlist.length === 0) return;
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    // Charger et jouer le morceau suivant
    if (audioRef.current) {
      audioRef.current.src = playlist[nextIndex];
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().catch((e) => {
          console.log('Erreur lors du passage au morceau suivant :', e);
        });
      }
    }
  };

  const togglePlay = () => {
    if (audioRef.current && playlist.length > 0) {
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

  // Changer de morceau manuellement
  const nextTrack = () => {
    if (playlist.length === 0) return;
    
    const nextIndex = (currentTrackIndex + 1) % playlist.length;
    setCurrentTrackIndex(nextIndex);
    
    if (audioRef.current) {
      audioRef.current.src = playlist[nextIndex];
      audioRef.current.load();
      if (isPlaying) {
        audioRef.current.play().then(() => {
          console.log(`Changement manuel vers le morceau ${nextIndex + 1}`);
        }).catch((error) => {
          console.log('Erreur lors du changement de morceau:', error);
        });
      }
    }
  };

  // Obtenir le nom du fichier pour l'affichage
  const getTrackName = (filename) => {
    const name = filename.split('/').pop().replace('.mp3', '');
    if (name === 'mekbouba-music') return 'Mekbouba Music';
    if (name.startsWith('mekbouba-music-')) {
      const num = name.replace('mekbouba-music-', '');
      return `Mekbouba Music ${num}`;
    }
    return name;
  };

  // Quand la playlist est prête, choisir un morceau aléatoire au démarrage
  useEffect(() => {
    if (playlist.length > 1) {
      const randomIndex = Math.floor(Math.random() * playlist.length);
      setCurrentTrackIndex(randomIndex);
      console.log(`🎲 Démarrage aléatoire sur le morceau ${randomIndex + 1}`);
    }
  }, [isLoading, playlist.length]);

  if (isLoading) {
    return (
      <div className="fixed bottom-6 left-4 z-50">
        <div className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center shadow-lg">
          <div className="animate-spin rounded-full h-6 w-6 border-b-2 border-white"></div>
        </div>
      </div>
    );
  }

  return (
    <div className="fixed bottom-6 left-4 z-50 flex items-center space-x-2">
      {/* Bouton principal play/pause */}
      <button
        onClick={togglePlay}
        className="w-12 h-12 rounded-full bg-black/40 backdrop-blur-sm text-white flex items-center justify-center shadow-lg hover:bg-black/60 transition-all duration-300 transform hover:scale-110"
        style={{
          backdropFilter: "blur(4px)",
        }}
        aria-label={isPlaying ? "Pause musique" : "Lancer musique"}
        disabled={playlist.length === 0}
      >
        {isPlaying ? (
          <svg className="w-6 h-6" fill="currentColor" viewBox="0 0 20 20">
            <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zM7 8a1 1 0 012 0v4a1 1 0 11-2 0V8zm5-1a1 1 0 00-1 1v4a1 1 0 102 0V8a1 1 0 00-1-1z" clipRule="evenodd" />
          </svg>
        ) : (
          <span className="text-xl">🎙️</span>
        )}
      </button>
      {/* Bouton next track, SVG blanc, sans aucun fond ni style */}
      <button
        onClick={handleTrackEnd}
        style={{ fontSize: '1rem', color: 'white', background: 'none', border: 'none', boxShadow: 'none', padding: 0, margin: 0, minWidth: 0, minHeight: 0, lineHeight: 1, marginLeft: '4px', display: 'flex', alignItems: 'center' }}
        aria-label="Morceau suivant"
        disabled={playlist.length <= 1}
      >
        <svg width="16" height="16" viewBox="0 0 20 20" fill="white" xmlns="http://www.w3.org/2000/svg">
          <polygon points="4,3 13,10 4,17" />
          <rect x="15" y="3" width="2" height="14" rx="1" />
        </svg>
      </button>
      {playlist.length > 0 && (
        <audio
          ref={audioRef}
          src={playlist[currentTrackIndex]}
          onEnded={handleTrackEnd}
          preload="auto"
        />
      )}
    </div>
  );
} 