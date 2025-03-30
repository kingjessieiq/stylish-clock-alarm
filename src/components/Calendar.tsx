
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
    <div className="clock-card mt-4 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <CalendarIcon className="w-5 h-5 mr-2 text-clock-accent" />
          <h3 className="text-lg font-semibold text-clock-text">Calendar</h3>
        </div>
        <div className="flex items-center space-x-4">
          <button 
            onClick={goToPreviousMonth}
            className="p-1 rounded-full hover:bg-muted/40 transition-colors"
            aria-label="Previous month"
          >
            <ChevronLeft className="w-5 h-5 text-clock-secondary" />
          </button>
          <span className="text-clock-text font-medium">
            {getMonth(new Date(calendarYear, calendarMonth))} {calendarYear}
          </span>
          <button 
            onClick={goToNextMonth}
            className="p-1 rounded-full hover:bg-muted/40 transition-colors"
            aria-label="Next month"
          >
            <ChevronRight className="w-5 h-5 text-clock-secondary" />
          </button>
        </div>
      </div>
      
      <div className="grid grid-cols-7 gap-1 mb-2">
        {weekdays.map(day => (
          <div key={day} className="text-center text-xs font-medium text-clock-secondary py-2">
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
              ${day.currentMonth ? 'text-clock-text' : 'text-clock-secondary/40'}
              ${isToday(day.date) ? 'bg-clock-accent/20 font-bold' : ''}
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
