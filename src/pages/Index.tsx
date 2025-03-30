
import React from 'react';
import Clock from '@/components/Clock';
import Calendar from '@/components/Calendar';
import AlarmSystem from '@/components/AlarmSystem';

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4">
      <div className="max-w-2xl mx-auto space-y-6">
        <Clock />
        <Calendar />
        <AlarmSystem />
      </div>
    </div>
  );
};

export default Index;
