// src/Navbar.js
import React from 'react';

const Navbar = () => {
  return (
    <nav className="bg-charcoal-gray text-white py-4">
      <div className="container mx-auto flex items-center justify-between">
        <div className="flex space-x-4">
          <a href="#" className="hover:text-gray-300">HOME</a>
          <a href="#" className="hover:text-gray-300">ABOUT</a>
          <a href="#" className="hover:text-gray-300">CONTACT</a>
        </div>
        <a href="/login" className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded">LOGIN</a>
      </div>
    </nav>
  );
}

export default Navbar;
