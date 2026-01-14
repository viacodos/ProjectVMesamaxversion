import React, { useState } from 'react';
import { MapPin } from 'lucide-react';

interface MarkerProps {
  title: string;
  price?: number;
  currency?: string;
  image?: string;
  onClick?: () => void;
}

export const Marker: React.FC<MarkerProps> = ({ 
  title, 
  price, 
  currency = 'USD',
  image,
  onClick 
}) => {
  const [isHovered, setIsHovered] = useState(false);

  return (
    <div 
      className="relative cursor-pointer"
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      onClick={onClick}
    >
      <MapPin 
        size={32} 
        className="text-primary fill-primary hover:scale-110 transition-transform drop-shadow-lg" 
      />
      
      {isHovered && (
        <div className="absolute bottom-full left-1/2 -translate-x-1/2 mb-2 w-48 glass-dark rounded-lg p-3 shadow-glass-lg animate-fade-in z-50 light:bg-white light:shadow-2xl light:border light:border-gray-200">
          {image && (
            <img 
              src={image} 
              alt={title} 
              className="w-full h-24 object-cover rounded-lg mb-2" 
            />
          )}
          <h4 className="font-semibold text-sm mb-1 light:text-gray-900">{title}</h4>
          {price && (
            <p className="text-primary-lighter text-xs light:text-gray-600">
              From {new Intl.NumberFormat('en-US', { 
                style: 'currency', 
                currency 
              }).format(price)}
            </p>
          )}
          <div className="absolute bottom-0 left-1/2 -translate-x-1/2 translate-y-1/2 w-3 h-3 bg-primary-dark rotate-45 light:bg-white light:border-b light:border-r light:border-gray-200" />
        </div>
      )}
    </div>
  );
};
