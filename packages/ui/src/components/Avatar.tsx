import React from 'react';

interface AvatarProps {
  src?: string;
  alt?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fallback?: string;
}

export const Avatar: React.FC<AvatarProps> = ({ 
  src, 
  alt = 'Avatar', 
  size = 'md', 
  fallback 
}) => {
  const sizes = {
    sm: 'w-8 h-8 text-xs',
    md: 'w-10 h-10 text-sm',
    lg: 'w-12 h-12 text-base',
    xl: 'w-16 h-16 text-lg'
  };

  return (
    <div className={`${sizes[size]} rounded-full overflow-hidden glass flex items-center justify-center light:bg-gray-200`}>
      {src ? (
        <img src={src} alt={alt} className="w-full h-full object-cover" />
      ) : (
        <span className="font-semibold text-primary-lighter light:text-gray-600">
          {fallback || alt.charAt(0).toUpperCase()}
        </span>
      )}
    </div>
  );
};
