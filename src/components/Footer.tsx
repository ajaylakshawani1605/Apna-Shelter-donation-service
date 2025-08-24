import React from 'react';
import { Phone, Mail, MapPin } from 'lucide-react';

const Footer = () => {
  return (
    <footer className="bg-brand-blue text-white">
      <div className="container mx-auto py-8 px-4">
        <div className="text-center mb-4">
          <h2 className="text-xl font-semibold relative inline-block pb-2 mb-4">
            Contact
            <span className="absolute bottom-0 left-0 w-full h-1 bg-brand-orange"></span>
          </h2>
        </div>
        
        <div className="flex flex-col items-center space-y-4">
          <div className="flex items-center">
            <Phone className="mr-2 text-brand-orange" size={20} />
            <span>+91 7021156564</span>
          </div>
          
          <div className="flex items-center">
            <Mail className="mr-2 text-brand-orange" size={20} />
            <span>info@apparelcyclehub.com</span>
          </div>
          
          <div className="flex items-center text-center max-w-md">
            <MapPin className="mr-2 text-brand-orange flex-shrink-0" size={20} />
            <span>303, 3rd Floor, Krishna Plaza, Near Thane Railway Station, Thane West, Maharashtra - 400601</span>
          </div>
        </div>
      </div>
      
      <div className="border-t border-gray-700 py-4 text-center text-sm">
        <p>2023 Apna Shelter Foundation | All Rights Reserved.</p>
      </div>
    </footer>
  );
};

export default Footer;
