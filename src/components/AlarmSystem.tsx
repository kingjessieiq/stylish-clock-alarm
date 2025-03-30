
import React from 'react';
import IntervalAlarm from './IntervalAlarm';
import TimeAlarm from './TimeAlarm';
import AlarmList from './AlarmList';
import useAlarm from '@/hooks/useAlarm';
import { Bell } from 'lucide-react';

const AlarmSystem: React.FC = () => {
  const {
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
  } = useAlarm();
  
  return (
    <div className="h-full rounded-3xl p-6 bg-gradient-to-br from-fuchsia-500 via-purple-600 to-indigo-500 shadow-[0_0_25px_rgba(217,70,239,0.5)] border-2 border-white/20 backdrop-blur-xl">
      <div className="flex items-center justify-center mb-6">
        <Bell className="w-8 h-8 text-yellow-300 mr-3" />
        <h2 className="text-3xl font-bold text-white font-orbitron tracking-wider">Super Alarms</h2>
      </div>
      
      <div className="space-y-6">
        <IntervalAlarm
          alarms={intervalAlarms}
          onAdd={addIntervalAlarm}
          onToggle={toggleIntervalAlarm}
          onDelete={deleteIntervalAlarm}
        />
        
        <TimeAlarm
          alarms={timeAlarms}
          onAdd={addTimeAlarm}
          onToggle={toggleTimeAlarm}
          onDelete={deleteTimeAlarm}
        />
      </div>
      
      <AlarmList
        activeAlarm={activeAlarm}
        onStopAlarm={stopAlarm}
      />
    </div>
  );
};

export default AlarmSystem;
