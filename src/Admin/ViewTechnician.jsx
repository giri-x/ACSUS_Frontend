import React, { useEffect, useState } from 'react';
import axios from 'axios';
import SideNavbar from './SideNavbar'; // Import the SideNavbar component
import NotificationModal from './NotificationModal'; // Import the NotificationModal component

const ViewTechnicians = () => {
  const [technicians, setTechnicians] = useState([]);
  const [acUnits, setAcUnits] = useState([]);
  const [notificationStatus, setNotificationStatus] = useState({});
  const [selectedTechnician, setSelectedTechnician] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);

  useEffect(() => {
    const fetchTechniciansAndAcUnits = async () => {
      try {
        // Fetch technicians and AC units data
        const [techResponse, acResponse] = await Promise.all([
          axios.get('http://localhost:8090/tech/all'),
          axios.get('http://localhost:8090/ac/all') // Endpoint for fetching AC units
        ]);

        console.log('Technicians data:', techResponse.data);
        console.log('AC Units data:', acResponse.data);

        setTechnicians(techResponse.data);
        setAcUnits(acResponse.data);
      } catch (error) {
        console.error('Error fetching data:', error);
      }
    };

    fetchTechniciansAndAcUnits();
  }, []);

  const convertToBase64 = (data) => {
    if (Array.isArray(data)) {
      const binaryString = data.map(byte => String.fromCharCode(byte)).join('');
      return `data:image/jpeg;base64,${window.btoa(binaryString)}`;
    }
    
    console.error('Expected an array of bytes but received:', data);
    return 'https://via.placeholder.com/320x180?text=No+Image';
  };

  // Create a map of technician IDs to their assignment status
  const assignedTechnicianIds = new Set(acUnits
    .filter(acUnit => acUnit.technician) // Filter out AC units with assigned technicians
    .map(acUnit => acUnit.technician.id) // Get the technician ID from each AC unit
  );

  console.log('Assigned Technician IDs:', [...assignedTechnicianIds]);

  const handleNotifyClick = (tech) => {
    setSelectedTechnician(tech);
    setIsModalOpen(true);
  };

  const handleModalClose = () => {
    setIsModalOpen(false);
    setSelectedTechnician(null);
  };

  const handleNotificationSent = () => {
    setNotificationStatus(prevStatus => ({
      ...prevStatus,
      [selectedTechnician.id]: 'Notified'
    }));
    handleModalClose();
  };

  return (
    <div className="flex bg-gradient-to-r from-gray-200 via-gray-300 to-gray-400 min-h-screen">
      <SideNavbar /> {/* Include the SideNavbar component */}
      <main className="flex-1 p-6">
        <div className="flex flex-wrap gap-6">
          {technicians.map((tech) => {
            const totalHoursConsumed = tech.totalHoursConsumed || 0;
            const cardClasses = `bg-white border border-gray-200 rounded-lg shadow-md overflow-hidden w-80 ${
              totalHoursConsumed > 8 ? 'animate-blink' : ''
            }`;

            return (
              <div key={tech.id} className={cardClasses}>
                <div className="relative">
                  <img
                    src={tech.technicianImage ? `data:image/jpeg;base64,${tech.technicianImage}` : 'https://via.placeholder.com/320x180?text=No+Image'}
                    alt={tech.name}
                    className="w-full h-48 object-cover"
                    style={{ height: '180px', objectFit: 'cover' }}
                  />
                </div>
                <div className="p-4">
                  <h2 className="text-xl font-semibold mb-2">{tech.name}</h2>
                  <p className="text-gray-600 mb-1">Email: {tech.email}</p>
                  <p className="text-gray-600 mb-1">AC Unit Hours: {totalHoursConsumed} hours</p>
                  <button
                    className={`mt-4 w-full py-2 px-4 rounded-md text-white ${
                      assignedTechnicianIds.has(tech.id) ? 'bg-green-500 hover:bg-green-600' : 'bg-gray-500 hover:bg-gray-600'
                    }`}
                  >
                    {assignedTechnicianIds.has(tech.id) ? 'Assigned' : 'Available'}
                  </button>
                  <button
                    onClick={() => handleNotifyClick(tech)}
                    className="mt-2 w-full py-2 px-4 rounded-md bg-blue-500 hover:bg-blue-600 text-white"
                  >
                    Notify
                  </button>
                  {notificationStatus[tech.id] && (
                    <p className="mt-2 text-green-600">{notificationStatus[tech.id]}</p>
                  )}
                </div>
              </div>
            );
          })}
        </div>
      </main>
      {selectedTechnician && (
        <NotificationModal
          isOpen={isModalOpen}
          onClose={handleModalClose}
          technician={selectedTechnician}
          onSendNotification={handleNotificationSent}
        />
      )}
    </div>
  );
};

export default ViewTechnicians;
