import React from 'react';

export const Explore = () => {
    return (
        <div className="min-h-screen pt-24 px-6 bg-neutral-900 text-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-ochre">Explore Sri Lanka</h1>
            <p className="text-xl text-white/70 max-w-2xl mb-12">
                Discover the pearl of the Indian Ocean. From misty mountains to pristine beaches.
            </p>
            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {/* Destination Cards will go here */}
                <div className="bg-glass-light h-64 rounded-xl border border-white/10 flex items-center justify-center">
                    <span className="text-white/40">Destination Grid Loading...</span>
                </div>
            </div>
        </div>
    );
};
