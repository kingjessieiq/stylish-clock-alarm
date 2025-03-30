
export const formatTime = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    second: '2-digit',
    hour12: true
  });
};

export const formatTimeWithoutSeconds = (date: Date): string => {
  return date.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
};

export const getWeekday = (date: Date): string => {
  return date.toLocaleDateString('en-US', { weekday: 'long' });
};

export const getMonth = (date: Date): string => {
  return date.toLocaleDateString('en-US', { month: 'long' });
};

export const getDay = (date: Date): string => {
  return date.toLocaleDateString('en-US', { day: 'numeric' });
};

export const getYear = (date: Date): string => {
  return date.toLocaleDateString('en-US', { year: 'numeric' });
};

export const formatDate = (date: Date): string => {
  return date.toLocaleDateString('en-US', {
    month: 'long',
    day: 'numeric',
    year: 'numeric'
  });
};

export const getDaysInMonth = (year: number, month: number): number => {
  return new Date(year, month + 1, 0).getDate();
};

export const getFirstDayOfMonth = (year: number, month: number): number => {
  return new Date(year, month, 1).getDay();
};

export const createCalendarDays = (year: number, month: number): Array<{ date: number; currentMonth: boolean }> => {
  const daysInMonth = getDaysInMonth(year, month);
  const firstDayOfMonth = getFirstDayOfMonth(year, month);
  const daysInPrevMonth = month === 0 ? getDaysInMonth(year - 1, 11) : getDaysInMonth(year, month - 1);
  
  const days: Array<{ date: number; currentMonth: boolean }> = [];
  
  // Add days from previous month
  for (let i = firstDayOfMonth - 1; i >= 0; i--) {
    days.push({ date: daysInPrevMonth - i, currentMonth: false });
  }
  
  // Add days from current month
  for (let i = 1; i <= daysInMonth; i++) {
    days.push({ date: i, currentMonth: true });
  }
  
  // Add days from next month to complete the grid (6 rows x 7 columns = 42 cells)
  const remainingDays = 42 - days.length;
  for (let i = 1; i <= remainingDays; i++) {
    days.push({ date: i, currentMonth: false });
  }
  
  return days;
};
