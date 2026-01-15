import { useState, useEffect } from 'react';
import { Menu, X } from 'lucide-react';
import { Button, ThemeToggle } from '@project-v-redone/ui';
import { Link, useLocation } from 'react-router-dom';
// @ts-ignore - Vite will handle this asset relative imports
import logo from '@/../../../packages/ui/src/assets/lanka-vacation-official-logo.png';

const navItems = [
    { name: 'Home', path: '/' },
    { name: 'Explore Sri Lanka', path: '/explore' },
    { name: 'Tours', path: '/tours' },
    { name: 'Build Your Tour', path: '/build-tour' },
    { name: 'Accommodation', path: '/accommodation' },
    { name: 'Getting Around', path: '/getting-around' },
    { name: 'About Us', path: '/about-us' },
    { name: 'Contact', path: '/contact' },
];

export const Navbar = () => {
    const [isScrolled, setIsScrolled] = useState(false);
    const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);
    const location = useLocation();

    // Check if we are on the home page
    const isHome = location.pathname === '/';

    // Navbar should be transparent ONLY if we are on Home AND at the top
    const isTransparent = isHome && !isScrolled;

    useEffect(() => {
        const handleScroll = () => {
            setIsScrolled(window.scrollY > 50);
        };
        window.addEventListener('scroll', handleScroll);
        // Trigger once on mount to set initial state correctly
        handleScroll();
        return () => window.removeEventListener('scroll', handleScroll);
    }, []);

    return (
        <nav
            className={`fixed top-0 left-0 w-full z-50 transition-all duration-300 border-b border-transparent
      ${!isTransparent
                    ? 'bg-background/80 backdrop-blur-[16px] border-border/10 shadow-glass'
                    : 'bg-transparent'
                }`}
        >
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">

                    {/* Logo Area */}
                    <div className="flex-shrink-0 flex items-center gap-2">
                        <Link to="/" className="flex items-center gap-3 group">
                            <img
                                src={logo}
                                alt="Lanka Vacations"
                                className="h-12 w-auto object-contain transition-transform duration-300 group-hover:scale-105"
                            />
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
                                        ? 'text-ochre bg-foreground/5'
                                        : !isTransparent ? 'text-foreground/80 hover:text-foreground hover:bg-foreground/5' : 'text-white/90 hover:text-white hover:bg-white/10'
                                    }`}
                            >
                                {item.name}
                                {/* Hover Glow Effect */}
                                <span className="absolute inset-0 rounded-lg opacity-0 group-hover:opacity-100 transition-opacity duration-300 shadow-[0_0_20px_rgba(212,141,77,0.3)] pointer-events-none" />
                            </Link>
                        ))}

                        <div className="ml-4 pl-4 border-l border-white/20 flex items-center gap-3">
                            <ThemeToggle />
                            <Button variant="outline" size="sm" className={`bg-transparent hover:bg-white/10 hover:border-ochre hover:text-ochre backdrop-blur-sm ${!isTransparent ? 'text-foreground border-foreground/20' : 'text-white border-white/30'}`}>
                                Inquire
                            </Button>
                        </div>
                    </div>

                    {/* Mobile Menu Button */}
                    <div className="xl:hidden flex items-center gap-4">
                        <ThemeToggle />
                        <button
                            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
                            className={`p-2 rounded-md hover:bg-white/10 transition-colors focus:outline-none ${!isTransparent ? 'text-foreground' : 'text-white'}`}
                        >
                            {isMobileMenuOpen ? <X size={28} /> : <Menu size={28} />}
                        </button>
                    </div>
                </div>
            </div>

            {/* Mobile Menu Dropdown */}
            <div
                className={`xl:hidden absolute top-20 left-0 w-full bg-background/95 backdrop-blur-xl border-t border-border/10 shadow-2xl transition-all duration-300 origin-top overflow-hidden
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
                                    : 'text-foreground/80 hover:bg-foreground/5 hover:text-foreground'
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
