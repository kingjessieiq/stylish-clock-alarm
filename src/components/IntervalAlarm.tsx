
import React, { useState } from 'react';
import { IntervalAlarm as IIntervalAlarm, ALARM_SOUNDS, formatIntervalAlarm } from '@/utils/alarmUtils';
import { TimerReset, Plus, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';

interface IntervalAlarmProps {
  alarms: IIntervalAlarm[];
  onAdd: (hours: number, minutes: number, sound: string, label: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const IntervalAlarm: React.FC<IntervalAlarmProps> = ({ alarms, onAdd, onToggle, onDelete }) => {
  const [hours, setHours] = useState<number>(0);
  const [minutes, setMinutes] = useState<number>(0);
  const [sound, setSound] = useState(ALARM_SOUNDS[0].id);
  const [label, setLabel] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (hours <= 0 && minutes <= 0) return;
    
    onAdd(hours, minutes, sound, label);
    setHours(0);
    setMinutes(0);
    setLabel('');
    setShowForm(false);
  };
  
  const handleHoursChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setHours(isNaN(value) ? 0 : Math.max(0, value));
  };
  
  const handleMinutesChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = parseInt(e.target.value);
    setMinutes(isNaN(value) ? 0 : Math.max(0, Math.min(59, value)));
  };
  
  const playSound = (soundId: string) => {
    const sound = ALARM_SOUNDS.find(s => s.id === soundId);
    if (!sound) return;
    
    // Stop any currently playing sound
    const audio = new Audio(sound.path);
    audio.volume = 0.5;
    audio.play();
    
    // Stop after 2 seconds
    setTimeout(() => {
      audio.pause();
      audio.currentTime = 0;
    }, 2000);
  };
  
  return (
    <div className="bg-white/10 rounded-xl p-4 animate-slide-up">
      <div className="flex justify-between items-center mb-4">
        <div className="flex items-center">
          <TimerReset className="w-5 h-5 mr-2 text-[#ffd700]" />
          <h3 className="text-lg font-semibold text-white">Interval Alarms</h3>
        </div>
        <Button
          variant="outline"
          size="sm"
          onClick={() => setShowForm(!showForm)}
          className="text-[#ffd700] border-[#ffd700] bg-transparent hover:bg-white/10"
        >
          <Plus className="w-4 h-4 mr-1" />
          Add Alarm
        </Button>
      </div>
      
      {showForm && (
        <form onSubmit={handleSubmit} className="mb-6 p-4 bg-white/5 rounded-lg animate-fade-in">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4 mb-4">
            <div className="space-y-2">
              <Label htmlFor="hours" className="text-white">Hours</Label>
              <Input
                id="hours"
                type="number"
                min="0"
                value={hours}
                onChange={handleHoursChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="minutes" className="text-white">Minutes</Label>
              <Input
                id="minutes"
                type="number"
                min="0"
                max="59"
                value={minutes}
                onChange={handleMinutesChange}
                className="bg-white/10 border-white/20 text-white"
              />
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="label" className="text-white">Label (optional)</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="E.g., Homework reminder"
              className="bg-white/10 border-white/20 text-white"
            />
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="sound" className="text-white">Alarm Sound</Label>
            <div className="flex gap-2">
              <Select value={sound} onValueChange={setSound}>
                <SelectTrigger className="bg-white/10 border-white/20 text-white flex-grow">
                  <SelectValue placeholder="Select a sound" />
                </SelectTrigger>
                <SelectContent>
                  {ALARM_SOUNDS.map((s) => (
                    <SelectItem key={s.id} value={s.id}>
                      {s.name}
                    </SelectItem>
                  ))}
                </SelectContent>
              </Select>
              <Button
                type="button"
                variant="outline"
                size="icon"
                onClick={() => playSound(sound)}
                className="shrink-0 border-white/20 bg-white/10 text-white hover:bg-white/20"
              >
                <Volume2 className="h-4 w-4" />
              </Button>
            </div>
          </div>
          
          <div className="flex justify-end space-x-2">
            <Button
              type="button"
              variant="outline"
              onClick={() => setShowForm(false)}
              className="border-white/20 bg-white/10 text-white hover:bg-white/20"
            >
              Cancel
            </Button>
            <Button 
              type="submit"
              disabled={hours <= 0 && minutes <= 0}
              className="bg-[#ffd700] text-[#4c49ca] hover:bg-[#ffd700]/80"
            >
              Save Alarm
            </Button>
          </div>
        </form>
      )}
      
      {alarms.length > 0 ? (
        <div className="space-y-2 mt-2">
          {alarms.map(alarm => (
            <div
              key={alarm.id}
              className={`p-3 rounded-lg flex justify-between items-center transition-colors ${
                alarm.enabled ? 'bg-white/20' : 'bg-white/5 opacity-60'
              }`}
            >
              <div>
                <div className="font-medium text-white">{formatIntervalAlarm(alarm)}</div>
                {alarm.label && <div className="text-sm text-white/70">{alarm.label}</div>}
              </div>
              <div className="flex items-center space-x-2">
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onToggle(alarm.id)}
                  className={alarm.enabled ? 'text-[#ffd700]' : 'text-white/50 hover:text-white'}
                >
                  {alarm.enabled ? 'Disable' : 'Enable'}
                </Button>
                <Button
                  variant="ghost"
                  size="sm"
                  onClick={() => onDelete(alarm.id)}
                  className="text-red-400 hover:text-red-300 hover:bg-red-500/20"
                >
                  Delete
                </Button>
              </div>
            </div>
          ))}
        </div>
      ) : (
        <div className="text-center py-8 text-white/70">
          No interval alarms set. Add one to get started!
        </div>
      )}
    </div>
  );
};

export default IntervalAlarm;
