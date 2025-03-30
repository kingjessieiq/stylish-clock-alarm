
import React from 'react';
import Clock from '@/components/Clock';
import Calendar from '@/components/Calendar';
import AlarmSystem from '@/components/AlarmSystem';

const Index = () => {
  return (
    <div className="min-h-screen py-8 px-4 bg-gradient-to-br from-indigo-600 via-purple-600 to-pink-500">
      <div className="max-w-6xl mx-auto grid grid-cols-1 md:grid-cols-2 gap-8">
        <div className="space-y-6">
          <Clock />
          <Calendar />
        </div>
        <div>
          <AlarmSystem />
        </div>
      </div>
    </div>
  );
};

export default Index;
