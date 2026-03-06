import { useState } from 'react';
import { LandingPage } from './components/LandingPage';
import { ThemeToggle } from './components/ThemeToggle';
import { ExamForm } from './components/ExamForm';
import { ExamList } from './components/ExamList';
import type { Exam, Theme } from './types';
import './App.css';

function App() {
  const [showApp, setShowApp] = useState(false);
  const [exams, setExams] = useState<Exam[]>([]);
  const [theme, setTheme] = useState<Theme>('system');

  if (!showApp) {
    return <LandingPage onStart={() => setShowApp(true)} />;
  }

  // Handle adding exams
  const handleAddExam = (exam: Exam) => {
    setExams((prev) => [...prev, exam]);
  };

  const handleDeleteExam = (id: string) => {
    setExams((prev) => prev.filter((exam) => exam.id !== id));
  };

  return (
    <div className="min-h-screen bg-background text-foreground font-sans selection:bg-primary selection:text-primary-foreground">
      <header className="border-b-2 border-border p-4 flex items-center justify-between sticky top-0 bg-background z-10 shadow-sm">
        <div className="flex items-center gap-2 cursor-pointer" onClick={() => setShowApp(false)}>
          <div className="w-8 h-8 rounded-full bg-primary border-2 border-border flex items-center justify-center font-head font-bold shadow-sm">
            E
          </div>
          <span className="font-head text-xl font-bold tracking-tight uppercase hidden sm:block">ExamScheduler</span>
        </div>
        
        <ThemeToggle theme={theme} onChange={setTheme} />
      </header>

      <main className="max-w-6xl mx-auto p-4 md:p-8 grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-4 space-y-6">
          <ExamForm onAdd={handleAddExam} />
        </div>
        <div className="lg:col-span-8 space-y-6">
          <ExamList 
            exams={exams} 
            onDelete={handleDeleteExam} 
            currentTheme={theme === 'system' ? 'light' : theme} 
          />
        </div>
      </main>
    </div>
  )  
}

export default App;
