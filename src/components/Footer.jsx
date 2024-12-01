import React from 'react';

const Footer = () => (
    <footer className="bg-gray-800 text-white">
    <div className="container mx-auto px-4 py-6">
      <div className="flex flex-col md:flex-row justify-between items-center">
        {/* Copyright */}
        <p className="text-sm">&copy; {new Date().getFullYear()} Smart Food Planner. All rights reserved.</p>
  
        {/* Links */}
        <div className="mt-4 md:mt-0 flex space-x-6">
          <a href="/privacy" className="text-gray-400 hover:text-teal-500 text-sm">Privacy Policy</a>
          <a href="/terms" className="text-gray-400 hover:text-teal-500 text-sm">Terms of Service</a>
          <a href="/contact" className="text-gray-400 hover:text-teal-500 text-sm">Contact</a>
        </div>
      </div>
    </div>
  </footer>
  
);

export default Footer;