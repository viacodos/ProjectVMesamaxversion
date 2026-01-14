import React from 'react';

export const Footer: React.FC = () => {
  return (
    <footer className="glass mt-20 light:bg-white light:border-t light:border-gray-200">
      <div className="container mx-auto px-4 sm:px-6 py-8">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div>
            <h3 className="text-xl font-bold mb-4 light:text-gray-900">Lanka Vacations</h3>
            <p className="text-primary-lighter light:text-gray-600">Your trusted travel partner in Sri Lanka</p>
          </div>
          <div>
            <h4 className="font-semibold mb-4 light:text-gray-900">Quick Links</h4>
            <ul className="space-y-2 text-primary-lighter light:text-gray-600">
              <li><a href="#" className="hover:text-white transition-colors light:hover:text-primary">Home</a></li>
              <li><a href="#" className="hover:text-white transition-colors light:hover:text-primary">Packages</a></li>
              <li><a href="#" className="hover:text-white transition-colors light:hover:text-primary">Destinations</a></li>
              <li><a href="#" className="hover:text-white transition-colors light:hover:text-primary">Contact</a></li>
            </ul>
          </div>
          <div>
            <h4 className="font-semibold mb-4 light:text-gray-900">Contact</h4>
            <p className="text-primary-lighter light:text-gray-600">Email: info@lankavacations.com</p>
            <p className="text-primary-lighter light:text-gray-600">Phone: +94 777 325 515</p>
          </div>
        </div>
        <div className="border-t border-glass mt-8 pt-8 text-center text-primary-lighter light:border-gray-200 light:text-gray-600">
          <p>&copy; 2024 Lanka Vacations. All rights reserved.</p>
        </div>
      </div>
    </footer>
  );
};
