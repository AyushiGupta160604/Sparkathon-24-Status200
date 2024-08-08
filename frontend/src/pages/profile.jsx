import React, { useState } from 'react';
import './css/profile.css';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <h1>User Profile</h1>
            </div>
            <div className="profile-content">
                <div className="profile-sidebar">
                    <img src="profile-pic.jpg" alt="Profile" className="profile-pic" />
                    <h2 id="userName">John Doe</h2>
                    <p id="userEmail">Email: john.doe@example.com</p>
                    <p id="userPhone">Phone: +1 234 567 8901</p>
                    <button className="edit-profile-btn">Edit Profile</button>
                </div>
                <div className="profile-main">
                    <h2>Order History</h2>
                    <ul className="order-history">
                        <li>Order #1234 - $49.99</li>
                        <li>Order #1235 - $79.99</li>
                        <li>Order #1236 - $29.99</li>
                    </ul>
                    <h2>Saved Items</h2>
                    <ul className="saved-items">
                        <li>Item 1</li>
                        <li>Item 2</li>
                        <li>Item 3</li>
                    </ul>
                </div>
            </div>
        </div>
    );
};

export default Profile;
