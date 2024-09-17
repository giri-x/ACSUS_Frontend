import React, { useState } from 'react';
import axios from 'axios';

const NotificationModal = ({ isOpen, onClose, technician, onSendNotification }) => {
  const [email, setEmail] = useState(technician ? technician.email : '');

  const handleSendNotification = async () => {
    try {
      await axios.post('http://localhost:8090/tech/send-notification', {
        email,
        subject: 'Periodic Service Reminder',
        message: 'Dear Technician, Your AC Unit has reached the threshold please initiate the Periodic service request',
      });
      onSendNotification();
      onClose();
    } catch (error) {
      console.error('Error sending notification:', error);
    }
  };

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50">
      <div className="bg-white rounded-lg shadow-lg w-80 p-4">
        <h2 className="text-xl font-semibold mb-4">Send Notification</h2>
        <p className="mb-2">Email: {email}</p>
        <div className="flex justify-end space-x-4">
          <button
            onClick={handleSendNotification}
            className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600"
          >
            Send Notification
          </button>
          <button
            onClick={onClose}
            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  );
};

export default NotificationModal;
