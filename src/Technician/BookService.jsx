import React, { useState, useEffect } from 'react';
import axios from 'axios';
import CommonNavbar from './CommonNavbar';
import FooterPage from './Footer';

const BookService = () => {
    const [acUnitId, setAcUnitId] = useState('');
    const [technicianId, setTechnicianId] = useState('');
    const [requestType, setRequestType] = useState('');
    const [description, setDescription] = useState('');
    const [message, setMessage] = useState('');

    const serviceTypes = [
        // 'Periodic Service',
        'Service Escalation'
    ];

    useEffect(() => {
        // Fetch values from session storage when component mounts
        const storedAcUnitId = sessionStorage.getItem('selectedACUnitId');
        const storedTechnicianId = sessionStorage.getItem('technicianId');

        // Set state with the fetched values
        if (storedAcUnitId) setAcUnitId(storedAcUnitId);
        if (storedTechnicianId) setTechnicianId(storedTechnicianId);
    }, []);

    const handleSubmit = async () => {
        const requestData = {
            acUnit: {
                id: acUnitId
            },
            technician: {
                id: technicianId
            },
            requestType,
            description,
            status: "Pending"
        };

        try {
            const response = await axios.post('http://localhost:8090/api/service-requests/request', requestData);
            setMessage('Service request submitted successfully!');
            // Clear form fields
            setRequestType('');
            setDescription('');
        } catch (error) {
            console.error('Error submitting service request:', error);
            setMessage('Failed to submit service request.');
        }
    };

    return (
        <div className="bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 min-h-screen">
            <CommonNavbar />
            <div className="max-w-4xl mx-auto p-8 bg-white rounded-lg shadow-lg mt-8">
                <h1 className="text-2xl font-bold mb-6 text-gray-700">Book a Service Request</h1>
                <div className="space-y-6">
                    <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
                            <label htmlFor="acUnitId" className="block text-gray-600 font-medium mb-2">AC Unit ID:</label>
                            <input
                                type="text"
                                id="acUnitId"
                                value={acUnitId}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
                            <label htmlFor="technicianId" className="block text-gray-600 font-medium mb-2">Technician ID:</label>
                            <input
                                type="text"
                                id="technicianId"
                                value={technicianId}
                                readOnly
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm bg-gray-200 cursor-not-allowed"
                            />
                        </div>
                    </div>
                    <div className="flex flex-wrap gap-6 mb-6">
                        <div className="flex-1 bg-gray-100 p-6 rounded-lg shadow-md">
                            <label htmlFor="requestType" className="block text-gray-600 font-medium mb-2">Service Type:</label>
                            <select
                                id="requestType"
                                value={requestType}
                                onChange={(e) => setRequestType(e.target.value)}
                                required
                                className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            >
                                <option value="">Select a service type</option>
                                {serviceTypes.map((type) => (
                                    <option key={type} value={type}>
                                        {type}
                                    </option>
                                ))}
                            </select>
                        </div>
                    </div>
                    <div className="bg-gray-100 p-6 rounded-lg shadow-md mb-6">
                        <label htmlFor="description" className="block text-gray-600 font-medium mb-2">Description:</label>
                        <textarea
                            id="description"
                            value={description}
                            onChange={(e) => setDescription(e.target.value)}
                            required
                            className="w-full px-4 py-2 border border-gray-300 rounded-lg shadow-sm focus:outline-none focus:ring-2 focus:ring-blue-500"
                            rows="4"
                        />
                    </div>
                    <button
                        onClick={handleSubmit}
                        className="w-full py-3 px-6 bg-blue-500 text-white font-semibold rounded-lg shadow-md hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-opacity-50"
                    >
                        Submit
                    </button>
                </div>
                {message && (
                    <p className={`mt-4 p-3 rounded-lg text-white ${message.includes('Failed') ? 'bg-red-500' : 'bg-green-500'}`}>
                        {message}
                    </p>
                )}
            </div>
            <br></br>
            <br></br>
            <br></br>
            <FooterPage />
        </div>
    );
};

export default BookService;
