import { format, parseISO } from 'date-fns';
import { MapPin, Clock, Trash2, AlignLeft } from 'lucide-react';
import type { Exam } from '../types';

interface ExamListProps {
  exams: Exam[];
  onDeleteExam: (id: string) => void;
}

export default function ExamList({ exams, onDeleteExam }: ExamListProps) {
  // Sort exams by date and start time
  const sortedExams = [...exams].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.startTime}`);
    const dateTimeB = new Date(`${b.date}T${b.startTime}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  return (
    <div className="flex flex-col gap-5">
      {sortedExams.map((exam, index) => (
        <div 
          key={exam.id}
          className="group relative flex flex-col sm:flex-row glass-panel-heavy rounded-2xl overflow-hidden animate-stagger-enter transition-transform hover:-translate-y-1 hover:shadow-2xl duration-300"
          style={{ animationDelay: `${(index % 5) * 100}ms` }}
        >
          {/* Color strip accent */}
          <div className={`h-2 sm:h-auto sm:w-2 ${exam.color || 'bg-accent-primary'} shrink-0`} />
          
          <div className="flex-1 p-5 sm:p-6 flex flex-col gap-4">
            {/* Header: Title and Delete */}
            <div className="flex justify-between items-start gap-4">
              <div>
                <h3 className="text-xl font-serif font-bold text-text-primary leading-tight">
                  {exam.courseName}
                </h3>
                {exam.courseCode && (
                  <span className="inline-block px-2 py-0.5 mt-2 bg-bg-secondary text-text-secondary text-xs font-bold rounded-md uppercase tracking-wider">
                    {exam.courseCode}
                  </span>
                )}
              </div>
              
              <button 
                onClick={() => onDeleteExam(exam.id)}
                className="text-text-secondary hover:text-rose-500 hover:bg-rose-500/10 p-2 rounded-full transition-colors opacity-0 group-hover:opacity-100 focus:opacity-100"
                title="Delete exam"
                aria-label="Delete exam"
              >
                <Trash2 className="w-4 h-4" />
              </button>
            </div>

            {/* Details Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mt-1 text-sm text-text-secondary">
              <div className="flex items-center gap-2">
                <Clock className="w-4 h-4 shrink-0 text-accent-primary opacity-80" />
                <span className="font-medium text-text-primary">
                  {format(parseISO(exam.date), 'EEE, MMM d, yyyy')}
                </span>
                <span className="opacity-75 relative before:content-[''] before:inline-block before:w-1 before:h-1 before:bg-text-secondary before:rounded-full before:mx-2 before:align-middle">
                  {exam.startTime} - {exam.endTime}
                </span>
              </div>
              
              <div className="flex items-center gap-2">
                <MapPin className="w-4 h-4 shrink-0 text-accent-primary opacity-80" />
                <span className="truncate">{exam.location}</span>
              </div>
            </div>

            {/* Notes Section */}
            {exam.notes && (
              <div className="mt-2 pt-3 border-t border-border-subtle flex items-start gap-2 text-sm text-text-secondary">
                <AlignLeft className="w-4 h-4 shrink-0 mt-0.5 opacity-60" />
                <p className="line-clamp-2">{exam.notes}</p>
              </div>
            )}
          </div>
        </div>
      ))}
    </div>
  );
}
