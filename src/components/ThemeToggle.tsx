import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import type { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  setTheme: (theme: Theme) => void;
}

export default function ThemeToggle({ theme, setTheme }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  const themes: { value: Theme; icon: React.ReactNode; label: string }[] = [
    { value: 'light', icon: <Sun className="w-4 h-4" />, label: 'Light' },
    { value: 'dark', icon: <Moon className="w-4 h-4" />, label: 'Dark' },
    { value: 'system', icon: <Monitor className="w-4 h-4" />, label: 'System' },
  ];

  return (
    <div className="flex bg-bg-secondary p-1 rounded-full border border-border-subtle shadow-sm">
      {themes.map((t) => (
        <button
          key={t.value}
          onClick={() => setTheme(t.value)}
          className={`flex items-center justify-center p-2 rounded-full transition-all duration-300 ${
            theme === t.value
              ? 'bg-bg-surface text-accent-primary shadow-sm scale-110'
              : 'text-text-secondary hover:text-text-primary hover:bg-bg-surface/50'
          }`}
          aria-label={`Switch to ${t.label} theme`}
          title={t.label}
        >
          {t.icon}
        </button>
      ))}
    </div>
  );
}
