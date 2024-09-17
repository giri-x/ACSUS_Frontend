import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Ensure you have react-router-dom installed
import axios from 'axios'; // Import axios for API calls
import AccountDetailsPage from './AccountDetailsPage';

const Navbar = () => {
  const [showModal, setShowModal] = useState(false); // State for modal visibility
  const [technician, setTechnician] = useState(null);
  const navigate = useNavigate();

  // Get technician ID from session storage or default to 1
  const technicianId = sessionStorage.getItem('technicianId') || 1;

  useEffect(() => {
    // Fetch technician details from backend
    const fetchTechnicianDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/tech/image/${technicianId}`);
        setTechnician(response.data);
      } catch (error) {
        console.error('Error fetching technician details:', error);
      }
    };

    fetchTechnicianDetails();
  }, [technicianId]);

  const handleUpdateProfile = () => {
    navigate('/update-profile'); // Navigate to the profile update page
  };

  const handleLogout = () => {
    sessionStorage.clear(); // Clear session storage
    navigate('/'); // Redirect to the homepage
  };

  // Function to toggle modal visibility
  const toggleModal = () => {
    setShowModal(prev => !prev);
  };

  return (
    <nav className="bg-charcoal-gray text-white flex items-center justify-between p-4">
      {/* Account Icon on the left side */}
      <div className="flex items-center space-x-4">
        <button
          onClick={toggleModal}
          className="text-xl hover:text-gray-300 focus:outline-none"
        >
          {/* Font Awesome icon */}
          <i className="fas fa-user-circle"></i>
        </button>
        <div className="text-lg font-bold">AC Service & Utilization System</div>
      </div>

      <div className="flex-grow flex justify-center space-x-6">
      <Link to="/techreportpage" className="hover:bg-gray-700 p-2 rounded">
          Download Report
        </Link>
        <Link to="/techviewlog" className="hover:bg-gray-700 p-2 rounded">
          Log Usage
        </Link>
        <Link to="/techviewacunit" className="hover:bg-gray-700 p-2 rounded">
          View AC Unit
        </Link>
      </div>
      <div className="relative">
        <button
          onClick={handleLogout}
          className="ml-4 bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
        >
          Logout
        </button>
      </div>

      {/* Modal for technician details */}
      {showModal && technician && (
        <div className="fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center z-50">
          <div className="bg-white text-black rounded-lg shadow-lg p-6 w-80 relative">
            <button
              onClick={toggleModal}
              className="absolute top-2 right-2 text-xl hover:text-gray-600"
            >
              &times;
            </button>
            <div className="flex items-center mb-4">
              <div className="w-12 h-12 bg-gray-200 rounded-full flex items-center justify-center">
                {technician.technicianImage ? (
                  <img
                    src={`data:image/jpeg;base64,${btoa(
                      String.fromCharCode(...new Uint8Array(technician.technicianImage))
                    )}`}
                    alt="Technician"
                    className="w-full h-full object-cover rounded-full"
                  />
                ) : (
                  <span className="text-gray-500 text-3xl">👤</span>
                )}
              </div>
              <div className="ml-4">
                <p className="font-semibold">{technician.name}</p>
                <p>{technician.email}</p>
                <p className="text-sm">{technician.position}</p>
              </div>
            </div>
            <Link
              to="/viewprofile"
              className="block text-center bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
              onClick={toggleModal} // Close modal on navigation
            >
              View Profile
            </Link>
          </div>
        </div>
      )}
    </nav>
  );
};

export default Navbar;
