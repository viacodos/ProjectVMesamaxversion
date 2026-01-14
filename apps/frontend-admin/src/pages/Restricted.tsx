import React from 'react';
import { ShieldAlert, Lock } from 'lucide-react';

export const Restricted = () => {
    return (
        <div className="min-h-[80vh] flex flex-col items-center justify-center text-center p-6 bg-red-950/20 rounded-3xl border border-red-500/10">
            <div className="w-24 h-24 bg-red-500/20 rounded-full flex items-center justify-center mb-6 animate-pulse">
                <ShieldAlert className="text-red-500" size={48} />
            </div>
            <h1 className="text-4xl font-serif text-red-500 mb-2">Restricted Area</h1>
            <p className="text-red-400/80 max-w-md mb-8">
                This area sends an automated alert to the system administrator when accessed.
                Ensure you have Level 5 clearance.
            </p>

            <div className="bg-black/40 p-6 rounded-xl border border-red-500/20 w-full max-w-sm">
                <div className="flex items-center gap-3 mb-4 text-red-400/60 text-sm uppercase tracking-wider font-bold">
                    <Lock size={14} /> Security Challenge
                </div>
                <input
                    type="password"
                    placeholder="Enter Clearance Code"
                    className="w-full bg-red-500/10 border border-red-500/30 text-red-100 placeholder:text-red-500/30 rounded-lg p-3 text-center focus:outline-none focus:border-red-500/60"
                />
            </div>
        </div>
    );
};
