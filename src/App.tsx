import { useState, useEffect } from 'react';
import type { Theme, Exam } from './types';
import ThemeToggle from './components/ThemeToggle';
import ExamForm from './components/ExamForm';
import ExamList from './components/ExamList';
import { generateSchedulePDF } from './utils/pdfGenerator';
import './App.css';

function App() {
  const [theme, setTheme] = useState<Theme>('system');
  const [exams, setExams] = useState<Exam[]>(() => {
    const saved = localStorage.getItem('exams');
    return saved ? JSON.parse(saved) : [];
  });

  // Theme Syncing
  useEffect(() => {
    const root = window.document.documentElement;
    const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    root.classList.remove('light', 'dark');
    
    if (theme === 'system') {
      root.classList.add(systemTheme);
    } else {
      root.classList.add(theme);
    }
  }, [theme]);

  // System Theme Listener
  useEffect(() => {
    if (theme !== 'system') return;
    
    const mediaQuery = window.matchMedia('(prefers-color-scheme: dark)');
    const handleChange = () => {
      const root = window.document.documentElement;
      root.classList.remove('light', 'dark');
      root.classList.add(mediaQuery.matches ? 'dark' : 'light');
    };
    
    mediaQuery.addEventListener('change', handleChange);
    return () => mediaQuery.removeEventListener('change', handleChange);
  }, [theme]);

  // Save exams to localStorage
  useEffect(() => {
    localStorage.setItem('exams', JSON.stringify(exams));
  }, [exams]);

  const handleAddExam = (exam: Exam) => {
    setExams((prev) => [...prev, exam]);
  };

  const handleDeleteExam = (id: string) => {
    setExams((prev) => prev.filter(e => e.id !== id));
  };

  const handleExportPDF = () => {
    if (exams.length === 0) {
      alert("No exams to export!");
      return;
    }
    const currentTheme = theme === 'system' 
      ? (window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light') 
      : theme;
    
    generateSchedulePDF(exams, currentTheme);
  };

  return (
    <div className="min-h-screen w-full flex flex-col items-center py-10 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto transition-colors duration-500">
      
      {/* Header */}
      <header className="w-full flex justify-between items-center mb-12 animate-stagger-enter delay-100">
        <div>
          <h1 className="text-4xl md:text-5xl font-serif font-bold text-accent-primary tracking-tight">
            Schedule.
          </h1>
          <p className="text-text-secondary mt-1 max-w-sm text-sm">
            Organize your exams, perfect your timing.
          </p>
        </div>
        <ThemeToggle theme={theme} setTheme={setTheme} />
      </header>

      {/* Main Content Area */}
      <main className="w-full grid grid-cols-1 lg:grid-cols-12 gap-8 items-start pb-20">
        
        {/* Sidebar Form */}
        <section className="lg:col-span-4 glass-panel rounded-2xl p-6 animate-stagger-enter delay-200 sticky top-10">
          <h2 className="text-2xl font-serif font-semibold mb-6 border-b border-border-subtle pb-4">
            Add Exam
          </h2>
          <ExamForm onAddExam={handleAddExam} />
        </section>

        {/* Schedule View */}
        <section className="lg:col-span-8 space-y-6 animate-stagger-enter delay-300">
          <div className="flex justify-between items-center glass-panel rounded-2xl px-6 py-4">
            <h2 className="text-2xl font-serif font-semibold">Upcoming Exams</h2>
            <button 
              onClick={handleExportPDF}
              className="styled-button text-sm py-2 px-4 shadow-none hover:shadow-md"
              disabled={exams.length === 0}
            >
              Export PDF
            </button>
          </div>
          
          {exams.length === 0 ? (
            <div className="glass-panel text-center text-text-secondary p-12 rounded-2xl border-dashed">
              <p>No exams scheduled yet. Take a breather.</p>
            </div>
          ) : (
            <ExamList exams={exams} onDeleteExam={handleDeleteExam} />
          )}
        </section>

      </main>
    </div>
  );
}

export default App;
