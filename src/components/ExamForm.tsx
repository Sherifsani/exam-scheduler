import React, { useState } from 'react';
import { v4 as uuidv4 } from 'uuid';
import { CalendarDays, MapPin, AlignLeft, BookOpen, Clock } from 'lucide-react';
import type { Exam } from '../types';

interface ExamFormProps {
  onAddExam: (exam: Exam) => void;
}

const COLORS = [
  'bg-accent-primary', 
  'bg-accent-secondary', 
  'bg-blue-600', 
  'bg-purple-600', 
  'bg-rose-500'
];

export default function ExamForm({ onAddExam }: ExamFormProps) {
  const [courseName, setCourseName] = useState('');
  const [courseCode, setCourseCode] = useState('');
  const [date, setDate] = useState('');
  const [startTime, setStartTime] = useState('');
  const [endTime, setEndTime] = useState('');
  const [location, setLocation] = useState('');
  const [notes, setNotes] = useState('');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!courseName || !date || !startTime || !endTime || !location) return;

    const newExam: Exam = {
      id: uuidv4(),
      courseName,
      courseCode,
      date,
      startTime,
      endTime,
      location,
      notes,
      color: COLORS[Math.floor(Math.random() * COLORS.length)],
    };

    onAddExam(newExam);

    // Reset basics
    setCourseName('');
    setCourseCode('');
    setDate('');
    setStartTime('');
    setEndTime('');
    setLocation('');
    setNotes('');
  };

  return (
    <form onSubmit={handleSubmit} className="flex flex-col gap-5">
      
      {/* Course Info */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
          <BookOpen className="w-4 h-4" /> Course Details
        </label>
        <div className="flex gap-3">
          <input 
            type="text" 
            placeholder="Course Name *"
            className="styled-input flex-1"
            value={courseName}
            onChange={(e) => setCourseName(e.target.value)}
            required
          />
          <input 
            type="text" 
            placeholder="Code"
            className="styled-input w-24 sm:w-32"
            value={courseCode}
            onChange={(e) => setCourseCode(e.target.value)}
          />
        </div>
      </div>

      {/* Date & Time */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
          <CalendarDays className="w-4 h-4" /> Date & Time
        </label>
        <input 
          type="date" 
          className="styled-input"
          value={date}
          onChange={(e) => setDate(e.target.value)}
          required
        />
        <div className="flex items-center gap-2 text-text-secondary text-sm">
          <Clock className="w-4 h-4 ml-1" />
          <input 
            type="time" 
            className="styled-input flex-1"
            value={startTime}
            onChange={(e) => setStartTime(e.target.value)}
            required
          />
          <span>to</span>
          <input 
            type="time" 
            className="styled-input flex-1"
            value={endTime}
            onChange={(e) => setEndTime(e.target.value)}
            required
          />
        </div>
      </div>

      {/* Location */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
          <MapPin className="w-4 h-4" /> Location
        </label>
        <input 
          type="text" 
          placeholder="Building, Room, Link... *"
          className="styled-input"
          value={location}
          onChange={(e) => setLocation(e.target.value)}
          required
        />
      </div>

      {/* Notes */}
      <div className="flex flex-col gap-3">
        <label className="text-sm font-medium text-text-secondary flex items-center gap-2">
          <AlignLeft className="w-4 h-4" /> Extra Notes
        </label>
        <textarea 
          placeholder="Things to bring, seat number..."
          className="styled-input resize-none h-24"
          value={notes}
          onChange={(e) => setNotes(e.target.value)}
        />
      </div>

      <button type="submit" className="styled-button mt-4 flex justify-center items-center gap-2">
        Schedule Exam
      </button>

    </form>
  );
}
