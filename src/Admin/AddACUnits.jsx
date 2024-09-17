import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavbar from './SideNavbar'; // Import the SideNavbar component

const AddACUnit = () => {
  const [location, setLocation] = useState('');
  const [dimensions, setDimensions] = useState('');
  const [count, setCount] = useState('');
  const [selectedTechnician, setSelectedTechnician] = useState('');
  const [technicians, setTechnicians] = useState([]);
  const [message, setMessage] = useState('');

  useEffect(() => {
    // Fetch list of technicians when the component mounts
    const fetchTechnicians = async () => {
      try {
        const response = await axios.get('http://localhost:8090/tech/all'); // Updated endpoint
        setTechnicians(response.data);
      } catch (error) {
        console.error('Failed to fetch technicians', error);
      }
    };

    fetchTechnicians();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const response = await axios.post('http://localhost:8090/ac', {
        location,
        dimensions,
        count,
        technician: {
            id: selectedTechnician
        } // Changed to match expected backend format
      });
      setMessage('AC Unit added successfully');
      // Clear form fields
      setLocation('');
      setDimensions('');
      setCount('');
      setSelectedTechnician('');
    } catch (error) {
      setMessage('Failed to add AC Unit');
    }
  };

  return (
    <div className="flex">
      <SideNavbar /> {/* Add the SideNavbar component */}
      <div className="flex-1 p-6 bg-gray-100">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">Add New AC Unit</h2>
        {message && <p className={`mb-4 ${message.includes('Failed') ? 'text-red-600' : 'text-green-600'}`}>{message}</p>}
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="flex flex-wrap gap-4 mb-4">
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="location" className="block text-sm font-medium text-gray-700">Location</label>
              <input
                type="text"
                id="location"
                value={location}
                onChange={(e) => setLocation(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="dimensions" className="block text-sm font-medium text-gray-700">Dimensions</label>
              <input
                type="text"
                id="dimensions"
                value={dimensions}
                onChange={(e) => setDimensions(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="count" className="block text-sm font-medium text-gray-700">Count</label>
              <input
                type="number"
                id="count"
                value={count}
                onChange={(e) => setCount(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              />
            </div>
            <div className="flex-1 min-w-[250px]">
              <label htmlFor="technician" className="block text-sm font-medium text-gray-700">Select Technician</label>
              <select
                id="technician"
                value={selectedTechnician}
                onChange={(e) => setSelectedTechnician(e.target.value)}
                required
                className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm focus:border-indigo-500 focus:ring-indigo-500 sm:text-sm"
              >
                <option value="" disabled>Select a technician</option>
                {technicians.map((tech) => (
                  <option key={tech.id} value={tech.id}>
                    {tech.name}
                  </option>
                ))}
              </select>
            </div>
          </div>
          <button
            type="submit"
            className="inline-flex items-center px-4 py-2 border border-transparent text-base font-medium rounded-md shadow-sm text-white bg-indigo-600 hover:bg-indigo-700 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-indigo-500"
          >
            Add AC Unit
          </button>
        </form>
      </div>
    </div>
  );
};

export default AddACUnit;
