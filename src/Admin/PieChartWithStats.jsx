import React from 'react';
import { Pie } from 'react-chartjs-2';
import { Chart as ChartJS, Title, Tooltip, Legend, ArcElement } from 'chart.js';


ChartJS.register(Title, Tooltip, Legend, ArcElement);

const PieChartWithStats = () => {
  const data = {
    labels: ['Red', 'Blue', 'Yellow', 'Green', 'Purple', 'Orange'],
    datasets: [
      {
        label: 'My First Dataset',
        data: [12, 19, 3, 5, 2, 3],
        backgroundColor: [
          'rgba(255, 99, 132, 0.2)',
          'rgba(54, 162, 235, 0.2)',
          'rgba(255, 206, 86, 0.2)',
          'rgba(75, 192, 192, 0.2)',
          'rgba(153, 102, 255, 0.2)',
          'rgba(255, 159, 64, 0.2)'
        ],
        borderColor: [
          'rgba(255, 99, 132, 1)',
          'rgba(54, 162, 235, 1)',
          'rgba(255, 206, 86, 1)',
          'rgba(75, 192, 192, 1)',
          'rgba(153, 102, 255, 1)',
          'rgba(255, 159, 64, 1)'
        ],
        borderWidth: 1,
      },
    ],
  };


  const options = {
    responsive: true,
    plugins: {
      legend: {
        position: 'top',
      },
      tooltip: {
        callbacks: {
          label: function (context) {
            let label = context.label || '';
            if (context.parsed !== null) {
              label += `: ${context.parsed}%`;
            }
            return label;
          },
        },
      },
    },
  };

  return (
    <div className="flex flex-col items-center p-6 bg-gray-100 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Pie Chart with Statistical Data</h2>
      <div className="w-full max-w-xs mb-6">
        <Pie data={data} options={options} />
      </div>
      <div className="w-full max-w-xs text-center">
        <p className="text-xl font-semibold mb-2">Total Entries: 41</p>
        <p className="text-sm text-gray-600">This chart represents the distribution of various categories in the dataset.</p>
        <div className="mt-4">
          <div className="mb-2">
            <span className="inline-block w-3 h-3 bg-red-500 mr-2 rounded-full"></span> Red: 29%
          </div>
          <div className="mb-2">
            <span className="inline-block w-3 h-3 bg-blue-500 mr-2 rounded-full"></span> Blue: 46%
          </div>
          <div className="mb-2">
            <span className="inline-block w-3 h-3 bg-yellow-500 mr-2 rounded-full"></span> Yellow: 7%
          </div>
          <div className="mb-2">
            <span className="inline-block w-3 h-3 bg-green-500 mr-2 rounded-full"></span> Green: 12%
          </div>
          <div className="mb-2">
            <span className="inline-block w-3 h-3 bg-purple-500 mr-2 rounded-full"></span> Purple: 5%
          </div>
          <div className="mb-2">
            <span className="inline-block w-3 h-3 bg-orange-500 mr-2 rounded-full"></span> Orange: 7%
          </div>
        </div>
      </div>
    </div>
  );
};

export default PieChartWithStats;
