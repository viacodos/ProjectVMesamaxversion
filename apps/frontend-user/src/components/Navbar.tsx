import React, { useState, useEffect } from 'react';
import { Menu, X, Globe, Phone, MapPin } from 'lucide-react';
import { Button } from '@project-v-redone/ui';
import { Link, useLocation } from 'react-router-dom';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore Sri Lanka', path: '/explore' },
    { name: 'Tours', path: '/tours' },
    { name: 'Build Your Tour', path: '/build-tour' },
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Getting Around', path: '/getting-around' },
    { name: 'About Us', path: '/about' },
    { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent
      ${isScrolled
                    ? 'bg-teal-dark/10 backdrop-blur-[16px] border-white/10 shadow-glass'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-2 group">
                            <div className="w-10 h-10 rounded-full bg-ochre flex items-center justify-center text-white font-serif font-bold text-xl shadow-lg ring-2 ring-white/20 group-hover:ring-ochre/50 transition-all">
                                LV
                            </div>
                            <div className="flex flex-col">
                                <span className={`font-serif font-bold text-lg leading-tight tracking-wide transition-colors ${isScrolled ? 'text-white' : 'text-white'}`}>
                                    LANKA
                                </span>
                                <span className={`font-sans text-[10px] uppercase tracking-[0.2em] transition-colors ${isScrolled ? 'text-ochre' : 'text-white/80'}`}>
                                    Vacations
                                </span>
                            </div>
                        </Link>
                    </div>

                    {/* Desktop Navigation */}
                    <div className="hidden xl:flex items-center space-x-1">
                        {navItems.map((item) => (
                            <Link
                                key={item.name}
                                to={item.path}
                                className={`px-3 py-2 rounded-lg text-sm font-medium transition-all duration-300 relative group
                  ${location.pathname === item.path
                                        ? 'text-ochre bg-white/5'
                                        : 'text-white/90 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {item.name}
                                {/* Hover Glow Effect */}
                                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(212,141,77,0.3)] pointer-events-none" />
                            </Link>
                        ))}

                        <div className="ml-4 pl-4 border-l border-white/20 flex items-center gap-3">
                            <Button variant="outline" size="sm" className="bg-transparent border-white/30 text-white hover:bg-white/10 hover:border-ochre hover:text-ochre backdrop-blur-sm">
                                Inquire
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="xl:hidden flex items-center">
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className="p-2 rounded-md text-white hover:bg-white/10 transition-colors focus:outline-none"
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`xl:hidden absolute top-20 left-0 w-full bg-teal-dark/95 backdrop-blur-xl border-t border-white/10 shadow-2xl transition-all duration-300 origin-top overflow-hidden
        ${isMobileMenuOpen ? 'max-h-screen opacity-100' : 'max-h-0 opacity-0'}`}
            >
                <div className="px-4 py-6 space-y-2">
                    {navItems.map((item) => (
                        <Link
                            key={item.name}
                            to={item.path}
                            onClick={() => setIsMobileMenuOpen(false)}
                            className={`block px-4 py-3 rounded-xl text-base font-medium transition-all
                  ${location.pathname === item.path
                                    ? 'bg-ochre/20 text-ochre border border-ochre/30'
                                    : 'text-white/80 hover:bg-white/5 hover:text-white'
                                }`}
                        >
                            {item.name}
                        </Link>
                    ))}
                    <div className="pt-4 mt-4 border-t border-white/10 grid grid-cols-2 gap-3">
                        <Button className="w-full bg-ochre hover:bg-ochre-dark text-white shadow-lg shadow-ochre/20">
                            Plan Trip
                        </Button>
                        <Button variant="outline" className="w-full border-white/20 text-white hover:bg-white/5">
                            Login
                        </Button>
                    </div>
                </div>
            </div>
        </nav>
    );
};
