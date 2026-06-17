'use client';

import React, { useState, useEffect } from 'react';

interface PomodoroTimerProps {
  onTimerStart: () => void;
  onTimerStop: () => void;
  onTimerComplete: () => void;
}

const WORK_DURATION = 25 * 60;
const SHORT_BREAK = 5 * 60;
const LONG_BREAK = 15 * 60;

const getBreakDuration = (sessionNum: number) => sessionNum % 4 === 0 ? LONG_BREAK : SHORT_BREAK;

export const PomodoroTimer: React.FC<PomodoroTimerProps> = ({
  onTimerStart,
  onTimerStop,
  onTimerComplete
}) => {
  const [timeLeft, setTimeLeft] = useState(WORK_DURATION);
  const [isActive, setIsActive] = useState(false);
  const [isBreak, setIsBreak] = useState(false);
  const [session, setSession] = useState(1);

  useEffect(() => {
    let interval: NodeJS.Timeout | null = null;

    if (isActive && timeLeft > 0) {
      interval = setInterval(() => {
        setTimeLeft(time => time - 1);
      }, 1000);
    } else if (timeLeft === 0) {
      onTimerComplete();
      if (isBreak) {
        setIsBreak(false);
        setTimeLeft(WORK_DURATION);
        setSession(prev => prev + 1);
      } else {
        setIsBreak(true);
        setTimeLeft(getBreakDuration(session));
      }
      setIsActive(false);
    }

    return () => {
      if (interval) clearInterval(interval);
    };
  }, [isActive, timeLeft, isBreak, session, onTimerComplete]);

  const startTimer = () => {
    setIsActive(true);
    onTimerStart();
  };

  const pauseTimer = () => {
    setIsActive(false);
    onTimerStop();
  };

  const resetTimer = () => {
    setIsActive(false);
    setTimeLeft(isBreak ? getBreakDuration(session) : WORK_DURATION);
    onTimerStop();
  };

  const skipSession = () => {
    setTimeLeft(0);
  };

  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  const breakDuration = getBreakDuration(session);
  const progress = isBreak
    ? (breakDuration - timeLeft) / breakDuration * 100
    : (WORK_DURATION - timeLeft) / WORK_DURATION * 100;
  const fullDuration = isBreak ? breakDuration : WORK_DURATION;
  const startButtonLabel = timeLeft === fullDuration ? 'Start' : 'Resume';

  return (
    <div className="bg-purple-800/30 backdrop-blur-sm rounded-xl p-8 border border-purple-500/20 text-center">
      <div className="mb-6">
        <h2 className="text-2xl font-bold text-white mb-2">
          {isBreak ? '☕ Break Time' : '📖 Study Session'}
        </h2>
        <div className="text-purple-200">
          Session #{session} {isBreak && session % 4 === 0 && '(Long Break)'}
        </div>
      </div>

      {/* Timer Display */}
      <div className="mb-8">
        <div className="text-6xl font-mono font-bold text-white mb-4">
          {formatTime(timeLeft)}
        </div>
        
        {/* Progress Circle */}
        <div className="relative w-32 h-32 mx-auto mb-6">
          <svg className="w-32 h-32 transform -rotate-90" viewBox="0 0 100 100">
            {/* Background circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              className="text-purple-800/50"
            />
            {/* Progress circle */}
            <circle
              cx="50"
              cy="50"
              r="45"
              stroke="currentColor"
              strokeWidth="8"
              fill="transparent"
              strokeDasharray={2 * Math.PI * 45}
              strokeDashoffset={2 * Math.PI * 45 * (1 - progress / 100)}
              className={isBreak ? "text-green-400" : "text-purple-400"}
              strokeLinecap="round"
            />
          </svg>
          <div className="absolute inset-0 flex items-center justify-center">
            <span className="text-2xl">
              {isBreak ? '🧙‍♀️' : '📚'}
            </span>
          </div>
        </div>
      </div>

      {/* Controls */}
      <div className="flex gap-4 justify-center">
        {isActive ? (
          <button
            onClick={pauseTimer}
            className="bg-yellow-600 hover:bg-yellow-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            Pause
          </button>
        ) : (
          <button
            onClick={startTimer}
            className="bg-purple-600 hover:bg-purple-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
          >
            {startButtonLabel}
          </button>
        )}
        
        <button
          onClick={resetTimer}
          className="bg-gray-600 hover:bg-gray-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Reset
        </button>
        
        <button
          onClick={skipSession}
          className="bg-indigo-600 hover:bg-indigo-700 text-white font-semibold py-3 px-6 rounded-lg transition-colors"
        >
          Skip
        </button>
      </div>

      {/* Session Dots */}
      <div className="flex justify-center gap-2 mt-6">
        {[1, 2, 3, 4].map((dot) => (
          <div
            key={dot}
            className={`w-3 h-3 rounded-full ${
              dot <= session % 4 || (session % 4 === 0 && dot === 4)
                ? 'bg-purple-400' 
                : 'bg-purple-800/50'
            }`}
          />
        ))}
      </div>
    </div>
  );
};