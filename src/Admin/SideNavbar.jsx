import React from 'react';
import { Link, useNavigate } from 'react-router-dom'; 

const SideNavbar = () => {
  const navigate = useNavigate(); 

  const handleLogout = () => {
    sessionStorage.removeItem('technicianId');
    navigate('/'); 
  };

  return (
    <div className="w-64 h-screen bg-gray-800 text-white flex flex-col">
      <div className="p-4 text-2xl font-bold">
        AC Service
      </div>
      <div className="flex-1 mt-6">
        <ul className="space-y-2">
          <li>
            <Link
              to="/addtechnician"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Add Technicians
            </Link>
          </li>
          <li>
            <Link
              to="/viewtechnician"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              View Technicians
            </Link>
          </li>
          <li>
            <Link
              to="/addacunit"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Add AC Units 
            </Link>
          </li>
          <li>
            <Link
              to="/viewacunits"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              View AC Units
            </Link>
          </li>
          <li>
            <Link
              to="/servicerequestlist"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              View Service Requests
            </Link>
          </li>
          <li>
            <Link
              to="/adminreport"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Reports
            </Link>
          </li>
          <li>
            <Link
              to="/settings"
              className="block py-2 px-4 hover:bg-gray-700 rounded"
            >
              Settings
            </Link>
          </li>
        </ul>
      </div>
      <div className="p-4 mt-auto">
        <button
          onClick={handleLogout}
          className="w-full bg-red-600 hover:bg-red-700 text-white py-2 px-4 rounded"
        >
          Logout
        </button>
      </div>
    </div>
  );
};

export default SideNavbar;
