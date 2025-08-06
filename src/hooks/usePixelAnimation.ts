import { useState, useEffect, useRef } from 'react';

interface PixelAnimationConfig {
  spriteSheet: string;
  frameCount: number;
  frameRate: number;
  loop: boolean;
  frameWidth: number;
  frameHeight: number;
}

export const usePixelAnimation = (config: PixelAnimationConfig) => {
  const [currentFrame, setCurrentFrame] = useState(0);
  const [isPlaying, setIsPlaying] = useState(true);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  const frameDelay = 1000 / config.frameRate;

  useEffect(() => {
    if (!isPlaying) return;

    intervalRef.current = setInterval(() => {
      setCurrentFrame(prev => {
        if (prev >= config.frameCount - 1) {
          if (config.loop) {
            return 0;
          } else {
            setIsPlaying(false);
            return prev;
          }
        }
        return prev + 1;
      });
    }, frameDelay);

    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [isPlaying, config.frameCount, config.loop, frameDelay]);

  const play = () => setIsPlaying(true);
  const pause = () => setIsPlaying(false);
  const reset = () => {
    setCurrentFrame(0);
    setIsPlaying(false);
  };

  const backgroundPosition = `-${currentFrame * config.frameWidth}px 0`;

  return {
    currentFrame,
    isPlaying,
    backgroundPosition,
    play,
    pause,
    reset
  };
};