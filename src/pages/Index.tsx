
import React from 'react';
import Clock from '@/components/Clock';
import Calendar from '@/components/Calendar';
import AlarmSystem from '@/components/AlarmSystem';
import WorldTime from '@/components/WorldTime';

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-[#f8f3e9]">
      <div className="max-w-6xl mx-auto grid gap-8">
        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          <div className="space-y-6">
            <Clock />
            <Calendar />
          </div>
          <div>
            <AlarmSystem />
          </div>
        </div>
        <div>
          <WorldTime />
        </div>
      </div>
    </div>
  );
};

export default Index;
