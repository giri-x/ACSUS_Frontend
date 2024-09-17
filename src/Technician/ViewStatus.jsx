import React, { useState, useEffect } from 'react';
import axios from 'axios';
import ServiceRequestModal from './ServiceRequestModal'; // Import the modal component
import CommonNavbar from './CommonNavbar';
import FooterPage from './Footer';

const ViewStatus = () => {
  const [requests, setRequests] = useState([]);
  const [error, setError] = useState(null);
  const [selectedRequest, setSelectedRequest] = useState(null); // State to manage the selected request
  const [isModalOpen, setIsModalOpen] = useState(false); // State to control modal visibility
  const [loading, setLoading] = useState(false); // State to manage loading
  const acUnitId = sessionStorage.getItem('selectedACUnitId'); // Retrieve the acUnitId from session storage

  useEffect(() => {
    const fetchServiceRequests = async () => {
      setLoading(true);
      try {
        if (acUnitId) {
          const response = await axios.get(`http://localhost:8090/api/service-requests/ac-unit/${acUnitId}`);
          setRequests(response.data);
        } else {
          setError('AC Unit ID not found in session storage.');
        }
      } catch (err) {
        setError('Failed to fetch service requests. Please try again later.');
      } finally {
        setLoading(false);
      }
    };

    fetchServiceRequests();
  }, [acUnitId]);

  const handleTrackStatus = async (requestId) => {
    setLoading(true);
    try {
      if (acUnitId) {
        // Fetch the specific request details
        const response = await axios.get(`http://localhost:8090/api/service-requests/ac-unit/${acUnitId}/request/${requestId}`);
        setSelectedRequest(response.data);
        setIsModalOpen(true); // Open the modal only after data is fetched
      } else {
        setError('AC Unit ID not found in session storage.');
      }
    } catch (err) {
      setError('Failed to fetch service request details. Please try again later.');
    } finally {
      setLoading(false);
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedRequest(null); // Clear the selected request
  };

  const getStatusColor = (status) => {
    switch (status) {
      case 'pending':
        return 'text-red-600';
      case 'approved':
        return 'text-green-600';
      default:
        return 'text-gray-800';
    }
  };

  return (
    <div>
      <CommonNavbar />

      <div 
        className="p-6 min-h-screen"
        style={{
          background: 'linear-gradient(135deg, #f0f0f0 0%, #d9d9d9 100%)',
          // Gradient goes from light gray to a slightly darker gray
        }}
      >
        <h1 className="text-3xl font-bold mb-4">Service History</h1>
        {error && <p className="text-red-600 mb-4">{error}</p>}
        {loading && <p className="text-gray-500">Loading...</p>}
        {requests.length > 0 ? (
          <div className="overflow-x-auto">
            <table className="min-w-full bg-white border border-gray-300 rounded-lg shadow-md divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AC Unit ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Type</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Created At</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Updated At</th>
                </tr>
              </thead>
              <tbody className="bg-white divide-y divide-gray-200">
                {requests.map((request) => (
                  <tr key={request.id}>
                    <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{request.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.acUnit.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.technician.id}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.requestType}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{request.description}</td>
                    <td className={`px-6 py-4 whitespace-nowrap text-sm ${getStatusColor(request.status)}`}>
                      {/* {request.status} */}
                      <button
                        onClick={() => handleTrackStatus(request.id)}
                        className="ml-2 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500"
                      >
                        View Status
                      </button>
                    </td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(request.createdAt).toLocaleString()}</td>
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{new Date(request.updatedAt).toLocaleString()}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        ) : (
          <p className="text-gray-500">No service requests found.</p>
        )}
        {selectedRequest && (
          <ServiceRequestModal 
            isOpen={isModalOpen} 
            onClose={closeModal} 
            serviceRequest={selectedRequest} 
          />
        )}
      </div>
      <FooterPage />
    </div>
  );
};

export default ViewStatus;
