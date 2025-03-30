
import React, { useState, useEffect } from 'react';
import { formatTimeWithoutSeconds } from '@/utils/timeUtils';
import { Globe, ChevronDown, ChevronUp } from 'lucide-react';

interface TimeZoneCity {
  name: string;
  timezone: string;
  emoji: string;
}

const CITIES: TimeZoneCity[] = [
  { name: 'New York', timezone: 'America/New_York', emoji: '🗽' },
  { name: 'London', timezone: 'Europe/London', emoji: '🇬🇧' },
  { name: 'Tokyo', timezone: 'Asia/Tokyo', emoji: '🇯🇵' },
  { name: 'Sydney', timezone: 'Australia/Sydney', emoji: '🇦🇺' },
  { name: 'Paris', timezone: 'Europe/Paris', emoji: '🇫🇷' },
  { name: 'Dubai', timezone: 'Asia/Dubai', emoji: '🇦🇪' },
  { name: 'Los Angeles', timezone: 'America/Los_Angeles', emoji: '🌴' },
  { name: 'Hong Kong', timezone: 'Asia/Hong_Kong', emoji: '🇭🇰' },
  { name: 'Rome', timezone: 'Europe/Rome', emoji: '🇮🇹' },
  { name: 'Berlin', timezone: 'Europe/Berlin', emoji: '🇩🇪' },
];

const WorldTime: React.FC = () => {
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState(false);
  const [visibleCities, setVisibleCities] = useState<TimeZoneCity[]>(CITIES.slice(0, 4));
  
  useEffect(() => {
    const updateTimes = () => {
      const times: Record<string, string> = {};
      
      CITIES.forEach(city => {
        const date = new Date();
        try {
          const options: Intl.DateTimeFormatOptions = { 
            timeZone: city.timezone,
            hour: '2-digit',
            minute: '2-digit',
            hour12: true
          };
          times[city.name] = new Intl.DateTimeFormat('en-US', options).format(date);
        } catch (error) {
          console.error(`Error getting time for ${city.name}:`, error);
          times[city.name] = 'Unavailable';
        }
      });
      
      setCurrentTimes(times);
    };
    
    updateTimes();
    const interval = setInterval(updateTimes, 60000); // Update every minute
    
    return () => clearInterval(interval);
  }, []);
  
  const toggleExpand = () => {
    setExpanded(!expanded);
    setVisibleCities(expanded ? CITIES.slice(0, 4) : CITIES);
  };
  
  return (
    <div className="rounded-3xl p-6 bg-[#f0f0f0] shadow-[0_0_25px_rgba(0,0,0,0.1)] border-2 border-white/20 backdrop-blur-xl">
      <div className="flex items-center mb-4">
        <Globe className="w-6 h-6 mr-2 text-[#ffd700]" />
        <h3 className="text-2xl font-bold text-[#333] font-orbitron">World Time</h3>
      </div>
      
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {visibleCities.map(city => (
          <div 
            key={city.name} 
            className="rounded-xl p-4 bg-[#4c49ca]/10 hover:bg-[#4c49ca]/20 transition-colors"
          >
            <div className="flex justify-between items-center">
              <span className="text-lg font-medium text-[#333]">
                {city.emoji} {city.name}
              </span>
              <span className="text-xl font-orbitron font-bold text-[#4c49ca]">
                {currentTimes[city.name] || '--:--'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={toggleExpand}
        className="mt-4 w-full py-2 rounded-xl bg-[#4c49ca]/20 hover:bg-[#4c49ca]/30 transition-colors text-[#4c49ca] font-medium flex items-center justify-center"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-5 h-5 mr-1" /> Show Less
          </>
        ) : (
          <>
            <ChevronDown className="w-5 h-5 mr-1" /> Show More
          </>
        )}
      </button>
    </div>
  );
};

export default WorldTime;
