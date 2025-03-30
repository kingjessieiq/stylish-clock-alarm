
export type IntervalAlarm = {
  id: string;
  hours: number;
  minutes: number;
  enabled: boolean;
  lastTriggered: Date | null;
  sound: string;
  label: string;
};

export type TimeAlarm = {
  id: string;
  time: Date;
  enabled: boolean;
  days: number[]; // 0-6 (Sunday to Saturday)
  sound: string;
  label: string;
};

export const ALARM_SOUNDS = [
  { id: 'alarm1', name: 'Digital Alarm', path: 'https://assets.mixkit.co/active_storage/sfx/212/212-preview.mp3' },
  { id: 'alarm2', name: 'School Bell', path: 'https://assets.mixkit.co/active_storage/sfx/2869/2869-preview.mp3' },
  { id: 'alarm3', name: 'Emergency Siren', path: 'https://assets.mixkit.co/active_storage/sfx/209/209-preview.mp3' },
  { id: 'alarm4', name: 'Police Siren', path: 'https://assets.mixkit.co/active_storage/sfx/1667/1667-preview.mp3' },
  { id: 'alarm5', name: 'Fire Alarm', path: 'https://assets.mixkit.co/active_storage/sfx/2865/2865-preview.mp3' },
];

export const generateId = (): string => {
  return Math.random().toString(36).substring(2, 9);
};

export const checkTimeAlarm = (alarm: TimeAlarm, currentTime: Date): boolean => {
  if (!alarm.enabled) return false;
  
  const now = new Date();
  const alarmTime = new Date(alarm.time);
  
  // Check if the current day is included in the alarm days
  const currentDay = now.getDay();
  if (!alarm.days.includes(currentDay)) return false;
  
  // Check if the current time matches the alarm time (ignoring seconds)
  const currentHours = now.getHours();
  const currentMinutes = now.getMinutes();
  const alarmHours = alarmTime.getHours();
  const alarmMinutes = alarmTime.getMinutes();
  
  return currentHours === alarmHours && currentMinutes === alarmMinutes && now.getSeconds() < 10;
};

export const checkIntervalAlarm = (alarm: IntervalAlarm, currentTime: Date): boolean => {
  if (!alarm.enabled || !alarm.lastTriggered) return false;
  
  const totalMinutes = (alarm.hours * 60) + alarm.minutes;
  if (totalMinutes <= 0) return false;
  
  const now = currentTime.getTime();
  const lastTriggered = alarm.lastTriggered.getTime();
  const elapsedMinutes = (now - lastTriggered) / (1000 * 60);
  
  return elapsedMinutes >= totalMinutes;
};

export const formatIntervalAlarm = (alarm: IntervalAlarm): string => {
  const hours = alarm.hours > 0 ? `${alarm.hours} hour${alarm.hours !== 1 ? 's' : ''}` : '';
  const minutes = alarm.minutes > 0 ? `${alarm.minutes} minute${alarm.minutes !== 1 ? 's' : ''}` : '';
  
  if (hours && minutes) {
    return `Every ${hours} and ${minutes}`;
  } else if (hours) {
    return `Every ${hours}`;
  } else if (minutes) {
    return `Every ${minutes}`;
  } else {
    return 'Invalid interval';
  }
};

export const formatTimeAlarm = (alarm: TimeAlarm): string => {
  const time = alarm.time.toLocaleTimeString('en-US', {
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
  
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  const selectedDays = alarm.days.map(day => days[day]).join(', ');
  
  return `${time}${selectedDays ? ` (${selectedDays})` : ''}`;
};

export const getDayName = (dayIndex: number): string => {
  const days = ['Sunday', 'Monday', 'Tuesday', 'Wednesday', 'Thursday', 'Friday', 'Saturday'];
  return days[dayIndex] || '';
};

export const getShortDayName = (dayIndex: number): string => {
  const days = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
  return days[dayIndex] || '';
};
