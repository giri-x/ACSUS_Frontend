import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BarChart, Bar, XAxis, YAxis, Tooltip, CartesianGrid, Legend, PieChart, Pie, Cell } from 'recharts';
import SideNavbar from './SideNavbar'; 
const COLORS = ['#0088FE', '#00C49F', '#FFBB28', '#FF8042'];


const CARD_COLORS = ['#FFDDC1', '#CFFFCF', '#C6D9F1']; 

const AdminReport = () => {
    const [techCount, setTechCount] = useState(0);
    const [acUnitCount, setAcUnitCount] = useState(0);
    const [serviceRequestCount, setServiceRequestCount] = useState(0);
    const [totalHoursData, setTotalHoursData] = useState([]);
    const [pieChartData, setPieChartData] = useState([]);

    useEffect(() => {
        
        const fetchCounts = async () => {
            try {
                const techResponse = await axios.get('http://localhost:8090/tech/all');
                setTechCount(techResponse.data.length);

                const acResponse = await axios.get('http://localhost:8090/ac/all');
                setAcUnitCount(acResponse.data.length);

                const serviceRequestResponse = await axios.get('http://localhost:8090/api/service-requests/');
                setServiceRequestCount(serviceRequestResponse.data.length);
            } catch (error) {
                console.error('Error fetching counts:', error);
            }
        };

        
        const fetchTotalHoursData = async () => {
            try {
                const techResponse = await axios.get('http://localhost:8090/tech/all');
                const techs = techResponse.data;
                const data = techs.map(tech => ({
                    name: tech.name,
                    totalHours: tech.totalHoursConsumed || 0, // Replace with actual field if available
                }));
                setTotalHoursData(data);
            } catch (error) {
                console.error('Error fetching total hours data:', error);
            }
        };

        // Fetch pie chart data
        const fetchPieChartData = async () => {
            try {
                const data = [
                    { name: 'Technicians', value: techCount },
                    { name: 'AC Units', value: acUnitCount },
                    { name: 'Service Requests', value: serviceRequestCount },
                ];
                setPieChartData(data);
            } catch (error) {
                console.error('Error fetching pie chart data:', error);
            }
        };

        fetchCounts();
        fetchTotalHoursData();
        fetchPieChartData();
    }, [techCount, acUnitCount, serviceRequestCount]);

    return (
        <div className="flex">
            <SideNavbar /> {/* Add the SideNavbar component */}
            <main className="flex-1 p-8">
                <div className="grid grid-cols-1 sm:grid-cols-3 gap-4">
                    <div className="p-4 shadow rounded-lg" style={{ backgroundColor: CARD_COLORS[0] }}>
                        <h2 className="text-lg font-semibold">Technicians</h2>
                        <p className="text-3xl font-bold">{techCount}</p>
                    </div>
                    <div className="p-4 shadow rounded-lg" style={{ backgroundColor: CARD_COLORS[1] }}>
                        <h2 className="text-lg font-semibold">AC Units</h2>
                        <p className="text-3xl font-bold">{acUnitCount}</p>
                    </div>
                    <div className="p-4 shadow rounded-lg" style={{ backgroundColor: CARD_COLORS[2] }}>
                        <h2 className="text-lg font-semibold">Service Requests</h2>
                        <p className="text-3xl font-bold">{serviceRequestCount}</p>
                    </div>
                </div>
                <br></br>
                <br></br>
                <br></br>
                <br></br>
                <div className="mt-8 flex">
                    <div className="flex-1 mr-4">
                        <h2 className="text-xl font-semibold">Total Hours by Technician</h2>
                        <BarChart
                            width={600}
                            height={300}
                            data={totalHoursData}
                            margin={{ top: 20, right: 30, left: 20, bottom: 5 }}
                        >
                            <CartesianGrid strokeDasharray="3 3" />
                            <XAxis dataKey="name" />
                            <YAxis />
                            <Tooltip />
                            <Legend />
                            <Bar dataKey="totalHours" fill="#8884d8" />
                        </BarChart>
                    </div>
                    <div className="flex-1 ml-4">
                        <h2 className="text-xl font-semibold">Counts Overview</h2>
                        <PieChart width={400} height={400}>
                            <Pie
                                data={pieChartData}
                                dataKey="value"
                                nameKey="name"
                                cx="50%"
                                cy="50%"
                                outerRadius={150}
                                fill="#8884d8"
                                label
                            >
                                {pieChartData.map((entry, index) => (
                                    <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                                ))}
                            </Pie>
                            <Tooltip />
                        </PieChart>
                    </div>
                </div>
            </main>
        </div>
    );
};

export default AdminReport;
