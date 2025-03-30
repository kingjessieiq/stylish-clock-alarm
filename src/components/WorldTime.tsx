
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
  { name: 'Moscow', timezone: 'Europe/Moscow', emoji: '🇷🇺' },
  { name: 'Singapore', timezone: 'Asia/Singapore', emoji: '🇸🇬' },
  { name: 'Cairo', timezone: 'Africa/Cairo', emoji: '🇪🇬' },
  { name: 'Rio de Janeiro', timezone: 'America/Sao_Paulo', emoji: '🇧🇷' },
  { name: 'Mexico City', timezone: 'America/Mexico_City', emoji: '🇲🇽' },
  { name: 'Toronto', timezone: 'America/Toronto', emoji: '🇨🇦' },
];

const WorldTime: React.FC = () => {
  const [currentTimes, setCurrentTimes] = useState<Record<string, string>>({});
  const [expanded, setExpanded] = useState(false);
  const [visibleCities, setVisibleCities] = useState<TimeZoneCity[]>(CITIES.slice(0, 8));
  
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
    setVisibleCities(expanded ? CITIES.slice(0, 8) : CITIES);
  };
  
  return (
    <div className="rounded-3xl p-6 bg-[#4c49ca] shadow-[0_0_25px_rgba(76,73,202,0.5)] border-2 border-white/20 backdrop-blur-xl">
      <div className="flex items-center mb-6">
        <Globe className="w-8 h-8 text-[#ffd700] mr-3" />
        <h3 className="text-3xl font-bold text-white font-orbitron tracking-wider">World Clock</h3>
      </div>
      
      <div className="grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 gap-4">
        {visibleCities.map(city => (
          <div 
            key={city.name} 
            className="rounded-xl p-4 bg-white/10 hover:bg-white/20 transition-colors"
          >
            <div className="flex flex-col items-center text-center">
              <span className="text-2xl mb-1">{city.emoji}</span>
              <span className="text-lg font-medium text-white mb-1">
                {city.name}
              </span>
              <span className="text-xl font-orbitron font-bold text-[#ffd700]">
                {currentTimes[city.name] || '--:--'}
              </span>
            </div>
          </div>
        ))}
      </div>
      
      <button 
        onClick={toggleExpand}
        className="mt-6 w-full py-3 rounded-xl bg-white/10 hover:bg-white/20 transition-colors text-white font-medium flex items-center justify-center"
      >
        {expanded ? (
          <>
            <ChevronUp className="w-5 h-5 mr-2 text-[#ffd700]" /> Show Less Cities
          </>
        ) : (
          <>
            <ChevronDown className="w-5 h-5 mr-2 text-[#ffd700]" /> Show More Cities
          </>
        )}
      </button>
    </div>
  );
};

export default WorldTime;
