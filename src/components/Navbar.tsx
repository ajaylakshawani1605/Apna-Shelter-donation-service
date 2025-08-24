import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { Button } from "@/components/ui/button";
import { Menu, X } from 'lucide-react';
import logoImage from './logoo.jpg';

const Navbar = () => {
  const [isMobileMenuOpen, setIsMobileMenuOpen] = useState(false);

  return (
    <div className="bg-white shadow-md py-6 px-8">
      <div className="container mx-auto flex justify-between items-center">
        <Link to="/" className="flex items-center">
          <img src={logoImage} alt="Apna Shelter" className="h-14" />
          <span className="ml-3 text-2xl font-bold text-brand-blue">Apna Shelter</span>
        </Link>
        
        <div className="hidden md:flex items-center space-x-8">
          <nav className="flex items-center space-x-8">
            <Link to="/" className="text-gray-700 hover:text-brand-orange transition-colors font-medium text-lg">
              Home
            </Link>
            <Link to="/about" className="text-gray-700 hover:text-brand-orange transition-colors font-medium text-lg">
              About Us
            </Link>
            <Link to="/campaign" className="text-gray-700 hover:text-brand-orange transition-colors font-medium text-lg">
              Campaign
            </Link>
            <Link to="/dashboard" className="text-gray-700 hover:text-brand-orange transition-colors font-medium text-lg">
              Dashboard
            </Link>
          </nav>
          <Link to="/donate">
            <Button className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium">
              Donate Now
            </Button>
          </Link>
        </div>

        <div className="flex items-center space-x-4 md:hidden">
          <button
            onClick={() => setIsMobileMenuOpen(!isMobileMenuOpen)}
          >
            {isMobileMenuOpen ? (
              <X className="h-6 w-6 text-gray-700" />
            ) : (
              <Menu className="h-6 w-6 text-gray-700" />
            )}
          </button>
        </div>

        {/* Mobile menu */}
        {isMobileMenuOpen && (
          <div className="absolute top-24 left-0 right-0 bg-white shadow-lg md:hidden z-50">
            <div className="flex flex-col space-y-4 p-6">
              <Link 
                to="/" 
                className="text-gray-700 hover:text-brand-orange transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Home
              </Link>
              <Link 
                to="/about" 
                className="text-gray-700 hover:text-brand-orange transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                About Us
              </Link>
              <Link 
                to="/campaign" 
                className="text-gray-700 hover:text-brand-orange transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Campaign
              </Link>
              <Link 
                to="/dashboard" 
                className="text-gray-700 hover:text-brand-orange transition-colors font-medium text-lg"
                onClick={() => setIsMobileMenuOpen(false)}
              >
                Dashboard
              </Link>
              <Link to="/donate">
                <Button className="bg-brand-orange hover:bg-orange-600 text-white px-6 py-2 rounded-full font-medium">
                  Donate Now
                </Button>
              </Link>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default Navbar;
