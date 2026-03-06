import { format, parseISO } from 'date-fns';
import { MapPin, Clock, Trash2, AlignLeft, Download } from 'lucide-react';
import { Card, CardContent } from './retroui/Card';
import { Button } from './retroui/Button';
import { generateSchedulePDF } from '../utils/pdfGenerator';
import type { Exam } from '../types';

interface ExamListProps {
  exams: Exam[];
  onDelete: (id: string) => void;
  currentTheme: "light" | "dark";
}

export function ExamList({ exams, onDelete, currentTheme }: ExamListProps) {
  // Sort exams by date and start time
  const sortedExams = [...exams].sort((a, b) => {
    const dateTimeA = new Date(`${a.date}T${a.startTime}`);
    const dateTimeB = new Date(`${b.date}T${b.startTime}`);
    return dateTimeA.getTime() - dateTimeB.getTime();
  });

  if (exams.length === 0) {
    return (
      <div className="h-full flex flex-col items-center justify-center p-8 border-2 border-dashed border-border text-center opacity-60">
        <Clock className="w-12 h-12 mb-4" />
        <h3 className="font-head text-2xl uppercase tracking-tight">No Exams Scheduled</h3>
        <p className="font-sans text-muted-foreground mt-2 max-w-sm">Use the form to add your upcoming exams, tests, or midterms.</p>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-6">
      <div className="flex justify-between items-end border-b-4 border-border pb-4">
        <div>
          <h2 className="font-head text-4xl uppercase tracking-tight leading-none">Your Output</h2>
          <p className="font-sans text-muted-foreground mt-2 font-medium">{exams.length} upcoming {exams.length === 1 ? 'event' : 'events'}</p>
        </div>
        <Button 
          variant="outline" 
          onClick={() => generateSchedulePDF(exams, currentTheme)}
          className="gap-2 rounded-none border-2 border-border shadow-[4px_4px_0_0_#000] hidden sm:flex"
        >
          <Download className="w-4 h-4" /> Export PDF
        </Button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
        {sortedExams.map((exam) => (
          <Card 
            key={exam.id}
            className="rounded-none relative overflow-hidden group hover:shadow-[4px_4px_0_0_var(--border)] transition-shadow duration-200"
          >
            {/* Color accent bar on top edge */}
            <div className={`absolute top-0 left-0 right-0 h-2 border-b-2 border-border ${exam.color || 'bg-primary'}`} />
            
            <CardContent className="p-5 pt-6 flex flex-col gap-4">
              <div className="flex justify-between items-start gap-4">
                <div className="pr-8">
                  <h3 className="text-xl font-head uppercase font-bold leading-tight break-all">
                    {exam.courseName}
                  </h3>
                  {exam.courseCode && (
                    <span className="inline-block mt-2 px-2 py-1 bg-accent border-2 border-border text-xs font-head font-bold uppercase tracking-widest">
                      {exam.courseCode}
                    </span>
                  )}
                </div>
                
                <Button 
                  variant="destructive"
                  size="icon"
                  onClick={() => onDelete(exam.id)}
                  className="rounded-none h-8 w-8 absolute top-4 right-4 opacity-0 group-hover:opacity-100 transition-opacity"
                  title="Remove exam"
                >
                  <Trash2 className="w-4 h-4" />
                </Button>
              </div>

              <div className="flex flex-col gap-2 mt-2 font-sans text-sm text-foreground/80 font-medium">
                <div className="flex items-center gap-3">
                  <Clock className="w-4 h-4 shrink-0" />
                  <span>
                    {format(parseISO(exam.date), 'MMM d, yyyy')} <span className="mx-2 opacity-50">|</span> {exam.startTime} - {exam.endTime}
                  </span>
                </div>
                
                <div className="flex items-center gap-3">
                  <MapPin className="w-4 h-4 shrink-0" />
                  <span className="truncate">{exam.location}</span>
                </div>
              </div>

              {exam.notes && (
                <div className="mt-2 p-3 bg-muted/20 border-2 border-border-subtle dashed font-sans text-sm">
                  <div className="flex items-start gap-2">
                    <AlignLeft className="w-4 h-4 shrink-0 mt-0.5" />
                    <p className="line-clamp-2">{exam.notes}</p>
                  </div>
                </div>
              )}
            </CardContent>
          </Card>
        ))}
        
        {/* Mobile only export button */}
        <Button 
          variant="outline" 
          onClick={() => generateSchedulePDF(exams, currentTheme)}
          className="gap-2 rounded-none border-2 border-border shadow-[4px_4px_0_0_#000] w-full sm:hidden"
        >
          <Download className="w-4 h-4" /> Export PDF
        </Button>
      </div>
    </div>
  );
}
