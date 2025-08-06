'use client';

import React from 'react';

interface DailyStats {
  sessions: number;
  focusTime: number;
  tasks: number;
}

interface SimpleChartProps {
  dailyStats: {[key: string]: DailyStats};
}

export const SimpleChart: React.FC<SimpleChartProps> = ({ dailyStats }) => {
  // Son 7 günün verilerini al
  const last7Days = [];
  for (let i = 6; i >= 0; i--) {
    const date = new Date();
    date.setDate(date.getDate() - i);
    last7Days.push(date.toDateString());
  }

  const maxSessions = Math.max(...last7Days.map(day => dailyStats[day]?.sessions || 0), 1);
  const maxFocusTime = Math.max(...last7Days.map(day => dailyStats[day]?.focusTime || 0), 1);
  
  return (
    <div className="space-y-6">
      {/* Sessions Chart */}
      <div>
        <h4 className="text-white font-semibold mb-3">📊 Daily Sessions (Last 7 Days)</h4>
        <div className="flex items-end gap-2 h-20">
          {last7Days.map((day, index) => {
            const sessions = dailyStats[day]?.sessions || 0;
            const height = (sessions / maxSessions) * 100;
            const isToday = day === new Date().toDateString();
            
            return (
              <div key={day} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t ${isToday ? 'bg-yellow-400' : 'bg-purple-400'} transition-all duration-300`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${sessions} sessions on ${new Date(day).toLocaleDateString()}`}
                />
                <div className="text-xs text-white/70 mt-1">
                  {new Date(day).toLocaleDateString('en', { weekday: 'short' })}
                </div>
                <div className="text-xs text-white font-bold">{sessions}</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Focus Time Chart */}
      <div>
        <h4 className="text-white font-semibold mb-3">⏱️ Daily Focus Time (Minutes)</h4>
        <div className="flex items-end gap-2 h-20">
          {last7Days.map((day, index) => {
            const focusTime = dailyStats[day]?.focusTime || 0;
            const height = (focusTime / maxFocusTime) * 100;
            const isToday = day === new Date().toDateString();
            
            return (
              <div key={day} className="flex flex-col items-center flex-1">
                <div 
                  className={`w-full rounded-t ${isToday ? 'bg-green-400' : 'bg-blue-400'} transition-all duration-300`}
                  style={{ height: `${Math.max(height, 5)}%` }}
                  title={`${focusTime} minutes on ${new Date(day).toLocaleDateString()}`}
                />
                <div className="text-xs text-white/70 mt-1">
                  {new Date(day).toLocaleDateString('en', { weekday: 'short' })}
                </div>
                <div className="text-xs text-white font-bold">{focusTime}m</div>
              </div>
            );
          })}
        </div>
      </div>

      {/* Weekly Summary */}
      <div className="bg-white/5 rounded-lg p-4">
        <h4 className="text-white font-semibold mb-2">📈 Weekly Summary</h4>
        <div className="grid grid-cols-3 gap-4 text-center">
          <div>
            <div className="text-lg font-bold text-yellow-400">
              {last7Days.reduce((sum, day) => sum + (dailyStats[day]?.sessions || 0), 0)}
            </div>
            <div className="text-xs text-white/70">Total Sessions</div>
          </div>
          <div>
            <div className="text-lg font-bold text-green-400">
              {last7Days.reduce((sum, day) => sum + (dailyStats[day]?.focusTime || 0), 0)}m
            </div>
            <div className="text-xs text-white/70">Total Focus</div>
          </div>
          <div>
            <div className="text-lg font-bold text-purple-400">
              {last7Days.reduce((sum, day) => sum + (dailyStats[day]?.tasks || 0), 0)}
            </div>
            <div className="text-xs text-white/70">Total Tasks</div>
          </div>
        </div>
      </div>
    </div>
  );
};