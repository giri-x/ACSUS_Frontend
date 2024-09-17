import React, { useState, useEffect } from 'react';
import axios from 'axios';
import pdfMake from 'pdfmake/build/pdfmake';
import pdfFonts from 'pdfmake/build/vfs_fonts';
import CommonNavbar from './CommonNavbar';
import FooterPage from './Footer';

pdfMake.vfs = pdfFonts.pdfMake.vfs; // Set up pdfMake with fonts

const TechReportPage = () => {
  const [logs, setLogs] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [totalHours, setTotalHours] = useState(0);

  useEffect(() => {
    const fetchLogs = async () => {
      const acUnitId = sessionStorage.getItem('selectedACUnitId');

      if (!acUnitId) {
        setError('No AC Unit ID found in session.');
        setLoading(false);
        return;
      }

      try {
        const response = await axios.get(`http://localhost:8090/log/by-ac-unit/${acUnitId}`);
        const fetchedLogs = response.data;
        setLogs(fetchedLogs);

        // Calculate total hours consumed
        const total = fetchedLogs.reduce((acc, log) => acc + calculateTotalHours(log.fromTime, log.toTime), 0);
        setTotalHours(total);
      } catch (error) {
        setError('Failed to fetch logs.');
        console.error('Error fetching logs:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchLogs();
  }, []);

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

  const generatePDF = () => {
    const docDefinition = {
      content: [
        { text: 'AC Unit Usage Report', style: 'header' },
        { text: `Generated on ${new Date().toLocaleDateString()}`, style: 'subheader' },
        {
          table: {
            headerRows: 1,
            widths: ['auto', '*', '*', '*', '*', '*'],
            body: [
              ['ID', 'From Time', 'To Time', 'Date', 'Purpose', 'Total Hours'],
              ...logs.map(log => [
                log.id,
                log.fromTime,
                log.toTime,
                log.date,
                log.purpose,
                calculateTotalHours(log.fromTime, log.toTime).toFixed(2)
              ]),
              [{ text: 'Total Hours Consumed:', colSpan: 5 }, {}, {}, {}, {}, totalHours.toFixed(2)] // Add total hours at the end
            ]
          }
        }
      ],
      styles: {
        header: {
          fontSize: 18,
          bold: true,
          margin: [0, 0, 0, 10]
        },
        subheader: {
          fontSize: 14,
          margin: [0, 0, 0, 5]
        },
        table: {
          margin: [0, 5, 0, 15]
        }
      }
    };

    pdfMake.createPdf(docDefinition).download('tech_report.pdf');
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
        <h1 className="text-2xl font-bold mb-4">AC Unit Usage Report</h1>
        <div className="mb-4">
          <button
            onClick={generatePDF}
            className="px-4 py-2 bg-green-500 text-white rounded-md shadow-md hover:bg-green-600"
          >
            Download PDF Report
          </button>
        </div>

        {logs.length > 0 && (
          <div className="overflow-x-auto">
            <table className="min-w-full divide-y divide-gray-200">
              <thead className="bg-gray-50">
                <tr>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">From Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">To Time</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Purpose</th>
                  <th className="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Total Hours</th>
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
                    <td className="px-6 py-4 whitespace-nowrap text-sm text-gray-500">{calculateTotalHours(log.fromTime, log.toTime).toFixed(2)}</td>
                  </tr>
                ))}
                <tr>
                  <td colSpan="5" className="px-6 py-4 text-right font-semibold">Total Hours Consumed:</td>
                  <td className="px-6 py-4 text-gray-900 font-semibold">{totalHours.toFixed(2)}</td>
                </tr>
              </tbody>
            </table>
          </div>
        )}
      </div>
      <FooterPage />
    </div>
  );
};

export default TechReportPage;

