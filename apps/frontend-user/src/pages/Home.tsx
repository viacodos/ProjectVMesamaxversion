import React from 'react';
import { HeroSection } from '../components/HeroSection';

export const Home = () => {
    return (
        <div className="min-h-screen bg-neutral-900">
            <HeroSection />

            {/* Signature Experiences Preview (Placeholder) */}
            <section className="py-20 px-6 container mx-auto">
                <h2 className="text-4xl md:text-5xl font-serif text-white mb-12 text-center">
                    Signature Experiences
                </h2>
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
                    {[1, 2, 3].map((i) => (
                        <div key={i} className="h-96 bg-glass-light rounded-2xl border border-white/10 p-6 flex items-end">
                            <span className="text-xl font-medium text-white">Experience {i}</span>
                        </div>
                    ))}
                </div>
            </section>
        </div>
    );
};
