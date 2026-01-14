import React from 'react';

interface OverlayProps {
  isOpen: boolean;
  onClick?: () => void;
  opacity?: 'light' | 'medium' | 'dark';
  blur?: boolean;
  className?: string;
}

export const Overlay: React.FC<OverlayProps> = ({ 
  isOpen, 
  onClick, 
  opacity = 'medium',
  blur = true,
  className = ''
}) => {
  if (!isOpen) return null;

  const opacities = {
    light: 'bg-black/30',
    medium: 'bg-black/50',
    dark: 'bg-black/70'
  };

  return (
    <div
      onClick={onClick}
      className={`fixed inset-0 z-40 ${opacities[opacity]} ${blur ? 'backdrop-blur-sm' : ''} transition-opacity animate-fade-in ${className}`}
      aria-hidden="true"
    />
  );
};
