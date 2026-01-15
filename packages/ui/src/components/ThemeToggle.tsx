import React from 'react';
import { Moon, Sun } from 'lucide-react';
import { useTheme } from './ThemeContext';

export const ThemeToggle: React.FC = () => {
  const { theme, toggleTheme } = useTheme();

  const handleToggle = async (e: React.MouseEvent<HTMLButtonElement>) => {
    // Fallback for browsers without View Transitions support
    if (!document.startViewTransition) {
      toggleTheme();
      return;
    }

    const button = e.currentTarget;
    const rect = button.getBoundingClientRect();

    // Calculate the center of the button relative to the viewport
    const x = rect.left + rect.width / 2;
    const y = rect.top + rect.height / 2;

    // Calculate distance to the furthest corner
    const endRadius = Math.hypot(
      Math.max(x, window.innerWidth - x),
      Math.max(y, window.innerHeight - y)
    );

    const transition = document.startViewTransition(() => {
      toggleTheme();
    });

    await transition.ready;

    // Animate the clip-path
    document.documentElement.animate(
      {
        clipPath: [
          `circle(0px at ${x}px ${y}px)`,
          `circle(${endRadius}px at ${x}px ${y}px)`,
        ],
      },
      {
        duration: 500,
        easing: 'ease-in-out',
        pseudoElement: '::view-transition-new(root)',
      }
    );
  };

  return (
    <button
      onClick={handleToggle}
      className="relative p-2 rounded-full text-foreground/80 hover:text-ochre transition-colors hover:bg-white/10"
      aria-label="Toggle theme"
    >
      <div className="relative w-5 h-5">
        <Sun
          className={`absolute inset-0 transition-all duration-500 ${theme === 'dark' ? 'opacity-100 rotate-0' : 'opacity-0 -rotate-90'}`}
          size={20}
        />
        <Moon
          className={`absolute inset-0 transition-all duration-500 ${theme === 'light' ? 'opacity-100 rotate-0' : 'opacity-0 rotate-90'}`}
          size={20}
        />
      </div>
    </button>
  );
};
