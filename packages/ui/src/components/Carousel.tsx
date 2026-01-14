import React, { useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

interface CarouselProps {
  images: string[];
  autoPlay?: boolean;
  interval?: number;
}

export const Carousel: React.FC<CarouselProps> = ({ images, autoPlay = false, interval = 3000 }) => {
  const [current, setCurrent] = useState(0);

  const next = () => setCurrent((prev) => (prev + 1) % images.length);
  const prev = () => setCurrent((prev) => (prev - 1 + images.length) % images.length);

  React.useEffect(() => {
    if (!autoPlay) return;
    const timer = setInterval(next, interval);
    return () => clearInterval(timer);
  }, [autoPlay, interval, current]);

  return (
    <div className="relative w-full aspect-video rounded-lg overflow-hidden glass">
      <img
        src={images[current]}
        alt={`Slide ${current + 1}`}
        className="w-full h-full object-cover"
      />
      
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass-dark hover:bg-primary transition-all"
        aria-label="Previous"
      >
        <ChevronLeft size={24} />
      </button>
      
      <button
        onClick={next}
        className="absolute right-4 top-1/2 -translate-y-1/2 p-2 rounded-full glass-dark hover:bg-primary transition-all"
        aria-label="Next"
      >
        <ChevronRight size={24} />
      </button>

      <div className="absolute bottom-4 left-1/2 -translate-x-1/2 flex space-x-2">
        {images.map((_, index) => (
          <button
            key={index}
            onClick={() => setCurrent(index)}
            className={`w-2 h-2 rounded-full transition-all ${
              index === current ? 'bg-white w-6' : 'bg-white/50'
            }`}
            aria-label={`Go to slide ${index + 1}`}
          />
        ))}
      </div>
    </div>
  );
};
