import React, { useState, useEffect } from 'react';
import { Bar } from 'react-chartjs-2';
import { Chart as ChartJS, CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend } from 'chart.js';
import axios from 'axios';
import CommonNavbar from './CommonNavbar';
import FooterPage from './Footer';

// Register Chart.js components
ChartJS.register(CategoryScale, LinearScale, BarElement, Title, Tooltip, Legend);

const ViewStatistics = () => {
  const [chartData, setChartData] = useState({});
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);
  const [dates, setDates] = useState([]);
  const [selectedDate, setSelectedDate] = useState('');

  const acUnitId = sessionStorage.getItem('selectedACUnitId');

  // Fetch available dates when component mounts or acUnitId changes
  useEffect(() => {
    const fetchDates = async () => {
      try {
        const response = await axios.get(`http://localhost:8090/log/by-ac-unit/${acUnitId}`);
        const logs = response.data;

        // Extract unique dates
        const uniqueDates = [...new Set(logs.map(log => log.date))];
        setDates(uniqueDates);
        
        // Set default date if available
        if (uniqueDates.length > 0) {
          setSelectedDate(uniqueDates[0]);
        }
      } catch (err) {
        setError(err.message);
      }
    };

    if (acUnitId) {
      fetchDates();
    }
  }, [acUnitId]);

  // Fetch logs based on the selected date
  useEffect(() => {
    const fetchLogs = async () => {
      if (!selectedDate) return;

      try {
        const response = await axios.get(`http://localhost:8090/log/by-ac-unit-and-date/${acUnitId}?date=${selectedDate}`);
        const logs = response.data;

        // Process the data
        const purposeMap = {};
        logs.forEach(log => {
          const purpose = log.purpose || 'Unspecified';
          const hours = log.totalHours || 0;
          purposeMap[purpose] = (purposeMap[purpose] || 0) + hours;
        });

        // Prepare data for chart
        const data = {
          labels: Object.keys(purposeMap),
          datasets: [{
            label: 'Hours Consumed',
            data: Object.values(purposeMap),
            backgroundColor: 'rgba(75, 192, 192, 0.2)',
            borderColor: 'rgba(75, 192, 192, 1)',
            borderWidth: 1,
          }],
        };

        setChartData(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchLogs();
  }, [acUnitId, selectedDate]);

  const handleDateChange = (event) => {
    setSelectedDate(event.target.value);
  };

  if (isLoading) return <div>Loading...</div>;
  if (error) return <div>Error: {error}</div>;

  return (
    <div style={{ background: 'linear-gradient(to right, #d0d0d0, #f0f0f0)', minHeight: '100vh' }}>
      <CommonNavbar />
      <div className="p-4">
        <h1 className="text-2xl font-semibold mb-4">AC Unit Statistics</h1>
        <div className="bg-white p-4 rounded shadow-md">
          <label htmlFor="date" className="block mb-2 text-sm font-medium text-gray-700">Select Date:</label>
          <select
            id="date"
            value={selectedDate}
            onChange={handleDateChange}
            className="block w-full p-2 border border-gray-300 rounded-md shadow-sm"
          >
            {dates.map((date) => (
              <option key={date} value={date}>
                {date}
              </option>
            ))}
          </select>
          <div className="mt-4">
            <Bar
              data={chartData}
              options={{
                responsive: true,
                plugins: {
                  title: {
                    display: true,
                    text: 'Hours Consumed by Purpose',
                  },
                  tooltip: {
                    callbacks: {
                      label: function (context) {
                        return `${context.label}: ${context.raw} hours`;
                      }
                    }
                  }
                },
                scales: {
                  x: {
                    title: {
                      display: true,
                      text: 'Purpose'
                    }
                  },
                  y: {
                    title: {
                      display: true,
                      text: 'Hours'
                    },
                    beginAtZero: true
                  }
                }
              }}
            />
          </div>
        </div>
      </div>
      <FooterPage />
    </div>
  );
};

export default ViewStatistics;
