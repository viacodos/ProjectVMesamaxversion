import React from 'react';
import { Facebook, Instagram, Twitter, Mail, MapPin, Phone } from 'lucide-react';
import { Button } from '@project-v-redone/ui';

export const Footer = () => {
    return (
        <footer className="bg-teal-dark text-white pt-20 pb-10">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-12 mb-16">

                    {/* Brand Column */}
                    <div className="space-y-6">
                        <div className="flex items-center gap-2">
                            <div className="w-10 h-10 rounded-full bg-ochre flex items-center justify-center text-white font-serif font-bold text-xl">
                                LV
                            </div>
                            <div className="flex flex-col">
                                <span className="font-serif font-bold text-lg leading-tight tracking-wide">LANKA</span>
                                <span className="font-sans text-[10px] uppercase tracking-[0.2em] text-ochre">Vacations</span>
                            </div>
                        </div>
                        <p className="text-gray-400 text-sm leading-relaxed">
                            Crafting unforgettable journeys through the pearl of the Indian Ocean. Experience luxury, culture, and nature in perfect harmony.
                        </p>
                    </div>

                    {/* Quick Links */}
                    <div>
                        <h3 className="font-serif text-lg font-bold mb-6 text-ochre">Explore</h3>
                        <ul className="space-y-4">
                            {['Destinations', 'Tours', 'Accommodations', 'Experiences', 'Blog'].map((item) => (
                                <li key={item}>
                                    <a href="#" className="text-gray-400 hover:text-ochre transition-colors text-sm">
                                        {item}
                                    </a>
                                </li>
                            ))}
                        </ul>
                    </div>

                    {/* Contact Info */}
                    <div>
                        <h3 className="font-serif text-lg font-bold mb-6 text-ochre">Contact Us</h3>
                        <ul className="space-y-4">
                            <li className="flex items-start gap-3 text-gray-400 text-sm">
                                <MapPin size={18} className="text-ochre shrink-0 mt-1" />
                                <span>123 Lotus Tower Rd,<br />Colombo 01, Sri Lanka</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Phone size={18} className="text-ochre shrink-0" />
                                <span>+94 11 234 5678</span>
                            </li>
                            <li className="flex items-center gap-3 text-gray-400 text-sm">
                                <Mail size={18} className="text-ochre shrink-0" />
                                <span>hello@lankavacations.com</span>
                            </li>
                        </ul>
                    </div>

                    {/* Newsletter */}
                    <div>
                        <h3 className="font-serif text-lg font-bold mb-6 text-ochre">Newsletter</h3>
                        <p className="text-gray-400 text-sm mb-4">Subscribe to receive exclusive offers and travel inspiration.</p>
                        <div className="space-y-3">
                            <input
                                type="email"
                                placeholder="Your email address"
                                className="w-full bg-white/5 border border-white/10 rounded-lg px-4 py-3 text-white placeholder-gray-500 focus:outline-none focus:border-ochre focus:ring-1 focus:ring-ochre transition-all"
                            />
                            <Button className="w-full bg-ochre hover:bg-ochre-dark text-white">
                                Subscribe
                            </Button>
                        </div>
                    </div>
                </div>

                {/* Bottom Bar */}
                <div className="border-t border-white/10 pt-8 flex flex-col md:flex-row justify-between items-center gap-4">
                    <p className="text-gray-500 text-xs">
                        © {new Date().getFullYear()} Lanka Vacations. All rights reserved.
                    </p>
                    <div className="flex items-center gap-6">
                        {[Facebook, Instagram, Twitter].map((Icon, idx) => (
                            <a key={idx} href="#" className="text-gray-400 hover:text-ochre transition-colors">
                                <Icon size={20} />
                            </a>
                        ))}
                    </div>
                </div>
            </div>
        </footer>
    );
};
