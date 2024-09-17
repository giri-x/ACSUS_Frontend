import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Dialog } from '@headlessui/react';
import { useNavigate } from 'react-router-dom';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale } from 'chart.js';
import { PlusIcon } from '@heroicons/react/20/solid';
import CommonNavbar from './CommonNavbar';
import FooterPage from './Footer';

ChartJS.register(Title, Tooltip, Legend, BarElement, CategoryScale, LinearScale);

const TechViewLogPage = () => {
  const [logs, setLogs] = useState([]);
  const [selectedDateLogs, setSelectedDateLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [date, setDate] = useState('');
  const [totalHoursConsumed, setTotalHoursConsumed] = useState(0);
  const [showAlert, setShowAlert] = useState(false);
  const [showStatisticsModal, setShowStatisticsModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [logData, setLogData] = useState({
    acUnitId: '',
    technicianId: '',
    fromTime: '',
    toTime: '',
    date: '',
    purpose: '',
  });
  const [hoursDifference, setHoursDifference] = useState(0);
  const navigate = useNavigate();

  useEffect(() => {
    const fetchLogs = async () => {
      const acUnitId = sessionStorage.getItem('selectedACUnitId');
      const selectedDate = date || new Date().toISOString().split('T')[0];

      if (!acUnitId) {
        setError('No AC Unit ID found in session.');
        setLoading(false);
        return;
      }

      try {
        const logsResponse = await axios.get(`http://localhost:8090/log/by-ac-unit/${acUnitId}?date=${selectedDate}`);
        setLogs(logsResponse.data);

        // Calculate total hours
        const totalHours = logsResponse.data.reduce((acc, log) => acc + calculateTotalHours(log.fromTime, log.toTime), 0);
        setTotalHoursConsumed(totalHours);

        // Fetch technician's total hours
        const technicianId = sessionStorage.getItem('technicianId');
        if (technicianId) {
          const technicianResponse = await axios.get(`http://localhost:8090/tech/${technicianId}`);
          const technicianTotalHours = technicianResponse.data.totalHours; // Assuming 'totalHours' field exists in the response
          
          console.log('Technician Total Hours:', technicianTotalHours); // Debug log

          if (technicianTotalHours >= 8) {
            setShowAlert(true);
          }
        }
      } catch (error) {
        setError('Failed to fetch logs or technician data');
        console.error('Error fetching logs or technician data:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, [date]);

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
          date: new Date().toISOString().split('T')[0], // Set date to today
          purpose: '',
        });
      }
    }
  }, [isModalOpen]);

  useEffect(() => {
    const calculateDifference = () => {
      if (logData.fromTime && logData.toTime) {
        const from = new Date(logData.fromTime);
        const to = new Date(logData.toTime);
        const differenceInMs = to - from;
        const differenceInHours = differenceInMs / (1000 * 60 * 60);
        setHoursDifference(differenceInHours);
      } else {
        setHoursDifference(0);
      }
    };

    calculateDifference();
  }, [logData.fromTime, logData.toTime]);

  const handleDateChange = (event) => {
    setDate(event.target.value);
  };

  const calculateTotalHours = (fromTime, toTime) => {
    if (fromTime && toTime) {
      const from = new Date(fromTime);
      const to = new Date(toTime);
      const differenceInMs = to - from;
      const differenceInHours = differenceInMs / (1000 * 60 * 60);
      return differenceInHours;
    }
    return 0;
  };

  const handleBookNow = async () => {
    if (totalHoursConsumed >= 8) {
      try {
        console.log('Current Total Hours:', totalHoursConsumed); // Debug log
        const newTotalHours = totalHoursConsumed - 8;
        console.log('New Total Hours:', newTotalHours); // Debug log

        setTotalHoursConsumed(newTotalHours);

        const technicianId = sessionStorage.getItem('technicianId');
        if (technicianId) {
          const response = await axios.put(`http://localhost:8090/tech/${technicianId}/update-hours`, null, {
            params: { totalHours: newTotalHours.toFixed(2) },
          });
          console.log('Backend Response:', response.data); // Debug log
        }

        navigate('/periodicservice');
      } catch (error) {
        console.error('Error updating total hours:', error);
      }
    } else {
      alert('Not enough hours to book now.');
    }
  };

  const handleCloseAlert = () => {
    setShowAlert(false);
  };

  const handleViewStatistics = () => {
    setShowStatisticsModal(true);
  };

  const handleCloseStatisticsModal = () => {
    setShowStatisticsModal(false);
  };

  const handleAddLog = async () => {
    try {
      // Check for overlapping logs
      const overlappingLogs = logs.filter(log => 
        (new Date(log.fromTime) < new Date(logData.toTime) && new Date(logData.fromTime) < new Date(log.toTime))
      );

      if (overlappingLogs.length > 0) {
        alert('The selected time slot overlaps with an existing log.');
        return;
      }

      await axios.post('http://localhost:8090/log', logData);
      setIsModalOpen(false);
      // Optionally refresh the log list or handle success
    } catch (error) {
      console.error('Error adding log:', error);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLogData({ ...logData, [name]: value });
  };

  const getBarGraphData = () => {
    const labels = selectedDateLogs.map(log => new Date(log.date).toLocaleDateString());
    const data = selectedDateLogs.map(log => calculateTotalHours(log.fromTime, log.toTime));

    return {
      labels,
      datasets: [
        {
          label: 'Hours Consumed',
          data,
          backgroundColor: 'rgba(75, 192, 192, 0.2)',
          borderColor: 'rgba(75, 192, 192, 1)',
          borderWidth: 1,
        },
      ],
    };
  };

  const handleCalculateTotalHours = async () => {
    const totalHours = logs.reduce((acc, log) => acc + calculateTotalHours(log.fromTime, log.toTime), 0);
    setTotalHoursConsumed(totalHours);
    sessionStorage.setItem('totalHoursConsumed', totalHours.toFixed(2));

    try {
      const technicianId = sessionStorage.getItem('technicianId');
      if (technicianId) {
    const technicianResponse = await axios.get(`http://localhost:8090/tech/${technicianId}`);
    const technicianTotalHours = technicianResponse.data.totalHoursConsumed;

    const newTotalHours = totalHours - technicianTotalHours


       await axios.put(`http://localhost:8090/tech/${technicianId}/update-hours`, null, {
        //   params: { totalHours: totalHours.toFixed(2) }
        params: { totalHours: newTotalHours.toFixed(2) }
        });
        console.log('Total hours updated successfully');
      }
    } catch (error) {
      console.error('Error updating total hours:', error);
    }
  };

  const handleViewLogsForSelectedDate = async () => {
    const acUnitId = sessionStorage.getItem('selectedACUnitId');
    if (!acUnitId) {
      setError('No AC Unit ID found in session.');
      return;
    }

    try {
      const response = await axios.get(`http://localhost:8090/log/by-ac-unit/${acUnitId}?date=${date}`);
      setSelectedDateLogs(response.data);
      handleViewStatistics();
    } catch (error) {
      setError('Failed to fetch logs for the selected date');
      console.error('Error fetching logs for selected date:', error);
    }
  };

  if (loading) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl">Loading...</div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="flex justify-center items-center h-screen">
        <div className="text-xl text-red-500">{error}</div>
      </div>
    );
  }

  return (
    <div>
      <CommonNavbar />
      <div className="container mx-auto p-4">
        <h1 className="text-2xl font-bold mb-4">Tech View Log</h1>

        <div className="my-4">
          <label htmlFor="date" className="block text-sm font-medium text-gray-700">Select Date</label>
          <input
            type="date"
            id="date"
            value={date}
            onChange={handleDateChange}
            className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
          />
        </div>

        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-semibold">Total Hours Consumed: {totalHoursConsumed.toFixed(2)} hours</h3>
          <button
            onClick={() => setIsModalOpen(true)}
            className="text-blue-500 hover:text-blue-700"
          >
            <PlusIcon className="h-6 w-6" />
          </button>
        </div>

        <div className="flex justify-between mb-4">
          <button
            onClick={handleCalculateTotalHours}
            className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
          >
            Calculate Total
          </button>
          <button
            onClick={handleBookNow}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
          >
            Book Now
          </button>
        </div>

        <div className={`overflow-x-auto ${totalHoursConsumed === 0 ? 'hidden' : ''}`}>
          <table className="min-w-full divide-y divide-gray-200">
            <thead className="bg-gray-50">
              <tr>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Time</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th> {/* New column */}
              </tr>
            </thead>
            <tbody className="bg-white divide-y divide-gray-200">
              {logs.map((log) => (
                <tr key={log.id}>
                  <td className="px-6 py-4 whitespace-nowrap text-sm font-medium text-gray-900">{log.id}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.fromTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.toTime}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.date}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{log.purpose}</td>
                  <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calculateTotalHours(log.fromTime, log.toTime).toFixed(2)} hours</td> {/* New field */}
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {showAlert && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h3 className="text-lg font-semibold">Warning</h3>
              <p className="mt-2">Total hours consumed has reached 8 or more.</p>
              <div className="mt-4 flex justify-end">
                <button onClick={handleCloseAlert} className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600">
                  Close
                </button>
              </div>
            </div>
          </div>
        )}

        {showStatisticsModal && (
          <Dialog open={showStatisticsModal} onClose={handleCloseStatisticsModal}>
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <Dialog.Title className="text-xl font-semibold">Statistics</Dialog.Title>
              <div className="mt-4">
                <Bar data={getBarGraphData()} />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleCloseStatisticsModal}
                  className="px-4 py-2 bg-blue-500 text-white rounded-md shadow-md hover:bg-blue-600"
                >
                  Close
                </button>
              </div>
            </div>
          </Dialog>
        )}

        {isModalOpen && (
          <div className="fixed inset-0 flex items-center justify-center z-50">
            <div className="bg-white p-6 rounded-lg shadow-lg">
              <h2 className="text-xl font-semibold">Add Log</h2>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">AC Unit ID</label>
                <input
                  type="text"
                  name="acUnitId"
                  value={logData.acUnitId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                   // Make AC Unit ID read-only
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Technician ID</label>
                <input
                  type="text"
                  name="technicianId"
                  value={logData.technicianId}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                   // Make Technician ID read-only
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">From Time</label>
                <input
                  type="datetime-local"
                  name="fromTime"
                  value={logData.fromTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">To Time</label>
                <input
                  type="datetime-local"
                  name="toTime"
                  value={logData.toTime}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Date</label>
                <input
                  type="date"
                  name="date"
                  value={logData.date}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  readOnly // Make date read-only
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Purpose</label>
                <textarea
                  name="purpose"
                  value={logData.purpose}
                  onChange={handleInputChange}
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm"
                  rows="3"
                />
              </div>
              <div className="mt-4">
                <label className="block text-sm font-medium text-gray-700">Hours Difference</label>
                <input
                  type="text"
                  value={`${hoursDifference.toFixed(2)} hours`}
                  readOnly
                  className="mt-1 block w-full border border-gray-300 rounded-md shadow-sm bg-gray-100"
                />
              </div>
              <div className="mt-4 flex justify-end">
                <button
                  onClick={handleAddLog}
                  className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
                >
                  Add Log
                </button>
              </div>
            </div>
          </div>
        )}
      </div>
      <br />
      <br />
      <br />
      <br />
      <br />
      <FooterPage />
    </div>
  );
};

export default TechViewLogPage;

