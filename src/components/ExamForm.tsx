import React, { useState, useRef, useEffect } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CalendarDays, MapPin, AlignLeft, BookOpen, Clock } from 'lucide-react';
import { format } from 'date-fns';
import { Card, CardContent, CardHeader, CardTitle } from './retroui/Card';
import { Input } from './retroui/Input';
import { Label } from './retroui/Label';
import { Button } from './retroui/Button';
import { Calendar } from './retroui/Calendar';
import type { Exam } from '../types';

interface ExamFormProps {
  onAdd: (exam: Exam) => void;
}

const COLORS = [
  'bg-primary', 
  'bg-accent', 
  'bg-[#4ade80]', 
  'bg-[#60a5fa]', 
  'bg-[#c084fc]'
];

export function ExamForm({ onAdd }: ExamFormProps) {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [date, setDate] = useState<Date>();
  const [showCalendar, setShowCalendar] = useState(false);
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');
  
  const calendarRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    function handleClickOutside(event: MouseEvent) {
      if (calendarRef.current && !calendarRef.current.contains(event.target as Node)) {
        setShowCalendar(false);
      }
    }
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName || !date || !startTime || !endTime || !location) return;

    const formattedDate = format(date, 'yyyy-MM-dd');

    const newExam: Exam = {
      id: uuidv4(),
      courseName,
      courseCode,
      date: formattedDate,
      startTime,
      endTime,
      location,
      notes,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    onAdd(newExam);

    setCourseName('');
    setCourseCode('');
    setDate(undefined);
    setStartTime('');
    setEndTime('');
    setLocation('');
    setNotes('');
  };

  return (
    <Card className="rounded-none w-full border-2 border-border shadow-sm">
      <CardHeader className="bg-primary border-b-2 border-border p-4">
        <CardTitle className="text-primary-foreground font-head tracking-tight uppercase flex items-center gap-2">
          <BookOpen className="w-5 h-5 shrink-0" /> Schedule Exam
        </CardTitle>
      </CardHeader>
      
      <CardContent className="p-4 md:p-6 bg-card">
        <form onSubmit={handleSubmit} className="flex flex-col gap-6">
          <div className="space-y-4">
            <div className="space-y-2">
              <Label className="uppercase text-xs font-bold tracking-wider">Course Info *</Label>
              <div className="flex flex-col sm:flex-row gap-3">
                <Input 
                  placeholder="Course Name" 
                  value={courseName}
                  onChange={(e) => setCourseName(e.target.value)}
                  className="flex-1 rounded-none border-2 border-border shadow-xs"
                  required
                />
                <Input 
                  placeholder="Code (Optional)" 
                  value={courseCode}
                  onChange={(e) => setCourseCode(e.target.value)}
                  className="w-full sm:w-32 rounded-none border-2 border-border shadow-xs"
                />
              </div>
            </div>

            <div className="space-y-2 relative" ref={calendarRef}>
              <Label className="uppercase text-xs font-bold tracking-wider flex items-center gap-1">
                <CalendarDays className="w-3 h-3" /> Date *
              </Label>
              <Button
                type="button"
                variant="outline"
                className={`w-full justify-start text-left font-sans rounded-none border-2 border-border shadow-xs ${!date ? "text-muted-foreground" : ""}`}
                onClick={() => setShowCalendar(!showCalendar)}
              >
                <CalendarDays className="mr-2 h-4 w-4" />
                {date ? format(date, 'PPP') : "Pick a date"}
              </Button>
              {showCalendar && (
                <div className="absolute top-full left-0 z-50 mt-2 bg-background border-2 border-border shadow-sm p-3 block">
                  <Calendar
                    mode="single"
                    selected={date}
                    onSelect={(d) => { setDate(d); setShowCalendar(false); }}
                    initialFocus
                  />
                </div>
              )}
            </div>

            <div className="space-y-2">
              <Label className="uppercase text-xs font-bold tracking-wider flex items-center gap-1">
                <Clock className="w-3 h-3" /> Time *
              </Label>
              <div className="flex items-center gap-2">
                <Input 
                  type="time" 
                  value={startTime}
                  onChange={(e) => setStartTime(e.target.value)}
                  className="w-full rounded-none border-2 border-border shadow-xs font-sans"
                  required
                />
                <span className="font-head font-bold uppercase text-muted-foreground">To</span>
                <Input 
                  type="time" 
                  value={endTime}
                  onChange={(e) => setEndTime(e.target.value)}
                  className="w-full rounded-none border-2 border-border shadow-xs font-sans"
                  required
                />
              </div>
            </div>

            <div className="space-y-2">
              <Label className="uppercase text-xs font-bold tracking-wider flex items-center gap-1">
                <MapPin className="w-3 h-3" /> Location *
              </Label>
              <Input 
                placeholder="Building, Room, Link..." 
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                className="w-full rounded-none border-2 border-border shadow-xs"
                required
              />
            </div>

            <div className="space-y-2">
              <Label className="uppercase text-xs font-bold tracking-wider flex items-center gap-1">
                <AlignLeft className="w-3 h-3" /> Notes
              </Label>
              <textarea 
                placeholder="Things to bring, seat number..."
                value={notes}
                onChange={(e) => setNotes(e.target.value)}
                className="w-full h-24 p-3 rounded-none border-2 border-border bg-background shadow-xs font-sans text-sm focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-primary focus-visible:shadow-sm resize-none"
              />
            </div>
          </div>

          <Button type="submit" disabled={!date} className="w-full rounded-none py-6 text-lg uppercase shadow-[4px_4px_0_0_#000]">
            Schedule It
          </Button>
        </form>
      </CardContent>
    </Card>
  );
}
