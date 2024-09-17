import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

const AccountDetailsPage = () => {
  const [technician, setTechnician] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    // Get technician ID from session storage
    const technicianId = sessionStorage.getItem('technicianId') || 1;

    // Fetch technician details
    const fetchTechnicianDetails = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/tech/${technicianId}`);
        setTechnician(response.data);
      } catch (error) {
        console.error('Error fetching technician details:', error);
      }
    };

    fetchTechnicianDetails();
  }, []);

  const handleGoBack = () => {
    navigate(-1); // Go back to the previous page
  };

  return (
    <div className="bg-gray-100 min-h-screen flex items-center justify-center">
      <div className="bg-white p-8 rounded-lg shadow-lg w-80">
        <button
          onClick={handleGoBack}
          className="absolute top-4 left-4 text-gray-500 hover:text-gray-700"
        >
          &larr; Back
        </button>
        {technician ? (
          <div className="flex flex-col items-center">
            <div className="w-24 h-24 bg-gray-200 rounded-full flex items-center justify-center mb-4">
              {technician.technicianImage ? (
                <img
                  src={`data:image/jpeg;base64,${btoa(
                    String.fromCharCode(...new Uint8Array(technician.technicianImage))
                  )}`}
                  alt="Technician"
                  className="w-full h-full object-cover rounded-full"
                />
              ) : (
                <span className="text-gray-500 text-4xl">👤</span>
              )}
            </div>
            <h2 className="text-2xl font-bold mb-2">{technician.name}</h2>
            <p className="text-gray-700 mb-2">{technician.email}</p>
            <p className="text-gray-500">{technician.position}</p>
          </div>
        ) : (
          <p>Loading...</p>
        )}
      </div>
    </div>
  );
};

export default AccountDetailsPage;
