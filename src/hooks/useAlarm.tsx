
import { useState, useEffect, useCallback, useRef } from 'react';
import { IntervalAlarm, TimeAlarm, checkIntervalAlarm, checkTimeAlarm, generateId, ALARM_SOUNDS } from '../utils/alarmUtils';
import { toast } from '@/hooks/use-toast';

export const useAlarm = () => {
  const [intervalAlarms, setIntervalAlarms] = useState<IntervalAlarm[]>([]);
  const [timeAlarms, setTimeAlarms] = useState<TimeAlarm[]>([]);
  const [activeAlarm, setActiveAlarm] = useState<IntervalAlarm | TimeAlarm | null>(null);
  const audioRef = useRef<HTMLAudioElement | null>(null);
  const intervalRef = useRef<NodeJS.Timeout | null>(null);

  // Initialize audio element
  useEffect(() => {
    audioRef.current = new Audio();
    audioRef.current.loop = true;
    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, []);

  // Load alarms from localStorage
  useEffect(() => {
    const savedIntervalAlarms = localStorage.getItem('intervalAlarms');
    const savedTimeAlarms = localStorage.getItem('timeAlarms');
    
    if (savedIntervalAlarms) {
      try {
        const parsed = JSON.parse(savedIntervalAlarms);
        setIntervalAlarms(parsed.map((alarm: any) => ({
          ...alarm,
          lastTriggered: alarm.lastTriggered ? new Date(alarm.lastTriggered) : null
        })));
      } catch (error) {
        console.error('Failed to parse interval alarms:', error);
      }
    }
    
    if (savedTimeAlarms) {
      try {
        const parsed = JSON.parse(savedTimeAlarms);
        setTimeAlarms(parsed.map((alarm: any) => ({
          ...alarm,
          time: new Date(alarm.time)
        })));
      } catch (error) {
        console.error('Failed to parse time alarms:', error);
      }
    }
  }, []);

  // Save alarms to localStorage
  useEffect(() => {
    localStorage.setItem('intervalAlarms', JSON.stringify(intervalAlarms));
  }, [intervalAlarms]);
  
  useEffect(() => {
    localStorage.setItem('timeAlarms', JSON.stringify(timeAlarms));
  }, [timeAlarms]);

  // Check alarms every second
  useEffect(() => {
    const checkAlarms = () => {
      const now = new Date();
      
      // Check interval alarms
      intervalAlarms.forEach(alarm => {
        if (checkIntervalAlarm(alarm, now)) {
          triggerAlarm(alarm);
          // Update last triggered time
          setIntervalAlarms(prevAlarms => 
            prevAlarms.map(a => 
              a.id === alarm.id 
                ? { ...a, lastTriggered: new Date() } 
                : a
            )
          );
        }
      });
      
      // Check time alarms
      timeAlarms.forEach(alarm => {
        if (checkTimeAlarm(alarm, now)) {
          triggerAlarm(alarm);
        }
      });
    };
    
    intervalRef.current = setInterval(checkAlarms, 1000);
    return () => {
      if (intervalRef.current) {
        clearInterval(intervalRef.current);
      }
    };
  }, [intervalAlarms, timeAlarms]);

  const triggerAlarm = useCallback((alarm: IntervalAlarm | TimeAlarm) => {
    if (activeAlarm) return; // Don't trigger if an alarm is already active
    
    const sound = ALARM_SOUNDS.find(s => s.id === alarm.sound) || ALARM_SOUNDS[0];
    
    if (audioRef.current) {
      audioRef.current.src = sound.path;
      audioRef.current.play().catch(error => {
        console.error('Failed to play alarm sound:', error);
      });
    }
    
    setActiveAlarm(alarm);
    
    // Show toast notification
    toast({
      title: 'Alarm!',
      description: alarm.label || (
        'interval' in alarm 
          ? `Interval Alarm (${alarm.hours}h ${alarm.minutes}m)` 
          : `Time Alarm (${alarm.time.toLocaleTimeString()})`
      ),
      variant: 'destructive',
      duration: 60000, // Long duration
    });
  }, [activeAlarm]);

  const stopAlarm = useCallback(() => {
    if (audioRef.current) {
      audioRef.current.pause();
      audioRef.current.currentTime = 0;
    }
    setActiveAlarm(null);
  }, []);

  const addIntervalAlarm = useCallback((hours: number, minutes: number, sound: string, label: string) => {
    const newAlarm: IntervalAlarm = {
      id: generateId(),
      hours,
      minutes,
      enabled: true,
      lastTriggered: new Date(),
      sound,
      label
    };
    
    setIntervalAlarms(prevAlarms => [...prevAlarms, newAlarm]);
    return newAlarm;
  }, []);

  const addTimeAlarm = useCallback((time: Date, days: number[], sound: string, label: string) => {
    const newAlarm: TimeAlarm = {
      id: generateId(),
      time,
      enabled: true,
      days,
      sound,
      label
    };
    
    setTimeAlarms(prevAlarms => [...prevAlarms, newAlarm]);
    return newAlarm;
  }, []);

  const toggleIntervalAlarm = useCallback((id: string) => {
    setIntervalAlarms(prevAlarms => 
      prevAlarms.map(alarm => 
        alarm.id === id 
          ? { ...alarm, enabled: !alarm.enabled } 
          : alarm
      )
    );
  }, []);

  const toggleTimeAlarm = useCallback((id: string) => {
    setTimeAlarms(prevAlarms => 
      prevAlarms.map(alarm => 
        alarm.id === id 
          ? { ...alarm, enabled: !alarm.enabled } 
          : alarm
      )
    );
  }, []);

  const deleteIntervalAlarm = useCallback((id: string) => {
    setIntervalAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== id));
  }, []);

  const deleteTimeAlarm = useCallback((id: string) => {
    setTimeAlarms(prevAlarms => prevAlarms.filter(alarm => alarm.id !== id));
  }, []);

  return {
    intervalAlarms,
    timeAlarms,
    activeAlarm,
    addIntervalAlarm,
    addTimeAlarm,
    toggleIntervalAlarm,
    toggleTimeAlarm,
    deleteIntervalAlarm,
    deleteTimeAlarm,
    stopAlarm
  };
};

export default useAlarm;
