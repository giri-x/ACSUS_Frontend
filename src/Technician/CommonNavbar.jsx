import React from 'react';
import { useNavigate } from 'react-router-dom';

const CommonNavbar = () => {
  const navigate = useNavigate();

  const handleBackClick = () => {
    navigate(-1); // Navigate to the previous page
  };

  return (
    <nav className="bg-charcoal-gray text-white flex items-center justify-between p-4">
      {/* Navbar Brand on the left side */}
      <div className="text-lg font-bold">
        AC Service & Utilization System
      </div>

      {/* Back Button on the right side */}
      <button
        onClick={handleBackClick}
        className="text-xl hover:text-gray-300 focus:outline-none"
      >
        <i className="fas fa-arrow-left"></i> Back
      </button>
    </nav>
  );
};

export default CommonNavbar;
