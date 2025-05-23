
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
      <div className="max-w-md w-full rounded-xl p-6 shadow-[0_0_40px_rgba(76,73,202,0.8)] animate-alarm-ring bg-[#4c49ca] border-2 border-white/30">
        <div className="flex flex-col items-center space-y-6">
          <Bell className="w-24 h-24 text-[#ffd700] animate-pulse" />
          <h2 className="text-4xl font-bold text-white font-orbitron tracking-wider">WAKE UP!</h2>
          
          <div className="text-2xl text-center mb-2 text-white">
            {'hours' in activeAlarm 
              ? `Interval Alarm: Every ${activeAlarm.hours > 0 ? `${activeAlarm.hours}h ` : ''}${activeAlarm.minutes > 0 ? `${activeAlarm.minutes}m` : ''}`
              : `Time Alarm: ${activeAlarm.time.toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}`
            }
          </div>
          
          {activeAlarm.label && (
            <div className="text-xl text-[#ffd700] font-medium">
              {activeAlarm.label}
            </div>
          )}
          
          <Button 
            className="mt-6 w-full hover:bg-red-500 text-xl py-8 bg-gradient-to-r from-red-500 to-pink-600 border-2 border-white/20 shadow-lg"
            onClick={onStopAlarm}
          >
            <BellOff className="w-6 h-6 mr-2" />
            STOP ALARM
          </Button>
        </div>
      </div>
    </div>
  );
};

export default AlarmList;
