import React, { useEffect, useRef } from 'react';
import { MapPin } from 'lucide-react';

interface MapLocation {
  id: string;
  lat: number;
  lng: number;
  title: string;
  price?: number;
}

interface MapContainerProps {
  locations: MapLocation[];
  center?: { lat: number; lng: number };
  zoom?: number;
  onMarkerClick?: (id: string) => void;
  className?: string;
}

export const MapContainer: React.FC<MapContainerProps> = ({ 
  locations, 
  center = { lat: 7.8731, lng: 80.7718 }, // Sri Lanka center
  zoom = 8,
  onMarkerClick,
  className = ''
}) => {
  const mapRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    // This is a placeholder for actual map implementation
    // You would integrate Google Maps or Leaflet here
    console.log('Map initialized with locations:', locations);
  }, [locations]);

  return (
    <div className={`relative w-full h-[500px] rounded-lg overflow-hidden glass light:bg-gray-100 ${className}`}>
      <div ref={mapRef} className="w-full h-full">
        {/* Placeholder for map - integrate with Google Maps or Leaflet */}
        <div className="w-full h-full flex items-center justify-center bg-primary-dark/20 light:bg-gray-200">
          <div className="text-center">
            <MapPin size={48} className="mx-auto mb-4 text-primary-lighter light:text-gray-400" />
            <p className="text-primary-lighter light:text-gray-600">
              Map will render here with {locations.length} locations
            </p>
            <p className="text-xs text-primary-lighter light:text-gray-500 mt-2">
              Integrate with Google Maps or Leaflet
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
