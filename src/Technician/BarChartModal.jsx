import React from 'react';
import Modal from 'react-modal'; // Ensure react-modal is correctly imported
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';

ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

// Bind modal to your app element
Modal.setAppElement('#root');

const BarChartModal = ({ open, onClose, logs }) => {
  const getLast5Logs = () => logs.slice(-5); // Get the last 5 logs

  const getChartData = () => {
    const last5Logs = getLast5Logs();
    return {
      labels: last5Logs.map((log) => new Date(log.date).toLocaleDateString()),
      datasets: [
        {
          label: 'Hours Used',
          data: last5Logs.map((log) => (new Date(log.toTime) - new Date(log.fromTime)) / (1000 * 60 * 60)),
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  return (
    <Modal
      isOpen={open}
      onRequestClose={onClose}
      contentLabel="Bar Chart Modal"
      className="fixed inset-0 flex items-center justify-center z-50 bg-white shadow-lg rounded-lg"
      overlayClassName="fixed inset-0 bg-black bg-opacity-50"
    >
      <div className="p-6 max-w-4xl mx-auto mt-10">
        <h2 className="text-2xl font-semibold mb-4">Bar Chart for Last 5 Logs</h2>
        <div className="mb-4">
          <Bar data={getChartData()} options={{ responsive: true }} />
        </div>
        <button onClick={onClose} className="px-4 py-2 bg-gray-500 text-white rounded-md hover:bg-gray-600">
          Close
        </button>
      </div>
    </Modal>
  );
};

export default BarChartModal;
