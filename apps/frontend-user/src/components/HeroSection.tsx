import { useState, useRef } from 'react';
import { ArrowDown, Play, Pause } from 'lucide-react';
import { Button } from '@project-v-redone/ui';
// @ts-ignore - Vite will handle this asset
import heroVideo from '@/../../../packages/ui/src/assets/191283-889685028_small (2).mp4';

export const HeroSection = () => {
    const [isPlaying, setIsPlaying] = useState(true);
    const videoRef = useRef<HTMLVideoElement>(null);

    const toggleVideo = () => {
        if (videoRef.current) {
            if (isPlaying) {
                videoRef.current.pause();
            } else {
                videoRef.current.play();
            }
            setIsPlaying(!isPlaying);
        }
    };

    return (
        <div className="relative h-screen w-full overflow-hidden bg-black">
            {/* Optimized Video Background */}
            <video
                ref={videoRef}
                autoPlay
                loop
                muted
                playsInline
                preload="auto"
                className="absolute top-0 left-0 w-full h-full object-cover z-0"
                style={{
                    willChange: 'transform',
                }}
            >
                <source src={heroVideo} type="video/mp4" />
                Your browser does not support the video tag.
            </video>

            {/* Overlay Gradient */}
            <div className="absolute inset-0 bg-gradient-to-b from-black/30 via-transparent to-black/60 z-10" />

            {/* Content */}
            <div className="relative z-20 h-full flex flex-col items-center justify-center text-center px-4">
                <h2 className="text-ochre font-sans text-sm md:text-base uppercase tracking-[0.3em] mb-4 animate-fade-in">
                    Welcome to Paradise
                </h2>

                <div className="max-w-4xl mx-auto mb-8">
                    <h1 className="font-serif text-5xl md:text-7xl lg:text-8xl text-white font-bold leading-tight drop-shadow-2xl">
                        Sri Lanka
                        <span className="block text-3xl md:text-5xl lg:text-6xl mt-2 font-normal italic opacity-90">
                            An Island of Stories
                        </span>
                    </h1>
                </div>

                <p className="max-w-xl text-gray-200 text-lg mb-10 font-light leading-relaxed backdrop-blur-sm p-4 rounded-xl border border-white/5 bg-white/5">
                    Discover ancient ruins, pristine beaches, and lush jungles in the pearl of the Indian Ocean. Your luxury journey begins here.
                </p>

                <div className="flex gap-4">
                    <Button size="lg" className="bg-ochre hover:bg-ochre-dark text-white border-none shadow-lg shadow-ochre/20 text-lg px-8 py-6 rounded-full">
                        Start Exploring
                    </Button>
                    <Button size="lg" variant="outline" className="text-white border-white hover:bg-white/10 text-lg px-8 py-6 rounded-full backdrop-blur-md">
                        Plan Your Trip
                    </Button>
                </div>
            </div>

            {/* Video Play/Pause Button */}
            <button
                onClick={toggleVideo}
                className="absolute bottom-10 right-10 z-20 w-12 h-12 rounded-full bg-white/10 backdrop-blur-md border border-white/20 flex items-center justify-center hover:bg-white/20 transition-all group"
                aria-label={isPlaying ? 'Pause video' : 'Play video'}
            >
                {isPlaying ? (
                    <Pause className="w-5 h-5 text-white group-hover:scale-110 transition-transform" />
                ) : (
                    <Play className="w-5 h-5 text-white group-hover:scale-110 transition-transform ml-0.5" />
                )}
            </button>

            {/* Scroll Indicator */}
            <div className="absolute bottom-10 left-1/2 transform -translate-x-1/2 z-20 animate-bounce">
                <a href="#explore" className="flex flex-col items-center text-white/80 hover:text-white transition-colors">
                    <span className="text-xs uppercase tracking-widest mb-2 font-light">Scroll</span>
                    <ArrowDown className="w-6 h-6 text-ochre" />
                </a>
            </div>
        </div>
    );
};
