import React from 'react';

export const Accommodation = () => {
    return (
        <div className="min-h-screen pt-24 px-6 bg-neutral-900 text-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-ochre">Accommodation</h1>
            <p className="mb-12 text-lg text-white/80">
                Luxurious stays in the heart of nature.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Hotel Cards */}
                <div className="bg-glass-light h-64 rounded-xl border border-white/10 flex items-center justify-center">
                    <span className="text-white/40">Hotel Listings Loading...</span>
                </div>
            </div>
        </div>
    );
};
