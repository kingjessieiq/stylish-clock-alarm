
import React from 'react';
import { Bell, BellOff } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { IntervalAlarm, TimeAlarm } from '@/utils/alarmUtils';

interface AlarmListProps {
  activeAlarm: IntervalAlarm | TimeAlarm | null;
  onStopAlarm: () => void;
}

const AlarmList: React.FC<AlarmListProps> = ({ activeAlarm, onStopAlarm }) => {
  if (!activeAlarm) return null;
  
  return (
    <div className="fixed inset-0 bg-black/70 backdrop-blur-sm flex items-center justify-center z-50 p-4">
      <div className="bg-clock-card max-w-md w-full rounded-xl p-6 shadow-lg animate-alarm-ring">
        <div className="flex flex-col items-center space-y-4">
          <Bell className="w-16 h-16 text-destructive animate-pulse" />
          <h2 className="text-3xl font-bold text-white">Alarm!</h2>
          
          <div className="text-xl text-center mb-2">
            {'hours' in activeAlarm 
              ? `Interval Alarm: Every ${activeAlarm.hours > 0 ? `${activeAlarm.hours}h ` : ''}${activeAlarm.minutes > 0 ? `${activeAlarm.minutes}m` : ''}`
              : `Time Alarm: ${activeAlarm.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
            }
          </div>
          
          {activeAlarm.label && (
            <div className="text-lg text-clock-secondary">
              {activeAlarm.label}
            </div>
          )}
          
          <Button 
            className="mt-6 w-full bg-destructive hover:bg-destructive/90 text-lg py-6"
            onClick={onStopAlarm}
          >
            <BellOff className="w-5 h-5 mr-2" />
            Stop Alarm
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlarmList;
