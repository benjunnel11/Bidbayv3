import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bidderhomepage.css';
import EWalletManagement from '../../E-WalletManagement/Wallet';
import Sidebar from './Sidebar';


function BidderHomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const handleSearch = () => {
      setSearchTerm('search');
  };

  const handleViewAuctions = () => {
    navigate('/viewauctions');
  };

    const handleViewProfile = () => {
      navigate('/profile');
    };

  const handleWatchlist = () => {
    navigate('/watchlist');
  };

  const handleWallet = () => {
    setCurrentContent('wallet');
  };

  const handleViewHistory = () => {
    navigate('/bidhistory');
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
    <div className="bidder-homepage">
      <Sidebar 
            onWalletClick={handleWallet}
            onLogoutClick={handleLogoutClick}
        />
      <div className="top-bar">
        <h2>BidBay</h2>
        <form onSubmit={handleSearch}>
          <input
            type="text"
            placeholder="Search auctions..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
          />
          <button type="submit">Search</button>
        </form>
      </div>
          <div className="content-container">
            <div className="main-content">            
                          {currentContent === 'wallet' && <EWalletManagement />}
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

export default BidderHomePage;
