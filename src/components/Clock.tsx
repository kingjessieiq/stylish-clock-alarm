
import React, { useState, useEffect } from 'react';
import { formatTime, getWeekday, getMonth, getDay, getYear } from '@/utils/timeUtils';
import { AlarmClock } from 'lucide-react';

const Clock: React.FC = () => {
  const [currentTime, setCurrentTime] = useState(new Date());
  
  useEffect(() => {
    const timer = setInterval(() => {
      setCurrentTime(new Date());
    }, 1000);
    
    return () => {
      clearInterval(timer);
    };
  }, []);
  
  const weekday = getWeekday(currentTime);
  const day = getDay(currentTime);
  const month = getMonth(currentTime);
  const year = getYear(currentTime);
  const time = formatTime(currentTime);
  
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  
  return (
    <div className="clock-card animate-fade-in">
      <div className="flex flex-col items-center space-y-4 py-4">
        <div className="flex items-center mb-2">
          <AlarmClock className="w-8 h-8 mr-2 text-clock-accent" />
          <h2 className="text-2xl font-semibold text-clock-text font-orbitron clock-gradient">COOL CLOCK</h2>
        </div>
        
        <div className="clock-display text-6xl md:text-7xl font-bold animate-pulse-scale">
          {hours.toString().padStart(2, '0')}
          <span className={`${seconds % 2 === 0 ? 'opacity-100' : 'opacity-40'} mx-2`}>:</span>
          {minutes.toString().padStart(2, '0')}
          <span className={`${seconds % 2 === 0 ? 'opacity-100' : 'opacity-40'} mx-2`}>:</span>
          {seconds.toString().padStart(2, '0')}
        </div>
        
        <div className="flex flex-col items-center text-clock-text">
          <div className="text-2xl font-medium">{weekday}</div>
          <div className="text-xl text-clock-secondary">{month} {day}, {year}</div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
