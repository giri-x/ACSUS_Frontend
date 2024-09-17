import React from 'react';
import ReactDOM from 'react-dom';

const ServiceRequestModal = ({ isOpen, onClose, serviceRequest }) => {
  if (!isOpen || !serviceRequest) return null;

  return ReactDOM.createPortal(
    <div className="fixed inset-0 flex items-center justify-center bg-gray-800 bg-opacity-50 z-50">
      <div className="bg-white p-6 rounded-lg shadow-lg w-1/2">
        <h2 className="text-2xl font-semibold mb-4">Service Request Details</h2>
        <button
          onClick={onClose}
          className="absolute top-2 right-2 text-gray-600 hover:text-gray-900"
        >
          &times;
        </button>
        {/* <p><strong>ID:</strong> {serviceRequest.id}</p>
        <p><strong>AC Unit ID:</strong> {serviceRequest.acUnit.id}</p>
        <p><strong>Technician ID:</strong> {serviceRequest.technician.id}</p> */}
        <p><strong>Request Type:</strong> {serviceRequest.requestType}</p>
        <p><strong>Description:</strong> {serviceRequest.description}</p>
        <p><strong>Status:</strong> {serviceRequest.status}</p>
        <p><strong>Created At:</strong> {new Date(serviceRequest.createdAt).toLocaleString()}</p>
        <p><strong>Updated At:</strong> {new Date(serviceRequest.updatedAt).toLocaleString()}</p>
        <button
          onClick={onClose}
          className="mt-4 px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
        >
          Close
        </button>
      </div>
    </div>,
    document.body
  );
};

export default ServiceRequestModal;
