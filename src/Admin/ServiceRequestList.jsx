import React, { useState, useEffect } from 'react';
import axios from 'axios';
import SideNavbar from './SideNavbar'; 

const ServiceRequestList = () => {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [currentPage, setCurrentPage] = useState(1);
  const [totalPages, setTotalPages] = useState(1);
  const [pageSize] = useState(10); 

  useEffect(() => {
    const fetchRequests = async () => {
      try {
        const response = await axios.get('http://localhost:8090/api/service-requests/', {
          params: {
            page: currentPage,
            limit: pageSize
          }
        });

        
        if (Array.isArray(response.data)) {
          setRequests(response.data);
          
           setTotalPages(response.data.totalPages || 5);
        } else {
          throw new Error('Unexpected response structure');
        }
      } catch (error) {
       
        console.error('Error fetching service requests:', error);
        setError(`Failed to fetch service requests. ${error.message}`);
      } finally {
        setLoading(false);
      }
    };

    fetchRequests();
  }, [currentPage, pageSize]);

  const handleApprove = async (id) => {
    try {
      await axios.put(`http://localhost:8090/api/service-requests/approve/${id}`);
      setRequests(prevRequests =>
        prevRequests.map(request =>
          request.id === id ? { ...request, status: 'Approved' } : request
        )
      );
    } catch (error) {
      console.error('Error approving service request:', error);
    }
  };

  const handlePageChange = (newPage) => {
    if (newPage >= 1 && newPage <= totalPages) {
      setCurrentPage(newPage);
    }
  };

  if (loading) return <p>Loading...</p>;

  if (error) return <p className="text-red-500">{error}</p>;

  return (
    <div className="flex">
      <SideNavbar /> 
      <div className="flex-1 p-8 bg-gray-100">
        <h1 className="text-2xl font-bold mb-4">Service Requests</h1>
        <table className="min-w-full divide-y divide-gray-200">
          <thead className="bg-gray-50">
            <tr>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">AC Unit ID</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Technician</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Request Type</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
              <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            </tr>
          </thead>
          <tbody className="bg-white divide-y divide-gray-200">
            {requests.length > 0 ? (
              requests.map((request) => (
                <tr key={request.id}>
                  <td className="px-6 py-4 whitespace-nowrap">{request.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.acUnit?.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.technician?.name}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.requestType}</td>
                  <td className="px-6 py-4 whitespace-nowrap">{request.description}</td>
                  <td className="px-6 py-4 whitespace-nowrap">
                    {request.status === 'Pending' ? (
                      <button
                        onClick={() => handleApprove(request.id)}
                        className="bg-blue-500 hover:bg-blue-600 text-white py-2 px-4 rounded-md"
                      >
                        Approve
                      </button>
                    ) : (
                      request.status
                    )}
                  </td>
                </tr>
              ))
            ) : (
              <tr>
                <td colSpan="6" className="px-6 py-4 text-center">No service requests available.</td>
              </tr>
            )}
          </tbody>
        </table>

        
        <div className="mt-4 flex justify-between items-center">
          <button
            onClick={() => handlePageChange(currentPage - 1)}
            disabled={currentPage === 1}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
          >
            Previous
          </button>
          <span className="text-gray-700">
            Page {currentPage} of {totalPages}
          </span>
          <button
            onClick={() => handlePageChange(currentPage + 1)}
            disabled={currentPage === totalPages}
            className="bg-gray-300 hover:bg-gray-400 text-gray-800 py-2 px-4 rounded-md"
          >
            Next
          </button>
        </div>
      </div>
    </div>
  );
};

export default ServiceRequestList;



