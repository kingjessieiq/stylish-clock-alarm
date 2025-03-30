
import React from 'react';
import IntervalAlarm from './IntervalAlarm';
import TimeAlarm from './TimeAlarm';
import AlarmList from './AlarmList';
import useAlarm from '@/hooks/useAlarm';

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
    <>
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
      
      <AlarmList
        activeAlarm={activeAlarm}
        onStopAlarm={stopAlarm}
      />
    </>
  );
};

export default AlarmSystem;
