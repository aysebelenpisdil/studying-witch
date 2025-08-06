'use client';

import React, { useState, useRef, useEffect } from 'react';
import Link from 'next/link';
import { useSession } from 'next-auth/react';
import { WitchSprite } from '@/components/WitchSprite';
import { TimerControl } from '@/components/TimerControl';
import { TodoList } from '@/components/TodoList';
import { ForestSounds } from '@/components/ForestSounds';
import { SimpleChart } from '@/components/SimpleChart';

export default function StudyPage() {
  const { data: session } = useSession();
  const [witchAnimation, setWitchAnimation] = useState<'idle' | 'flying' | 'walking' | 'studying' | 'spell' | 'sleeping'>('idle');
  const [witchPosition, setWitchPosition] = useState({ x: 85, y: 80 });
  const [isTimerActive, setIsTimerActive] = useState(false);
  const [timeLeft, setTimeLeft] = useState(0);
  const [totalTime, setTotalTime] = useState(0);
  const [movementCounter, setMovementCounter] = useState(0);
  const [targetPosition, setTargetPosition] = useState({ x: 85, y: 80 });
  const [showStats, setShowStats] = useState(false);
  const [showSettings, setShowSettings] = useState(false);
  const [soundEnabled, setSoundEnabled] = useState(true);
  const [sessionsToday, setSessionsToday] = useState(0);
  const [totalFocusTime, setTotalFocusTime] = useState(0);
  const [completedTasks, setCompletedTasks] = useState(0);
  const [currentSessionStart, setCurrentSessionStart] = useState<Date | null>(null);
  const [dailyStats, setDailyStats] = useState<{[key: string]: {sessions: number, focusTime: number, tasks: number}}>({}
  );
  const movementInterval = useRef<NodeJS.Timeout | null>(null);
  const timerInterval = useRef<NodeJS.Timeout | null>(null);

  // Load stats from localStorage on mount
  useEffect(() => {
    const today = new Date().toDateString();
    const storedSessionsToday = localStorage.getItem(`sessions_${today}`) || '0';
    const storedTotalFocusTime = localStorage.getItem('totalFocusTime') || '0';
    const storedCompletedTasks = localStorage.getItem('completedTasks') || '0';
    const storedDailyStats = localStorage.getItem('dailyStats') || '{}';
    
    setSessionsToday(parseInt(storedSessionsToday));
    setTotalFocusTime(parseInt(storedTotalFocusTime));
    setCompletedTasks(parseInt(storedCompletedTasks));
    setDailyStats(JSON.parse(storedDailyStats));
  }, []);

  // Save stats to localStorage and update daily stats whenever they change
  useEffect(() => {
    const today = new Date().toDateString();
    localStorage.setItem(`sessions_${today}`, sessionsToday.toString());
    localStorage.setItem('totalFocusTime', totalFocusTime.toString());
    localStorage.setItem('completedTasks', completedTasks.toString());
    
    // Update daily stats
    setDailyStats(prev => {
      const updated = {
        ...prev,
        [today]: {
          sessions: sessionsToday,
          focusTime: (prev[today]?.focusTime || 0) + (totalFocusTime - (prev[today]?.focusTime || 0)),
          tasks: completedTasks
        }
      };
      localStorage.setItem('dailyStats', JSON.stringify(updated));
      return updated;
    });
  }, [sessionsToday, totalFocusTime, completedTasks]);

  // Enhanced witch movement - covers more screen area
  useEffect(() => {
    if (isTimerActive && witchAnimation === 'flying') {
      movementInterval.current = setInterval(() => {
        setWitchPosition(prev => {
          // Kedi gibi doğal hareket - hedefe doğru git veya yeni hedef seç
          const distanceToTarget = Math.sqrt(
            Math.pow(targetPosition.x - prev.x, 2) + Math.pow(targetPosition.y - prev.y, 2)
          );
          
          // Hedefe yaklaştıysak yeni hedef seç
          if (distanceToTarget < 8) {
            // Yeni rastgele hedef (deterministic seed kullan) - TÜM EKRANI KAPSA
            const seedX = (movementCounter * 17 + Date.now() % 1000) % 95 + 3; // 3-98 arasında
            const seedY = (movementCounter * 31 + Date.now() % 1000) % 95 + 3; // 3-98 arasında
            setTargetPosition({ x: seedX, y: seedY });
            setMovementCounter(prev => prev + 1);
          }
          
          // Hedefe doğru hareket et (daha doğal adımlar)
          const deltaX = targetPosition.x - prev.x;
          const deltaY = targetPosition.y - prev.y;
          
          // Hareket hızını normalize et (kedi hızı) - biraz daha hızlı
          const moveSpeed = 2.0;
          const distance = Math.sqrt(deltaX * deltaX + deltaY * deltaY);
          
          let newX = prev.x;
          let newY = prev.y;
          
          if (distance > 0) {
            newX = prev.x + (deltaX / distance) * moveSpeed;
            newY = prev.y + (deltaY / distance) * moveSpeed;
          }
          
          // Ekran sınırları içinde tut - tam sınırları kullan
          newX = Math.max(1, Math.min(99, newX));
          newY = Math.max(1, Math.min(99, newY));
          
          return { x: newX, y: newY };
        });
      }, 100); // Daha akıcı hareket için daha sık güncelle
    } else {
      if (movementInterval.current) {
        clearInterval(movementInterval.current);
      }
    }

    return () => {
      if (movementInterval.current) {
        clearInterval(movementInterval.current);
      }
    };
  }, [isTimerActive, witchAnimation]);

  // Timer countdown logic
  useEffect(() => {
    if (isTimerActive && timeLeft > 0) {
      timerInterval.current = setInterval(() => {
        setTimeLeft(prev => {
          if (prev <= 1) {
            handleTimerComplete();
            return 0;
          }
          return prev - 1;
        });
      }, 1000);
    } else {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    }

    return () => {
      if (timerInterval.current) {
        clearInterval(timerInterval.current);
      }
    };
  }, [isTimerActive, timeLeft]);

  const handleTimerStart = (minutes: number) => {
    const seconds = minutes * 60;
    setTotalTime(seconds);
    setTimeLeft(seconds);
    setIsTimerActive(true);
    setWitchAnimation('flying');
    setCurrentSessionStart(new Date());
    
    // Timer başladığında rastgele bir noktaya git ki tüm ekranı dolaşsın
    const randomX = Math.random() * 80 + 10; // 10-90 arasında
    const randomY = Math.random() * 80 + 10; // 10-90 arasında  
    setTargetPosition({ x: randomX, y: randomY });
  };

  const handleTimerStop = () => {
    // Calculate focus time if session was running
    if (currentSessionStart) {
      const focusedSeconds = totalTime - timeLeft;
      if (focusedSeconds >= 30) { // En az 30 saniye çalışma sayılır
        const focusedMinutes = Math.ceil(focusedSeconds / 60); // Yukarı yuvarlama
        setTotalFocusTime(prev => prev + focusedMinutes);
      }
    }
    
    setIsTimerActive(false);
    setWitchAnimation('idle');
    setTimeLeft(0);
    setTotalTime(0);
    setCurrentSessionStart(null);
    // Cadı'yı sağ alt köşeye geri gönder
    setWitchPosition({ x: 85, y: 80 });
    setTargetPosition({ x: 85, y: 80 });
  };

  const handleTimerComplete = () => {
    // Timer completed successfully - count as full session
    if (currentSessionStart) {
      const completedMinutes = Math.floor(totalTime / 60);
      setTotalFocusTime(prev => prev + completedMinutes);
      setSessionsToday(prev => prev + 1);
    }
    
    setIsTimerActive(false);
    setWitchAnimation('spell');
    setTimeLeft(0);
    setTotalTime(0);
    setCurrentSessionStart(null);
    
    // Show spell animation for 3 seconds, then back to idle in corner
    setTimeout(() => {
      setWitchAnimation('idle');
      setWitchPosition({ x: 85, y: 80 });
      setTargetPosition({ x: 85, y: 80 });
    }, 3000);
  };

  const handleTaskComplete = () => {
    // Task completed - increment counter
    setCompletedTasks(prev => prev + 1);
    
    const currentAnimation = witchAnimation;
    setWitchAnimation('spell');
    // Return to previous animation after spell
    setTimeout(() => {
      setWitchAnimation(currentAnimation === 'spell' ? 'idle' : currentAnimation);
    }, 2000);
  };

  // Format time for display
  const formatTime = (seconds: number) => {
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    return `${minutes.toString().padStart(2, '0')}:${remainingSeconds.toString().padStart(2, '0')}`;
  };

  // Format total focus time in hours and minutes
  const formatFocusTime = (totalMinutes: number) => {
    const hours = Math.floor(totalMinutes / 60);
    const minutes = totalMinutes % 60;
    return `${hours}h ${minutes}m`;
  };

  return (
    <div className="min-h-screen relative overflow-hidden"
         style={{
           backgroundImage: `url('/background.png')`,
           backgroundSize: 'cover',
           backgroundPosition: 'center',
           backgroundRepeat: 'no-repeat'
         }}>
      {/* Background stars/sparkles */}
      <div className="absolute inset-0 overflow-hidden pointer-events-none">
        {[...Array(30)].map((_, i) => {
          // Use index-based deterministic values instead of Math.random()
          const seed1 = (i * 17 + 23) % 100;
          const seed2 = (i * 31 + 47) % 100; 
          const seed3 = (i * 13 + 11) % 50;
          const seed4 = (i * 7 + 3) % 80;
          const seed5 = (i * 19 + 29) % 30;
          
          return (
            <div
              key={i}
              className={`absolute w-1 h-1 bg-yellow-300 rounded-full animate-pulse`}
              style={{
                top: `${seed1}%`,
                left: `${seed2}%`,
                animationDelay: `${seed3 / 10}s`,
                opacity: (seed4 / 100) * 0.8 + 0.2,
                animationDuration: `${(seed5 / 10) + 2}s`
              }}
            />
          );
        })}
      </div>

      {/* Floating Witch - Full Screen Coverage */}
      <div
        className="fixed transition-all duration-1500 ease-in-out z-50 pointer-events-none"
        style={{
          left: `${witchPosition.x}%`,
          top: `${witchPosition.y}%`,
          transform: 'translate(-50%, -50%)'
        }}
      >
        <WitchSprite animation={witchAnimation} />
        
        {/* Dynamic speech bubbles */}
        {isTimerActive && witchAnimation === 'flying' && (
          <div className="absolute -top-16 -left-8 bg-white/90 text-purple-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap animate-bounce">
{Math.floor(Date.now() / 5000) % 2 === 0 ? "Let's focus! ✨" : "Study magic activated! 🔮"}
            <div className="absolute bottom-0 left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-white/90 transform translate-y-full"></div>
          </div>
        )}
        
        {witchAnimation === 'spell' && (
          <div className="absolute -top-16 -left-8 bg-yellow-400/90 text-purple-900 px-3 py-2 rounded-lg text-sm font-medium whitespace-nowrap animate-pulse">
            Great job! ⭐ Keep it up!
            <div className="absolute bottom-0 left-6 w-0 h-0 border-l-4 border-r-4 border-t-4 border-l-transparent border-r-transparent border-t-yellow-400/90 transform translate-y-full"></div>
          </div>
        )}
      </div>

      {/* Header */}
      <header className="relative z-20 p-4">
        <div className="max-w-7xl mx-auto flex justify-between items-center">
          <div className="flex items-center gap-4">
            <img src="/logo.png" alt="Logo" className="w-12 h-12" style={{imageRendering: 'pixelated'}} />
            <div>
              <h1 className="text-2xl md:text-3xl font-bold text-white">
                Studying Witch
              </h1>
            </div>
          </div>

          <div className="flex items-center gap-4">
            {session?.user && (
              <div className="bg-white/10 backdrop-blur-sm rounded-lg px-4 py-2 border border-white/30">
                <div className="flex items-center gap-3">
                  {session.user.image && (
                    <img 
                      src={session.user.image} 
                      alt="Profile" 
                      className="w-8 h-8 rounded-full"
                    />
                  )}
                  <div className="text-white">
                    <div className="text-sm font-medium">{session.user.name}</div>
                    <div className="text-xs opacity-80">{session.user.email}</div>
                  </div>
                </div>
              </div>
            )}
            
            <Link 
              href="/"
              className="bg-white/10 backdrop-blur-sm hover:bg-white/20 text-white px-4 py-2 rounded-lg border border-white/30 transition-colors"
            >
              🏠 Home
            </Link>
          </div>
        </div>
      </header>

      {/* Main Content - Dynamic Layout */}
      <main className="relative z-20 max-w-7xl mx-auto px-4 pb-6">
        {/* Normal Layout: Side by Side */}
        {!isTimerActive && (
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-8 min-h-[600px]">
            {/* Left: Todo List */}
            <div className="order-2 lg:order-1">
              <TodoList onTaskComplete={handleTaskComplete} />
            </div>

            {/* Right: Timer Control */}
            <div className="order-1 lg:order-2 flex items-center justify-center">
              <TimerControl 
                onTimerStart={handleTimerStart}
                isActive={isTimerActive}
              />
            </div>
          </div>
        )}

        {/* Active Layout: Timer Center, Todo Small Bottom */}
        {isTimerActive && (
          <div className="space-y-6">
            {/* Center: Active Timer Display */}
            <div className="flex items-center justify-center min-h-[400px]">
              <div className="bg-white/10 backdrop-blur-sm rounded-xl p-8 border border-white/20 text-center max-w-md w-full">
                <h2 className="text-3xl font-bold text-white mb-4">
                  🧙‍♀️ Focus Magic Active
                </h2>
                
                {/* Large Timer Display */}
                <div className="text-8xl font-mono font-bold text-white mb-4">
                  {formatTime(timeLeft)}
                </div>
                
                {/* Progress Circle */}
                <div className="relative w-48 h-48 mx-auto mb-6">
                  <svg className="w-48 h-48 transform -rotate-90" viewBox="0 0 100 100">
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      className="text-white/30"
                    />
                    <circle
                      cx="50"
                      cy="50"
                      r="45"
                      stroke="currentColor"
                      strokeWidth="4"
                      fill="transparent"
                      strokeDasharray={2 * Math.PI * 45}
                      strokeDashoffset={2 * Math.PI * 45 * (1 - (totalTime > 0 ? (totalTime - timeLeft) / totalTime : 0))}
                      className="text-white"
                      strokeLinecap="round"
                    />
                  </svg>
                  <div className="absolute inset-0 flex items-center justify-center">
                    <span className="text-4xl animate-pulse">🔮</span>
                  </div>
                </div>

                {/* Stop Button */}
                <button
                  onClick={handleTimerStop}
                  className="bg-red-600 hover:bg-red-700 text-white font-semibold py-3 px-8 rounded-lg transition-colors"
                >
                  🛑 Stop Spell
                </button>
              </div>
            </div>

            {/* Bottom: Compact Todo List */}
            <div className="max-w-md mx-auto">
              <div className="transform scale-75 origin-top">
                <TodoList onTaskComplete={handleTaskComplete} />
              </div>
            </div>
          </div>
        )}

        {/* Bottom Stats - Always Visible */}
        <div className="mt-8 grid grid-cols-1 md:grid-cols-3 gap-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">{sessionsToday}</div>
            <div className="text-white/90 text-sm">Sessions Today</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">
              {isTimerActive ? formatFocusTime(totalFocusTime + Math.floor((totalTime - timeLeft) / 60)) : formatFocusTime(totalFocusTime)}
            </div>
            <div className="text-white/90 text-sm">Total Focus Time</div>
          </div>
          
          <div className="bg-white/10 backdrop-blur-sm rounded-lg p-4 border border-white/20 text-center">
            <div className="text-2xl font-bold text-white">{completedTasks}</div>
            <div className="text-white/90 text-sm">Tasks Completed</div>
          </div>
        </div>
      </main>

      {/* Floating Navigation */}
      <nav className="fixed bottom-6 left-1/2 transform -translate-x-1/2 bg-white/10 backdrop-blur-sm rounded-full px-6 py-3 border border-white/30 z-30">
        <div className="flex items-center gap-4">
          <button 
            onClick={() => setShowStats(!showStats)}
            className={`text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20 ${showStats ? 'bg-white/20 text-white' : ''}`} 
            title="Statistics"
          >
            📊
          </button>
          <button 
            onClick={() => setShowSettings(!showSettings)}
            className={`text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20 ${showSettings ? 'bg-white/20 text-white' : ''}`} 
            title="Settings"
          >
            ⚙️
          </button>
          <button 
            onClick={() => setSoundEnabled(!soundEnabled)}
            className={`text-white/70 hover:text-white transition-colors p-2 rounded-full hover:bg-white/20 ${!soundEnabled ? 'opacity-50' : ''}`} 
            title={soundEnabled ? "Mute Sounds" : "Unmute Sounds"}
          >
            {soundEnabled ? '🎵' : '🔇'}
          </button>
        </div>
      </nav>

      {/* Statistics Modal */}
      {showStats && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-2xl w-full max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">📊 Statistics</h3>
              <button 
                onClick={() => setShowStats(false)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-6">
              {/* Current Stats */}
              <div className="grid grid-cols-3 gap-4">
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">{sessionsToday}</div>
                  <div className="text-sm opacity-80">Sessions Today</div>
                </div>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">{formatFocusTime(totalFocusTime)}</div>
                  <div className="text-sm opacity-80">Total Focus Time</div>
                </div>
                <div className="text-white text-center">
                  <div className="text-2xl font-bold">{completedTasks}</div>
                  <div className="text-sm opacity-80">Tasks Completed</div>
                </div>
              </div>

              {/* Charts */}
              <SimpleChart dailyStats={dailyStats} />
            </div>
          </div>
        </div>
      )}

      {/* Settings Modal */}
      {showSettings && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-40 flex items-center justify-center p-4">
          <div className="bg-white/10 backdrop-blur-sm rounded-xl p-6 border border-white/20 max-w-md w-full">
            <div className="flex justify-between items-center mb-4">
              <h3 className="text-xl font-bold text-white">⚙️ Settings</h3>
              <button 
                onClick={() => setShowSettings(false)}
                className="text-white/70 hover:text-white"
              >
                ✕
              </button>
            </div>
            <div className="space-y-4">
              <div className="flex justify-between items-center">
                <span className="text-white">🌲 Forest Sounds</span>
                <button 
                  onClick={() => setSoundEnabled(!soundEnabled)}
                  className={`px-3 py-1 rounded-full transition-colors ${soundEnabled ? 'bg-green-500/30 text-green-400' : 'bg-red-500/30 text-red-400'}`}
                >
                  {soundEnabled ? 'On' : 'Off'}
                </button>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">🧙‍♀️ Witch Movement</span>
                <span className="text-white/70">Automatic</span>
              </div>
              <div className="flex justify-between items-center">
                <span className="text-white">⏰ Default Duration</span>
                <span className="text-white/70">25 minutes</span>
              </div>
              <div className="text-center pt-4">
                <div className="text-white/70 text-sm">
                  🧙‍♀️ Studying Witch v1.0
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Forest Sounds - Controlled by navigation button */}
      <ForestSounds autoPlay={true} soundEnabled={soundEnabled} />
    </div>
  );
}