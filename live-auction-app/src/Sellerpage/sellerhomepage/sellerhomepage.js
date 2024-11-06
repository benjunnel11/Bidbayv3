import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sellerhomepage.css';
import EWalletManagement from '../../E-WalletManagement/Wallet';
import Sidebar from './Sidebar';

function SellerHomePage() {
    const navigate = useNavigate();
    const [showLogoutModal, setShowLogoutModal] = useState(false);
    const [profilePicture, setProfilePicture] = useState(null);
    const [userName, setUserName] = useState("John Doe");
    const [currentContent, setCurrentContent] = useState('dashboard');

    const handleWallet = () => {
        setCurrentContent('wallet');
    };

    const handleLogoutClick = () => {
        setShowLogoutModal(true);
    };

    const handleLogoutConfirm = () => {
        setShowLogoutModal(false);
        navigate('/login');
    };

    const handleLogoutCancel = () => {
        setShowLogoutModal(false);
    };

    return (
        <div className="App">
            <Sidebar 
                onWalletClick={handleWallet}
                onLogoutClick={handleLogoutClick}
            />
            <div className="main-section">
                <div className="top-bar">
                    <div className="balance-container">
                        <div className="balance-indicator">
                            <span className="balance-amount">$ 0.00</span>
                        </div>
                    </div>  
                    <div className="profile-container">
                        <h3>{userName}</h3>
                        <div className="profile-image">
                            <img src={profilePicture || 'default-avatar.png'} alt="Profile" />
                        </div>
                    </div>
                </div>
                <div className="content-container">
                    <div className="main-content">
                        {currentContent === 'wallet' && <EWalletManagement />}
                    </div>
                </div>
            </div>

            {showLogoutModal && (
                <div className="modal-overlay">
                    <div className="modal">
                        <h3>Confirm Logout</h3>
                        <p>Are you sure you want to quit?</p>
                        <div className="modal-buttons">
                            <button onClick={handleLogoutConfirm}>Yes, Logout</button>
                            <button onClick={handleLogoutCancel}>Cancel</button>
                        </div>
                    </div>
                </div>
            )}
        </div>
    );
}

export default SellerHomePage;
