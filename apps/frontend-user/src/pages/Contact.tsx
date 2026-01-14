import React from 'react';

export const Contact = () => {
    return (
        <div className="min-h-screen pt-24 px-6 bg-neutral-900 text-white">
            <h1 className="text-5xl md:text-7xl font-serif mb-8 text-ochre">Contact Us</h1>
            <div className="grid grid-cols-1 md:grid-cols-2 gap-12">
                <div className="bg-glass-light p-8 rounded-2xl border border-white/10">
                    <form className="space-y-6">
                        <input placeholder="Your Name" className="w-full bg-white/5 border border-white/10 rounded-lg p-4" />
                        <input placeholder="Email Address" className="w-full bg-white/5 border border-white/10 rounded-lg p-4" />
                        <textarea placeholder="Message" rows={4} className="w-full bg-white/5 border border-white/10 rounded-lg p-4" />
                        <button className="bg-ochre w-full py-4 rounded-lg font-bold text-lg">Send Message</button>
                    </form>
                </div>
                <div className="flex flex-col justify-center space-y-8">
                    <div>
                        <h3 className="text-2xl font-serif text-ochre mb-2">Office</h3>
                        <p className="text-white/70">123 Galle Road, Colombo 03, Sri Lanka</p>
                    </div>
                    <div>
                        <h3 className="text-2xl font-serif text-ochre mb-2">Phone</h3>
                        <p className="text-white/70">+94 11 234 5678</p>
                    </div>
                </div>
            </div>
        </div>
    );
};
