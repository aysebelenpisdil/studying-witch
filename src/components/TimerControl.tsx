'use client';

import React, { useState, useRef, useEffect } from 'react';

interface TimerControlProps {
  onTimerStart: (minutes: number) => void;
  isActive: boolean;
}

export const TimerControl: React.FC<TimerControlProps> = ({
  onTimerStart,
  isActive
}) => {
  const [minutes, setMinutes] = useState(25);
  const [isDragging, setIsDragging] = useState(false);
  const dialRef = useRef<HTMLDivElement>(null);

  // Convert minutes to angle (0 = top, 360 = full circle)
  const angle = (minutes / 120) * 360;

  const handleMouseDown = (e: React.MouseEvent) => {
    if (isActive) return; // Don't allow changes while timer is active
    setIsDragging(true);
    updateMinutesFromMouse(e);
  };

  const handleMouseMove = (e: MouseEvent) => {
    if (!isDragging || isActive) return;
    updateMinutesFromMouse(e);
  };

  const handleMouseUp = () => {
    setIsDragging(false);
  };

  const updateMinutesFromMouse = (e: MouseEvent | React.MouseEvent) => {
    if (!dialRef.current) return;

    const rect = dialRef.current.getBoundingClientRect();
    const centerX = rect.left + rect.width / 2;
    const centerY = rect.top + rect.height / 2;
    
    const mouseX = e.clientX - centerX;
    const mouseY = e.clientY - centerY;
    
    // Calculate angle from center
    let angle = Math.atan2(mouseY, mouseX) * 180 / Math.PI;
    
    // Adjust to start from top (12 o'clock)
    angle = (angle + 90 + 360) % 360;
    
    // Convert angle to minutes (0-120)
    const newMinutes = Math.round((angle / 360) * 120);
    
    setMinutes(Math.max(1, Math.min(120, newMinutes)));
  };

  useEffect(() => {
    if (isDragging) {
      document.addEventListener('mousemove', handleMouseMove);
      document.addEventListener('mouseup', handleMouseUp);
      
      return () => {
        document.removeEventListener('mousemove', handleMouseMove);
        document.removeEventListener('mouseup', handleMouseUp);
      };
    }
  }, [isDragging, handleMouseMove]);

  const handleStartTimer = () => {
    if (!isActive) {
      onTimerStart(minutes);
    }
  };

  // Calculate position of the handle
  const handleRadius = 100; // Distance from center
  const handleAngle = (angle - 90) * Math.PI / 180; // Convert to radians, adjust for top start
  const handleX = Math.cos(handleAngle) * handleRadius;
  const handleY = Math.sin(handleAngle) * handleRadius;

  return (
    <div className="flex flex-col items-center justify-center bg-purple-800/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 select-none">
      <h2 className="text-2xl font-bold text-white mb-6">
        🎯 Focus Timer
      </h2>

      {/* Circular Timer Control */}
      <div className="relative mb-8">
        <div
          ref={dialRef}
          className={`relative w-64 h-64 rounded-full border-8 transition-all duration-200 ${
            isActive 
              ? 'border-purple-500/50 cursor-not-allowed' 
              : 'border-purple-500/30 cursor-pointer hover:border-purple-400/50'
          } bg-purple-900/20`}
          onMouseDown={handleMouseDown}
        >
          {/* Progress arc */}
          <svg className="absolute inset-0 w-full h-full -rotate-90" viewBox="0 0 100 100">
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="transparent"
              strokeWidth="8"
              fill="none"
            />
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="#7c3aed"
              strokeWidth="8"
              fill="none"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - (minutes / 120))}
              className="transition-all duration-300"
              strokeLinecap="round"
              opacity="0.6"
            />
          </svg>
          {/* Center display */}
          <div className="absolute inset-0 flex items-center justify-center">
            <div className="text-center">
              <div className="text-4xl font-mono font-bold text-white mb-1">
                {minutes}
              </div>
              <div className="text-purple-200 text-sm">
                minute{minutes !== 1 ? 's' : ''}
              </div>
            </div>
          </div>

          {/* Draggable Handle */}
          {!isActive && (
            <div
              className="absolute w-6 h-6 bg-purple-400 rounded-full border-4 border-white shadow-lg cursor-grab active:cursor-grabbing transform -translate-x-1/2 -translate-y-1/2 hover:scale-110 transition-transform"
              style={{
                left: `calc(50% + ${handleX}px)`,
                top: `calc(50% + ${handleY}px)`
              }}
            />
          )}

          {/* Hour markers */}
          {[0, 30, 60, 90, 120].map((mark) => {
            const markAngle = (mark / 120) * 360 - 90;
            const markRad = markAngle * Math.PI / 180;
            const markX = Math.cos(markRad) * 110;
            const markY = Math.sin(markRad) * 110;
            
            return (
              <div
                key={mark}
                className="absolute w-1 h-4 bg-purple-300 transform -translate-x-1/2 -translate-y-1/2"
                style={{
                  left: `calc(50% + ${markX}px)`,
                  top: `calc(50% + ${markY}px)`,
                  transform: `translate(-50%, -50%) rotate(${markAngle + 90}deg)`
                }}
              />
            );
          })}
        </div>

        {/* Quick preset buttons */}
        <div className="flex justify-center gap-2 mt-4">
          {[15, 25, 45, 60].map((preset) => (
            <button
              key={preset}
              onClick={() => !isActive && setMinutes(preset)}
              disabled={isActive}
              className={`px-3 py-1 text-sm rounded-full transition-colors ${
                minutes === preset
                  ? 'bg-purple-500 text-white'
                  : 'bg-purple-800/50 text-purple-200 hover:bg-purple-700/50'
              } ${isActive ? 'opacity-50 cursor-not-allowed' : ''}`}
            >
              {preset}m
            </button>
          ))}
        </div>
      </div>

      {/* Start Button */}
      <button
        onClick={handleStartTimer}
        disabled={isActive}
        className={`w-full py-4 px-8 rounded-xl font-bold text-lg transition-all duration-200 ${
          isActive
            ? 'bg-gray-600 text-gray-400 cursor-not-allowed'
            : 'bg-purple-600 hover:bg-purple-700 text-white transform hover:scale-105 shadow-lg hover:shadow-purple-500/25'
        }`}
      >
        {isActive ? '🧙‍♀️ Spell in Progress...' : '✨ Cast Focus Spell!'}
      </button>

      {/* Timer range info */}
      <div className="text-purple-300 text-sm mt-4 text-center">
        Drag the handle to set timer (1-120 minutes)
        <br />
        <span className="text-purple-400">Perfect for Pomodoro & deep work sessions</span>
      </div>
    </div>
  );
};