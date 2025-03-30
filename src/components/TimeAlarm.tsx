
import React, { useState } from 'react';
import { TimeAlarm as ITimeAlarm, ALARM_SOUNDS, formatTimeAlarm, getShortDayName } from '@/utils/alarmUtils';
import { Clock, Plus, Volume2 } from 'lucide-react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Checkbox } from '@/components/ui/checkbox';

interface TimeAlarmProps {
  alarms: ITimeAlarm[];
  onAdd: (time: Date, days: number[], sound: string, label: string) => void;
  onToggle: (id: string) => void;
  onDelete: (id: string) => void;
}

const TimeAlarm: React.FC<TimeAlarmProps> = ({ alarms, onAdd, onToggle, onDelete }) => {
  const [time, setTime] = useState('12:00');
  const [selectedDays, setSelectedDays] = useState<number[]>([0, 1, 2, 3, 4, 5, 6]);
  const [sound, setSound] = useState(ALARM_SOUNDS[0].id);
  const [label, setLabel] = useState('');
  const [showForm, setShowForm] = useState(false);
  
  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    // Create a Date object from the time string
    const [hours, minutes] = time.split(':').map(Number);
    const alarmTime = new Date();
    alarmTime.setHours(hours);
    alarmTime.setMinutes(minutes);
    alarmTime.setSeconds(0);
    
    onAdd(alarmTime, selectedDays, sound, label);
    setTime('12:00');
    setSelectedDays([0, 1, 2, 3, 4, 5, 6]);
    setLabel('');
    setShowForm(false);
  };
  
  const toggleDay = (day: number) => {
    setSelectedDays(prev => 
      prev.includes(day)
        ? prev.filter(d => d !== day)
        : [...prev, day]
    );
  };
  
  const playSound = (soundId: string) => {
    const sound = ALARM_SOUNDS.find(s => s.id === soundId);
    if (!sound) return;
    
    // Create a new audio element
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
          <Clock className="w-5 h-5 mr-2 text-[#ffd700]" />
          <h3 className="text-lg font-semibold text-white">Time Alarms</h3>
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
          <div className="space-y-2 mb-4">
            <Label htmlFor="time" className="text-white">Alarm Time</Label>
            <Input
              id="time"
              type="time"
              value={time}
              onChange={(e) => setTime(e.target.value)}
              className="bg-white/10 border-white/20 text-white"
              required
            />
          </div>
          
          <div className="space-y-2 mb-4">
            <Label className="text-white">Repeat on days</Label>
            <div className="flex flex-wrap gap-2 mt-2">
              {[0, 1, 2, 3, 4, 5, 6].map(day => (
                <div key={day} className="flex items-center space-x-2">
                  <Checkbox
                    id={`day-${day}`}
                    checked={selectedDays.includes(day)}
                    onCheckedChange={() => toggleDay(day)}
                    className="data-[state=checked]:bg-[#ffd700] data-[state=checked]:text-[#4c49ca] border-white/50"
                  />
                  <Label htmlFor={`day-${day}`} className="text-sm cursor-pointer text-white">
                    {getShortDayName(day)}
                  </Label>
                </div>
              ))}
            </div>
          </div>
          
          <div className="space-y-2 mb-4">
            <Label htmlFor="label" className="text-white">Label (optional)</Label>
            <Input
              id="label"
              value={label}
              onChange={(e) => setLabel(e.target.value)}
              placeholder="E.g., School wake-up"
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
                <div className="font-medium text-white">
                  {alarm.time.toLocaleTimeString('en-US', {
                    hour: '2-digit',
                    minute: '2-digit',
                    hour12: true
                  })}
                </div>
                <div className="text-sm text-white/70">
                  {alarm.days.length === 7 ? 'Every day' : alarm.days.map(d => getShortDayName(d)).join(', ')}
                  {alarm.label && ` - ${alarm.label}`}
                </div>
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
          No time alarms set. Add one to get started!
        </div>
      )}
    </div>
  );
};

export default TimeAlarm;
