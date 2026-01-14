import React from 'react';

interface SectionProps {
  children: React.ReactNode;
  className?: string;
  spacing?: 'sm' | 'md' | 'lg' | 'xl';
  background?: 'transparent' | 'glass' | 'primary';
  id?: string;
}

export const Section: React.FC<SectionProps> = ({ 
  children, 
  className = '',
  spacing = 'lg',
  background = 'transparent',
  id
}) => {
  const spacings = {
    sm: 'py-8',
    md: 'py-12',
    lg: 'py-16',
    xl: 'py-24'
  };

  const backgrounds = {
    transparent: '',
    glass: 'glass',
    primary: 'bg-primary-dark light:bg-gray-50'
  };

  return (
    <section 
      id={id}
      className={`${spacings[spacing]} ${backgrounds[background]} ${className}`}
    >
      <div className="container mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
};
