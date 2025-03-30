
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
  
  const hours = currentTime.getHours();
  const minutes = currentTime.getMinutes();
  const seconds = currentTime.getSeconds();
  
  return (
    <div className="rounded-3xl p-6 bg-[#f0f0f0] shadow-[0_0_25px_rgba(0,0,0,0.1)] border-2 border-white/20 backdrop-blur-xl animate-fade-in">
      <div className="flex flex-col items-center space-y-6 py-4">
        <div className="flex items-center mb-2">
          <AlarmClock className="w-8 h-8 mr-3 text-[#ffd700]" />
          <h2 className="text-3xl font-bold text-[#333] font-orbitron tracking-wider">COOL CLOCK</h2>
        </div>
        
        <div className="font-orbitron text-7xl md:text-8xl font-bold animate-pulse-scale bg-gradient-to-r from-[#4c49ca] to-[#8b5cf6] bg-clip-text text-transparent">
          {hours.toString().padStart(2, '0')}
          <span className={`${seconds % 2 === 0 ? 'opacity-100' : 'opacity-40'} mx-2`}>:</span>
          {minutes.toString().padStart(2, '0')}
          <span className={`${seconds % 2 === 0 ? 'opacity-100' : 'opacity-40'} mx-2`}>:</span>
          {seconds.toString().padStart(2, '0')}
        </div>
        
        <div className="flex flex-col items-center text-[#333]">
          <div className="text-3xl font-bold">{weekday}</div>
          <div className="text-2xl text-[#4c49ca] font-medium">{month} {day}, {year}</div>
        </div>
      </div>
    </div>
  );
};

export default Clock;
