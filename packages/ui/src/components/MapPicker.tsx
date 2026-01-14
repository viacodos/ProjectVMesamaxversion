import React, { useState } from 'react';
import { MapPin, Check } from 'lucide-react';

interface MapPickerProps {
  onLocationSelect: (lat: number, lng: number) => void;
  initialLat?: number;
  initialLng?: number;
  className?: string;
}

export const MapPicker: React.FC<MapPickerProps> = ({ 
  onLocationSelect, 
  initialLat = 7.8731,
  initialLng = 80.7718,
  className = ''
}) => {
  const [selectedLat, setSelectedLat] = useState(initialLat);
  const [selectedLng, setSelectedLng] = useState(initialLng);
  const [isConfirmed, setIsConfirmed] = useState(false);

  const handleMapClick = (e: React.MouseEvent<HTMLDivElement>) => {
    // In real implementation, this would use map library's click event
    // For now, using manual input as placeholder
    const rect = e.currentTarget.getBoundingClientRect();
    const x = e.clientX - rect.left;
    const y = e.clientY - rect.top;
    
    // Mock coordinate calculation (replace with actual map library)
    const lat = initialLat + (y / rect.height - 0.5) * 2;
    const lng = initialLng + (x / rect.width - 0.5) * 4;
    
    setSelectedLat(Number(lat.toFixed(6)));
    setSelectedLng(Number(lng.toFixed(6)));
    setIsConfirmed(false);
  };

  const handleConfirm = () => {
    onLocationSelect(selectedLat, selectedLng);
    setIsConfirmed(true);
  };

  return (
    <div className={`space-y-4 ${className}`}>
      <div 
        onClick={handleMapClick}
        className="relative w-full h-[400px] rounded-lg overflow-hidden glass cursor-crosshair light:bg-gray-100 light:border light:border-gray-300"
      >
        {/* Placeholder for actual map - integrate with Google Maps or Leaflet */}
        <div className="w-full h-full flex items-center justify-center bg-primary-dark/20 light:bg-gray-200">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 text-primary-lighter light:text-gray-400" />
            <p className="text-primary-lighter light:text-gray-600">
              Click on the map to select location
            </p>
            <p className="text-xs text-primary-lighter light:text-gray-500 mt-2">
              Integrate with Google Maps or Leaflet for production
            </p>
          </div>
        </div>
        
        {/* Selected marker */}
        <div 
          className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 pointer-events-none"
        >
          <MapPin size={40} className="text-red-500 fill-red-500 drop-shadow-lg animate-bounce" />
        </div>
      </div>

      <div className="glass rounded-lg p-4 light:bg-white light:border light:border-gray-200">
        <div className="grid grid-cols-2 gap-4 mb-4">
          <div>
            <label className="block text-sm font-medium text-primary-lighter light:text-gray-700 mb-2">
              Latitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={selectedLat}
              onChange={(e) => {
                setSelectedLat(Number(e.target.value));
                setIsConfirmed(false);
              }}
              className="w-full px-4 py-2 rounded-lg glass border-2 border-glass focus:border-primary-light focus:outline-none transition-colors light:bg-white light:border-gray-300"
            />
          </div>
          <div>
            <label className="block text-sm font-medium text-primary-lighter light:text-gray-700 mb-2">
              Longitude
            </label>
            <input
              type="number"
              step="0.000001"
              value={selectedLng}
              onChange={(e) => {
                setSelectedLng(Number(e.target.value));
                setIsConfirmed(false);
              }}
              className="w-full px-4 py-2 rounded-lg glass border-2 border-glass focus:border-primary-light focus:outline-none transition-colors light:bg-white light:border-gray-300"
            />
          </div>
        </div>

        <button
          onClick={handleConfirm}
          disabled={isConfirmed}
          className="w-full flex items-center justify-center gap-2 px-6 py-3 rounded-lg bg-primary text-white hover:bg-primary-light disabled:opacity-50 transition-all font-medium"
        >
          {isConfirmed ? (
            <>
              <Check size={20} />
              Location Confirmed
            </>
          ) : (
            'Confirm Location'
          )}
        </button>
      </div>
    </div>
  );
};
