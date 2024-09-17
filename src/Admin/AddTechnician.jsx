import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom'; // Import useNavigate
import SideNavbar from './SideNavbar'; // Import the SideNavbar component

const AddTechnician = () => {
  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [technicianImage, setTechnicianImage] = useState(null);
  const [error, setError] = useState('');
  const [success, setSuccess] = useState('');

  const navigate = useNavigate(); // Initialize useNavigate

  const handleImageChange = (e) => {
    setTechnicianImage(e.target.files[0]);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    setSuccess('');

    const formData = new FormData();
    formData.append('name', name);
    formData.append('email', email);
    formData.append('passwordHash', '12345'); // Setting the default password
    if (technicianImage) {
      formData.append('technicianImage', technicianImage);
    }

    try {
      const response = await axios.post('http://localhost:8090/tech', formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      if (response.status === 200) {
        setSuccess('Technician added successfully!');
        // Clear the form after success
        setName('');
        setEmail('');
        setTechnicianImage(null);

        // Navigate to ViewTechnician
        navigate('/viewtechnician'); // Replace with your actual route if different
      }
    } catch (err) {
      setError('Failed to add technician. Please try again.');
    }
  };

  return (
    <div className="flex">
      <SideNavbar /> {/* Add the SideNavbar component */}
      <div className="flex-1 p-6 bg-gradient-to-r from-blue-50 to-blue-100">
        <div className="w-full max-w-lg mx-auto bg-white shadow-xl rounded-2xl p-8 mt-6 mb-6">
          <h2 className="text-3xl font-semibold mb-6 text-center text-gray-800">Add Technician</h2>
          {success && <p className="text-green-600 text-center mb-4">{success}</p>}
          {error && <p className="text-red-600 text-center mb-4">{error}</p>}
          <form onSubmit={handleSubmit}>
            <div className="mb-5">
              <label htmlFor="name" className="block text-sm font-medium text-gray-700">Name</label>
              <input
                type="text"
                id="name"
                value={name}
                onChange={(e) => setName(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition ease-in-out duration-300"
                required
              />
            </div>
            <div className="mb-5">
              <label htmlFor="email" className="block text-sm font-medium text-gray-700">Email</label>
              <input
                type="email"
                id="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className="mt-2 block w-full px-4 py-2 border border-gray-300 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500 sm:text-sm transition ease-in-out duration-300"
                required
              />
            </div>
            <div className="mb-6">
              <label htmlFor="technicianImage" className="block text-sm font-medium text-gray-700">Technician Image</label>
              <input
                type="file"
                id="technicianImage"
                onChange={handleImageChange}
                className="mt-2 block w-full text-sm text-gray-500 file:py-2 file:px-4 file:border file:border-gray-300 file:rounded-lg file:text-sm file:font-medium file:bg-gray-100 hover:file:bg-gray-200 transition ease-in-out duration-300"
              />
            </div>
            <button
              type="submit"
              className="w-full bg-blue-600 hover:bg-blue-700 text-white py-3 px-4 rounded-lg shadow-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2 transition ease-in-out duration-300"
            >
              Add Technician
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default AddTechnician;
