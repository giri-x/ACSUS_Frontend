import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react'; // Import Dialog from Headless UI
import { useNavigate } from 'react-router-dom'; // Import useNavigate from react-router-dom
import SideNavbar from './SideNavbar'; // Import the SideNavbar component

const ViewACUnit = () => {
  const [acUnits, setAcUnits] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [logs, setLogs] = useState([]);
  const [isLogModalOpen, setIsLogModalOpen] = useState(false);
  const [currentACUnitId, setCurrentACUnitId] = useState(null); // Temporary state to hold current AC Unit ID
  const navigate = useNavigate(); // Initialize useNavigate

  useEffect(() => {
    const fetchACUnits = async () => {
      try {
        const response = await axios.get('http://localhost:8090/ac/all'); // Your endpoint to get all AC Units
        setAcUnits(response.data);
      } catch (error) {
        setError('Failed to fetch AC Units');
        console.error('Error fetching AC Units:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchACUnits();
  }, []);

  const handleViewLogs = async (acUnitId) => {
    try {
      const response = await axios.get(`http://localhost:8090/log/by-ac-unit/${acUnitId}`);
      setLogs(response.data);
      setCurrentACUnitId(acUnitId);
      setIsLogModalOpen(true);
    } catch (error) {
      console.error('Error fetching logs:', error);
      setError('Failed to fetch logs');
    }
  };

  const closeLogModal = () => {
    setIsLogModalOpen(false);
  };

  const handleViewDetailedLog = () => {
    // Navigate to the adminviewlog page
    navigate('/adminviewlog');
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
    <div className="flex">
      <SideNavbar /> {/* Add the SideNavbar component */}
      <main className="flex-1 p-6 bg-white shadow-lg rounded-lg">
        <h2 className="text-2xl font-semibold mb-6 text-gray-800">AC Units</h2>
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
                      onClick={() => handleViewLogs(unit.id)}
                      className="px-4 py-2 bg-blue-500 text-white rounded-md hover:bg-blue-600"
                    >
                      View Log
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Log Modal */}
        <Dialog open={isLogModalOpen} onClose={closeLogModal}>
          <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
          <div className="fixed inset-0 flex items-center justify-center p-4">
            <Dialog.Panel className="max-w-4xl mx-auto bg-white rounded-lg shadow-lg p-6 relative">
              <Dialog.Title className="text-lg font-semibold mb-4">Logs for AC Unit {currentACUnitId}</Dialog.Title>
              <button
                onClick={closeLogModal}
                className="absolute top-4 right-4 text-gray-500 hover:text-gray-700"
              >
                <svg xmlns="http://www.w3.org/2000/svg" className="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M6 18L18 6M6 6l12 12" />
                </svg>
              </button>
              <div className="overflow-x-auto">
                <table className="min-w-full divide-y divide-gray-200">
                  <thead className="bg-gray-50">
                    <tr>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Time</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                      <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
                    </tr>
                  </thead>
                  <tbody className="bg-white divide-y divide-gray-200">
                    {logs.map((log) => (
                      <tr key={log.id}>
                        <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.id}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(log.fromTime).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(log.toTime).toLocaleString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(log.date).toLocaleDateString()}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.purpose || 'N/A'}</td>
                        <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                          {((new Date(log.toTime) - new Date(log.fromTime)) / (1000 * 60 * 60)).toFixed(2)}
                        </td>
                      </tr>
                    ))}
                  </tbody>
                </table>
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleViewDetailedLog}
                  className="px-4 py-2 bg-green-500 text-white rounded-md hover:bg-green-600"
                >
                  View Detailed Log
                </button>
              </div>
            </Dialog.Panel>
          </div>
        </Dialog>
      </main>
    </div>
  );
};

export default ViewACUnit;
