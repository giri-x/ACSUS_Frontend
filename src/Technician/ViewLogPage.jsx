 import React, { useState, useEffect } from 'react';
import { Dialog } from '@headlessui/react';
import axios from 'axios';

const ViewLogPage = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [logData, setLogData] = useState({
        acUnitId: '',
        technicianId: '',
        fromTime: '',
        toTime: '',
        date: '',
        purpose: '',
        totalHours: 0, // Add totalHours to state
    });

    // Fetch session data and set logData when modal opens
    useEffect(() => {
        if (isModalOpen) {
            const acUnitId = sessionStorage.getItem('selectedACUnitId');
            const technicianId = sessionStorage.getItem('technicianId');
            if (acUnitId && technicianId) {
                setLogData({
                    acUnit:{
                        id: acUnitId},
                    technician:{
                            id: technicianId
                                    },
                    fromTime: '',
                    toTime: '',
                    date: '',
                    purpose: '',
                    totalHours: 0,
                });
            }
        }
    }, [isModalOpen]);

    // Handle input changes in the form
    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setLogData(prevState => {
            const updatedLogData = { ...prevState, [name]: value };

            // Calculate totalHours when fromTime or toTime changes
            if (name === 'fromTime' || name === 'toTime') {
                const { fromTime, toTime } = updatedLogData;
                if (fromTime && toTime) {
                    const from = new Date(fromTime);
                    const to = new Date(toTime);
                    const totalHours = (to - from) / (1000 * 60 * 60); // Convert milliseconds to hours
                    updatedLogData.totalHours = totalHours;
                } else {
                    updatedLogData.totalHours = 0;
                }
            }
            
            return updatedLogData;
        });
    };

    // Submit log data to the server
    const handleAddLog = async () => {
        try {
            // Full URL to the backend endpoint
            await axios.post('http://localhost:8090/log', logData);
            setIsModalOpen(false);
            // Optionally, refresh the log list or handle success
        } catch (error) {
            console.error("Error adding log:", error);
        }
    };

    return (
        <div className="p-4">
            <button
                onClick={() => setIsModalOpen(true)}
                className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
            >
                Add Log
            </button>

            {/* Modal */}
            <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
                <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
                <div className="fixed inset-0 flex items-center justify-center p-4">
                    <Dialog.Panel className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6">
                        <Dialog.Title className="text-xl font-semibold mb-4">Add Log</Dialog.Title>
                        <form>
                            <div className="mb-4">
                                <label htmlFor="acUnitId" className="block text-sm font-medium text-gray-700">AC Unit ID</label>
                                <input
                                    type="text"
                                    id="acUnitId"
                                    name="acUnitId"
                                    value={logData.acUnitId}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    // disabled // Make this field read-only
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="technicianId" className="block text-sm font-medium text-gray-700">Technician ID</label>
                                <input
                                    type="text"
                                    id="technicianId"
                                    name="technicianId"
                                    value={logData.technicianId}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    // disabled // Make this field read-only
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="fromTime" className="block text-sm font-medium text-gray-700">From Time</label>
                                <input
                                    type="datetime-local"
                                    id="fromTime"
                                    name="fromTime"
                                    value={logData.fromTime}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="toTime" className="block text-sm font-medium text-gray-700">To Time</label>
                                <input
                                    type="datetime-local"
                                    id="toTime"
                                    name="toTime"
                                    value={logData.toTime}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
                                <input
                                    type="date"
                                    id="date"
                                    name="date"
                                    value={logData.date}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose</label>
                                <input
                                    type="text"
                                    id="purpose"
                                    name="purpose"
                                    value={logData.purpose}
                                    onChange={handleInputChange}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    required
                                />
                            </div>
                            <div className="mb-4">
                                <label htmlFor="totalHours" className="block text-sm font-medium text-gray-700">Total Hours</label>
                                <input
                                    type="text"
                                    id="totalHours"
                                    name="totalHours"
                                    value={logData.totalHours}
                                    className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
                                    readOnly // Make this field read-only
                                />
                            </div>
                            <div className="flex justify-end space-x-2">
                                <button
                                    type="button"
                                    onClick={() => setIsModalOpen(false)}
                                    className="px-4 py-2 bg-gray-300 text-black rounded-md shadow-md hover:bg-gray-400"
                                >
                                    Cancel
                                </button>
                                <button
                                    type="button"
                                    onClick={handleAddLog}
                                    className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                                >
                                    Save
                                </button>
                            </div>
                        </form>
                    </Dialog.Panel>
                </div>
            </Dialog>
        </div>
    );
};

export default ViewLogPage;








// import React, { useState, useEffect } from 'react';
// import { Dialog } from '@headlessui/react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom'; // Import useNavigate hook

// const ViewLogPage = () => {
//     const [isModalOpen, setIsModalOpen] = useState(false);
//     const [logData, setLogData] = useState({
//         acUnitId: '',
//         technicianId: '',
//         fromTime: '',
//         toTime: '',
//         date: '',
//         purpose: '',
//         totalHours: 0,
//     });

//     const navigate = useNavigate(); // Initialize useNavigate

//     // Fetch session data and set logData when modal opens
//     useEffect(() => {
//         if (isModalOpen) {
//             const acUnitId = sessionStorage.getItem('selectedACUnitId');
//             const technicianId = sessionStorage.getItem('technicianId');
//             if (acUnitId && technicianId) {
//                 setLogData({
//                     acUnit:{
//                         //                     id: acUnitId},
//                         //                     technician:{
//                         //                     id: technicianId
//                         //                     },
//                     fromTime: '',
//                     toTime: '',
//                     date: '',
//                     purpose: '',
//                     totalHours: 0,
//                 });
//             }
//         }
//     }, [isModalOpen]);

//     // Handle input changes in the form
//     const handleInputChange = (e) => {
//         const { name, value } = e.target;
//         setLogData(prevState => {
//             const updatedLogData = { ...prevState, [name]: value };

//             if (name === 'fromTime' || name === 'toTime') {
//                 const { fromTime, toTime } = updatedLogData;
//                 if (fromTime && toTime) {
//                     const from = new Date(fromTime);
//                     const to = new Date(toTime);
//                     const totalHours = (to - from) / (1000 * 60 * 60);
//                     updatedLogData.totalHours = totalHours;
//                 } else {
//                     updatedLogData.totalHours = 0;
//                 }
//             }

//             return updatedLogData;
//         });
//     };

//     // Submit log data to the server
//     const handleAddLog = async () => {
//         try {
//             await axios.post('http://localhost:8090/log', logData);
//             setIsModalOpen(false);
//         } catch (error) {
//             console.error("Error adding log:", error);
//         }
//     };

//     return (
//         <div className="flex items-center justify-center min-h-screen p-4 bg-gray-100">
//             <div className="space-y-4">
//                 {/* Card for Add Log */}
//                 <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={() => setIsModalOpen(true)}>
//                     <h2 className="text-xl font-semibold mb-2">Add Log</h2>
//                     <p className="text-gray-600">Click to add a new log entry.</p>
//                 </div>

//                 {/* Card for View Log */}
//                 <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={() => navigate('/view-log')}>
//                     <h2 className="text-xl font-semibold mb-2">View Log</h2>
//                     <p className="text-gray-600">View existing log entries.</p>
//                 </div>

//                 {/* Card for View Statistics */}
//                 <div className="bg-white shadow-lg rounded-lg p-6 cursor-pointer" onClick={() => navigate('/view-statistics')}>
//                     <h2 className="text-xl font-semibold mb-2">View Statistics</h2>
//                     <p className="text-gray-600">View statistics related to logs.</p>
//                 </div>
//             </div>

//             {/* Modal */}
//             <Dialog open={isModalOpen} onClose={() => setIsModalOpen(false)}>
//                 <div className="fixed inset-0 bg-black/30" aria-hidden="true" />
//                 <div className="fixed inset-0 flex items-center justify-center p-4">
//                     <Dialog.Panel className="max-w-sm w-full bg-white rounded-lg shadow-lg p-6">
//                         <Dialog.Title className="text-xl font-semibold mb-4">Add Log</Dialog.Title>
//                         <form>
//                             <div className="mb-4">
//                                 <label htmlFor="acUnitId" className="block text-sm font-medium text-gray-700">AC Unit ID</label>
//                                 <input
//                                     type="text"
//                                     id="acUnitId"
//                                     name="acUnitId"
//                                     value={logData.acUnitId}
//                                     onChange={handleInputChange}
//                                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     disabled
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="technicianId" className="block text-sm font-medium text-gray-700">Technician ID</label>
//                                 <input
//                                     type="text"
//                                     id="technicianId"
//                                     name="technicianId"
//                                     value={logData.technicianId}
//                                     onChange={handleInputChange}
//                                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     disabled
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="fromTime" className="block text-sm font-medium text-gray-700">From Time</label>
//                                 <input
//                                     type="datetime-local"
//                                     id="fromTime"
//                                     name="fromTime"
//                                     value={logData.fromTime}
//                                     onChange={handleInputChange}
//                                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="toTime" className="block text-sm font-medium text-gray-700">To Time</label>
//                                 <input
//                                     type="datetime-local"
//                                     id="toTime"
//                                     name="toTime"
//                                     value={logData.toTime}
//                                     onChange={handleInputChange}
//                                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="date" className="block text-sm font-medium text-gray-700">Date</label>
//                                 <input
//                                     type="date"
//                                     id="date"
//                                     name="date"
//                                     value={logData.date}
//                                     onChange={handleInputChange}
//                                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="purpose" className="block text-sm font-medium text-gray-700">Purpose</label>
//                                 <input
//                                     type="text"
//                                     id="purpose"
//                                     name="purpose"
//                                     value={logData.purpose}
//                                     onChange={handleInputChange}
//                                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="totalHours" className="block text-sm font-medium text-gray-700">Total Hours</label>
//                                 <input
//                                     type="text"
//                                     id="totalHours"
//                                     name="totalHours"
//                                     value={logData.totalHours}
//                                     className="mt-1 block w-full border-gray-300 rounded-md shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm"
//                                     readOnly
//                                 />
//                             </div>
//                             <div className="flex justify-end space-x-2">
//                                 <button
//                                     type="button"
//                                     onClick={() => setIsModalOpen(false)}
//                                     className="px-4 py-2 bg-gray-300 text-black rounded-md shadow-md hover:bg-gray-400"
//                                 >
//                                     Cancel
//                                 </button>
//                                 <button
//                                     type="button"
//                                     onClick={handleAddLog}
//                                     className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
//                                 >
//                                     Save
//                                 </button>
//                             </div>
//                         </form>
//                     </Dialog.Panel>
//                 </div>
//             </Dialog>
//         </div>
//     );
// };

// export default ViewLogPage;
