'use client';

import React from 'react';

interface WitchSpriteProps {
  animation: 'idle' | 'flying' | 'walking' | 'studying' | 'spell' | 'sleeping';
  className?: string;
}

export const WitchSprite: React.FC<WitchSpriteProps> = ({ 
  animation, 
  className = '' 
}) => {

  // Use the witch.png image with animations
  return (
    <div className={`witch-sprite ${className}`}>
      {/* eslint-disable-next-line @next/next/no-img-element */}
      <img 
        src="/witch.png" 
        alt="Witch"
        className={`
          w-36 h-36 object-contain
          ${animation === 'idle' ? 'animate-bounce' : ''}
          ${animation === 'flying' ? 'animate-pulse' : ''}
          ${animation === 'spell' ? 'animate-spin' : ''}
          ${animation === 'sleeping' ? 'opacity-70' : ''}
        `}
        style={{
          imageRendering: 'pixelated',
          animation: animation === 'idle' ? 'witch-idle 2s ease-in-out infinite' : 
                    animation === 'flying' ? 'witch-flying 0.8s ease-in-out infinite' :
                    animation === 'spell' ? 'witch-spell 1s ease-in-out' : 'none'
        }}
      />
      <style jsx>{`
        @keyframes witch-idle {
          0%, 100% { transform: translateY(0px); }
          50% { transform: translateY(-3px); }
        }
        
        @keyframes witch-flying {
          0%, 100% { transform: translateX(0px) translateY(0px) rotate(0deg); }
          25% { transform: translateX(2px) translateY(-2px) rotate(2deg); }
          75% { transform: translateX(-2px) translateY(2px) rotate(-2deg); }
        }
        
        @keyframes witch-spell {
          0% { transform: rotate(0deg); filter: brightness(1); }
          50% { transform: scale(1.2) rotate(180deg); filter: brightness(1.5) hue-rotate(90deg); }
          100% { transform: rotate(360deg); filter: brightness(1); }
        }
      `}</style>
    </div>
  );

};