'use client';

import React, { useRef, useEffect } from 'react';

interface ForestSoundsProps {
  autoPlay?: boolean;
  soundEnabled?: boolean;
  onSoundToggle?: (enabled: boolean) => void;
}

export const ForestSounds: React.FC<ForestSoundsProps> = ({ autoPlay = true, soundEnabled = true, onSoundToggle }) => {
  const audioRef = useRef<HTMLAudioElement | null>(null);

  // Sayfa yüklendiğinde otomatik başlat ve ses durumuna göre çal/durdur
  useEffect(() => {
    if (autoPlay && audioRef.current) {
      const playAudio = async () => {
        try {
          audioRef.current!.volume = 0.3; // Sabit ses seviyesi
          if (soundEnabled) {
            await audioRef.current?.play();
          } else {
            audioRef.current?.pause();
          }
        } catch (error) {
          console.log('Autoplay prevented by browser:', error);
        }
      };
      playAudio();
    }
  }, [autoPlay, soundEnabled]);

  // Sound enabled durumu değiştiğinde ses açıp kapa
  useEffect(() => {
    if (audioRef.current) {
      if (soundEnabled) {
        audioRef.current.play().catch(console.log);
      } else {
        audioRef.current.pause();
      }
    }
  }, [soundEnabled]);

  return (
    <audio
      ref={audioRef}
      loop
      preload="auto"
      style={{ display: 'none' }}
    >
      <source src="/sounds/forest-sounds.wav" type="audio/wav" />
      <source src="/sounds/forest-sounds.mp3" type="audio/mpeg" />
      Your browser does not support the audio element.
    </audio>
  );
};