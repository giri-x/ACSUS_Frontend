import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonNavbar from './CommonNavbar';
import FooterPage from './Footer';

const TechnicianViewACUnit = () => {
  const [acUnits, setAcUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchACUnits = async () => {
      const technicianId = sessionStorage.getItem('technicianId');
      if (!technicianId) {
        setError('No Technician ID found in session.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8090/ac/technician/${technicianId}`);
        console.log('API Response:', response.data); // Log response data

        // Adjust based on actual API response structure
        const data = Array.isArray(response.data) ? response.data : (response.data.data || []);
        setAcUnits(data);
      } catch (error) {
        setError('Failed to fetch AC Units');
        console.error('Error fetching AC Units:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchACUnits();
  }, []);

  const handleSelectUnit = (id) => {
    sessionStorage.setItem('selectedACUnitId', id);
    alert(`AC Unit ID ${id} has been stored in session.`);
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-gray-500">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-red-600">{error}</div>
      </div>
    );
  }

  return (
    <div className="bg-gradient-to-r from-gray-100 via-gray-200 to-gray-300 min-h-screen">
      <CommonNavbar />
      <br />
      <br />
      <br />
      <div className="max-w-6xl mx-auto p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">AC Units for Technician</h2>
        <div className="overflow-x-auto">
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Location</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Dimensions</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Count</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {acUnits.map((unit) => (
                <tr key={unit.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{unit.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.location}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.dimensions}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{unit.count}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    {unit.technician ? unit.technician.name : 'No Technician Assigned'}
                  </td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <button
                      onClick={() => handleSelectUnit(unit.id)}
                      className="text-blue-600 hover:text-blue-900"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterPage />
    </div>
  );
};

export default TechnicianViewACUnit;
