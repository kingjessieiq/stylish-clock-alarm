
import React, { useState, useEffect } from 'react';
import { getMonth, getYear, createCalendarDays } from '@/utils/timeUtils';
import { ChevronLeft, ChevronRight, Calendar as CalendarIcon } from 'lucide-react';

const Calendar: React.FC = () => {
  const [currentDate, setCurrentDate] = useState(new Date());
  const [calendarMonth, setCalendarMonth] = useState(currentDate.getMonth());
  const [calendarYear, setCalendarYear] = useState(currentDate.getFullYear());
  const [calendarDays, setCalendarDays] = useState(createCalendarDays(calendarYear, calendarMonth));
  
  useEffect(() => {
    // Update days when month or year changes
    setCalendarDays(createCalendarDays(calendarYear, calendarMonth));
  }, [calendarMonth, calendarYear]);
  
  const goToPreviousMonth = () => {
    setCalendarMonth(prev => {
      if (prev === 0) {
        setCalendarYear(y => y - 1);
        return 11;
      }
      return prev - 1;
    });
  };
  
  const goToNextMonth = () => {
    setCalendarMonth(prev => {
      if (prev === 11) {
        setCalendarYear(y => y + 1);
        return 0;
      }
      return prev + 1;
    });
  };
  
  // Days of week
  const weekdays = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  
  // Check if a calendar day is today
  const isToday = (date: number): boolean => {
    const today = new Date();
    return (
      date === today.getDate() &&
      calendarMonth === today.getMonth() &&
      calendarYear === today.getFullYear()
    );
  };
  
  return (
    <div className="rounded-3xl p-6 bg-[#f0f0f0] shadow-[0_0_25px_rgba(0,0,0,0.1)] border-2 border-white/20 backdrop-blur-xl animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <CalendarIcon className="w-6 h-6 mr-2 text-[#ffd700]" />
          <h3 className="text-2xl font-bold text-[#333] font-orbitron">Calendar</h3>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={goToPreviousMonth}
            className="p-2 rounded-full bg-[#4c49ca]/20 hover:bg-[#4c49ca]/30 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-[#4c49ca]" />
          </button>
          <span className="text-[#333] font-bold text-lg">
            {getMonth(new Date(calendarYear, calendarMonth))} {calendarYear}
          </span>
          <button 
            onClick={goToNextMonth}
            className="p-2 rounded-full bg-[#4c49ca]/20 hover:bg-[#4c49ca]/30 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-[#4c49ca]" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center text-sm font-bold text-[#4c49ca] py-2">
            {day}
          </div>
        ))}
      </div>
      
      <div className="grid grid-cols-7 gap-1">
        {calendarDays.map((day, index) => (
          <div 
            key={index}
            className={`
              text-center py-2 text-sm rounded-md transition-colors
              ${day.currentMonth ? 'text-[#333]' : 'text-[#333]/40'}
              ${isToday(day.date) 
                ? 'bg-[#4c49ca] text-white font-bold' 
                : 'hover:bg-[#4c49ca]/10'}
            `}
          >
            {day.date}
          </div>
        ))}
      </div>
    </div>
  );
};

export default Calendar;
