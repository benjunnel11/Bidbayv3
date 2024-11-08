import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './bidderhomepage.css';
import EWalletManagement from '../../E-WalletManagement/Wallet';
import Sidebar from './Sidebar';
import { auth, firestore, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';


function BidderHomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [profilePicture, setProfilePicture] = useState(null);

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
<div className="profile-container" onClick={handleProfileManagement}>
        <h3>{userName}</h3>
    <div className="profile-image">
    <img src={profilePictureURL || 'default-avatar.png'} alt="Profile" />
  </div>
</div>

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
