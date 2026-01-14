import React, { useState } from 'react';
import { ImageOff } from 'lucide-react';

interface ImageWithFallbackProps extends React.ImgHTMLAttributes<HTMLImageElement> {
  fallback?: React.ReactNode;
}

export const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({ 
  src, 
  alt = 'Image', 
  fallback,
  className = '',
  ...props 
}) => {
  const [error, setError] = useState(false);

  if (error) {
    return (
      <div className={`flex items-center justify-center glass light:bg-gray-100 ${className}`}>
        {fallback || <ImageOff className="text-primary-lighter light:text-gray-400" size={48} />}
      </div>
    );
  }

  return (
    <img
      src={src}
      alt={alt}
      onError={() => setError(true)}
      className={className}
      {...props}
    />
  );
};
