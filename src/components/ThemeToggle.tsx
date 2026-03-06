import { useState, useEffect } from 'react';
import { Moon, Sun, Monitor } from 'lucide-react';
import { Button } from './retroui/Button';
import type { Theme } from '../types';

interface ThemeToggleProps {
  theme: Theme;
  onChange: (theme: Theme) => void;
}

export function ThemeToggle({ theme, onChange }: ThemeToggleProps) {
  const [mounted, setMounted] = useState(false);

  useEffect(() => {
    const root = window.document.documentElement;
    root.classList.remove('light', 'dark');

    if (theme === 'system') {
      const systemTheme = window.matchMedia('(prefers-color-scheme: dark)').matches
        ? 'dark'
        : 'light';
      root.classList.add(systemTheme);
      return;
    }

    root.classList.add(theme);
  }, [theme]);

  useEffect(() => {
    setMounted(true);
  }, []);

  if (!mounted) return null;

  return (
    <div className="flex border-2 border-border bg-card p-1">
      <Button
        variant={theme === 'light' ? 'default' : 'ghost'}
        size="icon"
        className="rounded-none h-8 w-8"
        onClick={() => onChange('light')}
        title="Light theme"
      >
        <Sun className="h-4 w-4 shrink-0" />
      </Button>
      <Button
        variant={theme === 'dark' ? 'default' : 'ghost'}
        size="icon"
        className="rounded-none h-8 w-8"
        onClick={() => onChange('dark')}
        title="Dark theme"
      >
        <Moon className="h-4 w-4 shrink-0" />
      </Button>
      <Button
        variant={theme === 'system' ? 'default' : 'ghost'}
        size="icon"
        className="rounded-none h-8 w-8"
        onClick={() => onChange('system')}
        title="System default"
      >
        <Monitor className="h-4 w-4 shrink-0" />
      </Button>
    </div>
  );
}
