import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit } from 'react-icons/fa'; // Importing pencil icon from react-icons
import { useNavigate } from 'react-router-dom'; // Importing useNavigate for navigation
import CommonNavbar from './CommonNavbar';
import FooterPage from './Footer';

const ViewTechnicianDetails = () => {
    const [technician, setTechnician] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState('');
    const [profileImage, setProfileImage] = useState('');
    const [isEditingPassword, setIsEditingPassword] = useState(false);
    const [currentPassword, setCurrentPassword] = useState('');
    const [newPassword, setNewPassword] = useState('');
    const [confirmPassword, setConfirmPassword] = useState('');
    const [passwordVerificationError, setPasswordVerificationError] = useState('');
    const [passwordUpdateError, setPasswordUpdateError] = useState('');

    const technicianId = sessionStorage.getItem('technicianId'); // Assuming technician ID is stored in session
    const storedPassword = sessionStorage.getItem('passwordHash'); // Password should be securely handled and not stored in session
    const navigate = useNavigate(); // Initialize useNavigate

    useEffect(() => {
        const fetchTechnicianDetails = async () => {
            if (!technicianId) {
                setError('No technician ID found in session.');
                setLoading(false);
                return;
            }

            try {
                const response = await axios.get(`http://localhost:8090/tech/${technicianId}`);
                setTechnician(response.data);
                fetchProfileImage(response.data.id);
            } catch (error) {
                setError('Failed to fetch technician details');
                console.error('Error fetching technician details:', error);
            } finally {
                setLoading(false);
            }
        };

        const fetchProfileImage = async (id) => {
            try {
                const response = await axios.get(`http://localhost:8090/tech/image/${id}`);
                setProfileImage(`data:image/jpeg;base64,${response.data}`);
            } catch (error) {
                console.error('Error fetching technician image:', error);
            }
        };

        fetchTechnicianDetails();
    }, [technicianId]);

    const handlePasswordUpdate = async () => {
        // Clear errors
        setPasswordVerificationError('');
        setPasswordUpdateError('');

        // Verify new password and confirm password
        if (newPassword !== confirmPassword) {
            setPasswordUpdateError('New password and confirmation do not match.');
            return;
        }

        try {
            await axios.put(`http://localhost:8090/tech/${technicianId}/update-password`, { passwordHash: newPassword });
            alert('Password updated successfully');
            navigate('/login'); // Redirect to login page
        } catch (error) {
            console.error('Error updating password:', error);
            alert('Failed to update password');
        }
    };

    const handleCurrentPasswordVerification = () => {
        // Verify the current password
        if (currentPassword !== storedPassword) { // In practice, don't store passwords in session storage
            setPasswordVerificationError('Current password is incorrect.');
            return;
        }

        setPasswordVerificationError('');
        setIsEditingPassword(true); // Allow entering new password
    };

    if (loading) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-gray-500">Loading...</div>
            </div>
        );
    }

    if (error) {
        return (
            <div className="flex justify-center items-center h-screen">
                <div className="text-red-600">{error}</div>
            </div>
        );
    }

    return (
        <div style={{ background: 'linear-gradient(to right, #d0d0d0, #f0f0f0)', minHeight: '100vh' }}>
            <CommonNavbar />
            <br /><br /><br /><br />

            <div className="max-w-md mx-auto p-6 bg-white shadow-lg rounded-lg">
                <div className="flex flex-col items-center">
                    {/* Profile Image */}
                    <div className="mb-4">
                        <img
                            src={profileImage || 'https://via.placeholder.com/150'}
                            alt="Technician"
                            className="w-32 h-32 rounded-full object-cover border-4 border-gray-300"
                        />
                    </div>

                    {/* Technician Details */}
                    <div className="text-center">
                        <h2 className="text-2xl font-semibold mb-2 text-gray-800">{technician.name}</h2>
                        <p className="text-lg text-gray-600">Email: {technician.email}</p>

                        {/* Password Section */}
                        <div className="flex flex-col items-center mt-4">
                            {isEditingPassword ? (
                                <>
                                    {passwordVerificationError && (
                                        <p className="text-red-600 mb-2">{passwordVerificationError}</p>
                                    )}
                                    <div className="mb-4">
                                        <input
                                            type="password"
                                            placeholder="Enter current password"
                                            value={currentPassword}
                                            onChange={(e) => setCurrentPassword(e.target.value)}
                                            className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                                        />
                                        <button
                                            onClick={handleCurrentPasswordVerification}
                                            className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                        >
                                            Verify
                                        </button>
                                    </div>
                                    {passwordVerificationError === '' && (
                                        <>
                                            <div className="mb-4">
                                                <input
                                                    type="password"
                                                    placeholder="Enter new password"
                                                    value={newPassword}
                                                    onChange={(e) => setNewPassword(e.target.value)}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full mb-2"
                                                />
                                                <input
                                                    type="password"
                                                    placeholder="Confirm new password"
                                                    value={confirmPassword}
                                                    onChange={(e) => setConfirmPassword(e.target.value)}
                                                    className="border border-gray-300 rounded px-2 py-1 w-full"
                                                />
                                                {passwordUpdateError && (
                                                    <p className="text-red-600 mt-2">{passwordUpdateError}</p>
                                                )}
                                            </div>
                                            <button
                                                onClick={handlePasswordUpdate}
                                                className="px-4 py-2 bg-gray-500 text-white rounded hover:bg-gray-600"
                                            >
                                                Update
                                            </button>
                                        </>
                                    )}
                                </>
                            ) : (
                                <div className="flex items-center">
                                    <p className="text-lg text-gray-600 mr-2">Password: ••••••••</p>
                                    <button
                                        onClick={() => setIsEditingPassword(true)}
                                        className="text-blue-500 hover:text-blue-700"
                                    >
                                        <FaEdit />
                                    </button>
                                </div>
                            )}
                        </div>
                    </div>
                </div>
            </div>
            <br /><br /><br /><br /><br />
            <FooterPage />
        </div>
    );
};

export default ViewTechnicianDetails;
