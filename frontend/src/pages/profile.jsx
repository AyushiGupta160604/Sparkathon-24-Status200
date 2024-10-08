import React, { useState, useEffect } from 'react';
import './css/profile.css';

const Profile = () => {
    const [userData, setUserData] = useState(null);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchProfile = async () => {
            try {
                const token = localStorage.getItem('token'); // Get token from local storage
                const response = await fetch('http://localhost:7000/api/profile', {
                    headers: {
                        'Authorization': `Bearer ${token}` // Include token in request headers
                    }
                });

                if (!response.ok) {
                    throw new Error(`HTTP error! status: ${response.status}`);
                }

                const data = await response.json();
                setUserData(data);
                setLoading(false);
            } catch (error) {
                console.error("Failed to fetch profile", error);
                setError(error.message);
                setLoading(false);
            }
        };

        fetchProfile();
    }, []);

    const handleSignOut = () => {
        // Clear localStorage
        localStorage.removeItem('token');
        localStorage.removeItem('firstname');
        localStorage.removeItem('lastname');
        localStorage.removeItem('email');
        localStorage.removeItem('CountryCode');
        localStorage.removeItem('phone');
        localStorage.removeItem('userId');
        
        // Redirect to login page
        window.location.href = '/login';
    };

    if (loading) return <div>Loading...</div>;
    if (error) return <div>Error: {error}</div>;
    if (!userData) return <div>No user data available</div>;

    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User Profile</h1>
            </div>
            <div className="profile-content">
                <div className="profile-sidebar">
                    <h2 id="firstname">{userData.firstname}</h2>
                    <h2 id="lastname">{userData.lastname}</h2>
                    <p id="userEmail">Email: {userData.email}</p>
                    <p id="countryCode">Country Code: {userData.countryCode}</p>
                    <p id="userPhone">Phone: {userData.phone}</p>
                    <button className="edit-profile-btn">Edit Profile</button>
                </div>
            </div>
            <button className="signout-button" onClick={handleSignOut}>Sign Out</button>
        </div>
    );
};

export default Profile;
