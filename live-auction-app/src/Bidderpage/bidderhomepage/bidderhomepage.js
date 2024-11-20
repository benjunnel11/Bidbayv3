import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import './bidderhomepage.css';
import EWalletManagement from '../../E-WalletManagement/Wallet';
import Sidebar from './Sidebar';
import { auth, firestore } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import BidBayLogo from '../../image/Bidbay.png';

function BidderHomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [profilePicture, setProfilePicture] = useState(null);

  // New state to manage sidebar visibility
  const [isSidebarVisible, setIsSidebarVisible] = useState(false);

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        fetchUserProfile(user.uid); // Fetch user profile
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = doc(firestore, 'userBidder', uid);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setUserName(userData.firstName); // Set username
        setUserEmail(userData.email); // Set email
        setProfilePictureURL(userData.profilePicture); // Set profile picture URL
      } else {
        console.error("No user data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

  // Toggle Sidebar visibility
  const toggleSidebar = () => {
    setIsSidebarVisible(!isSidebarVisible);
  };

  // Close Sidebar
  const closeSidebar = () => {
    setIsSidebarVisible(false);
  };

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

  const handleProfileManagement = () => {
    navigate('/profilemanagement');
  };

  return (
    <div className="bidder-homepage">
      {/* Profile container */}
      <div className="profile-container" onClick={handleProfileManagement}>
        <h3>{userName}</h3>
        <div className="profile-image">
          <img src={profilePictureURL || 'default-avatar.png'} alt="Profile" />
        </div>
      </div>

      {/* Pass visibility, close function, and other props to Sidebar */}
      <Sidebar 
        onWalletClick={handleWallet}
        onLogoutClick={handleLogoutClick}
        isVisible={isSidebarVisible} // Pass visibility
        onCloseSidebar={closeSidebar} // Pass the close function
      />

      <div className="top-bar">
        <div className="logo-container">
          <img 
            src={BidBayLogo}
            alt="BidBay Logo" 
            className="logo" 
            onClick={toggleSidebar} // Toggle sidebar on logo click
            style={{ cursor: 'pointer' }}
          />
        </div>
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

      {/* Logout modal */}
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
