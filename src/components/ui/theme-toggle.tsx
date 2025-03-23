'use client';

import { useState, useEffect } from 'react';
import { Button } from './button';

export function ThemeToggle() {
  const [theme, setTheme] = useState<'light' | 'dark'>('light');

  useEffect(() => {
    // Check if user has a theme preference in localStorage
    const storedTheme = window.localStorage.getItem('theme') as 'light' | 'dark' | null;
    
    // Check if user has a system preference
    const systemPreference = window.matchMedia('(prefers-color-scheme: dark)').matches ? 'dark' : 'light';
    
    // Use stored preference, fallback to system preference
    const initialTheme = storedTheme || systemPreference;
    setTheme(initialTheme);
    
    // Apply theme to document
    updateTheme(initialTheme);
  }, []);

  const updateTheme = (newTheme: 'light' | 'dark') => {
    // Update theme in localStorage
    window.localStorage.setItem('theme', newTheme);
    
    // Update document class for Tailwind
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    const newTheme = theme === 'light' ? 'dark' : 'light';
    setTheme(newTheme);
    updateTheme(newTheme);
  };

  return (
    <Button 
      variant="ghost" 
      size="sm" 
      onClick={toggleTheme}
      className="w-9 px-0"
      aria-label={`Switch to ${theme === 'light' ? 'dark' : 'light'} theme`}
    >
      {theme === 'light' ? (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M21.752 15.002A9.718 9.718 0 0118 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 003 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 009.002-5.998z" 
          />
        </svg>
      ) : (
        <svg 
          xmlns="http://www.w3.org/2000/svg" 
          fill="none" 
          viewBox="0 0 24 24" 
          strokeWidth={1.5} 
          stroke="currentColor" 
          className="w-5 h-5"
        >
          <path 
            strokeLinecap="round" 
            strokeLinejoin="round" 
            d="M12 3v2.25m6.364.386l-1.591 1.591M21 12h-2.25m-.386 6.364l-1.591-1.591M12 18.75V21m-4.773-4.227l-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 11-7.5 0 3.75 3.75 0 017.5 0z" 
          />
        </svg>
      )}
    </Button>
  );
}