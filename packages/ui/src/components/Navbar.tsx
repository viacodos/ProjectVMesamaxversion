import React, { useState } from 'react';
import { Menu, X } from 'lucide-react';

interface NavLink {
  label: string;
  href: string;
  active?: boolean;
}

interface NavbarProps {
  logo?: React.ReactNode;
  links: NavLink[];
  actions?: React.ReactNode;
}

export const Navbar: React.FC<NavbarProps> = ({ logo, links, actions }) => {
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 glass light:bg-white/80 light:backdrop-blur-md light:border-b light:border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 py-4">
        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            {logo}
          </div>

          <div className="hidden md:flex items-center space-x-6">
            {links.map((link) => (
              <a
                key={link.href}
                href={link.href}
                className={`transition-colors ${
                  link.active
                    ? 'text-white font-semibold light:text-primary'
                    : 'text-primary-lighter hover:text-white light:text-gray-600 light:hover:text-primary'
                }`}
              >
                {link.label}
              </a>
            ))}
            {actions && <div className="flex items-center space-x-4">{actions}</div>}
          </div>

          <button
            onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
            className="md:hidden p-2 rounded-lg glass-light hover:glass transition-all light:bg-gray-100 light:hover:bg-gray-200"
            aria-label="Toggle menu"
          >
            {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
          </button>
        </div>

        {mobileMenuOpen && (
          <div className="md:hidden mt-4 pb-4 glass-dark rounded-lg animate-fade-in light:bg-white light:shadow-lg">
            <div className="flex flex-col space-y-4 p-4">
              {links.map((link) => (
                <a
                  key={link.href}
                  href={link.href}
                  className={`transition-colors ${
                    link.active
                      ? 'text-white font-semibold light:text-primary'
                      : 'text-primary-lighter hover:text-white light:text-gray-600 light:hover:text-primary'
                  }`}
                >
                  {link.label}
                </a>
              ))}
              {actions && <div className="flex flex-col space-y-4 pt-4 border-t border-glass light:border-gray-200">{actions}</div>}
            </div>
          </div>
        )}
      </div>
    </nav>
  );
};
