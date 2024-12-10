import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore } from '../../firebase';
import { doc, getDoc } from 'firebase/firestore';
import BidderWallet from '../../E-WalletManagement/Bidder/bidderWallet';
import BidBayLogo from '../../image/Bidbay.png';
import SidebarB from './SidebarB';
import './bidderhomepage.css';

function BidderHomePage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [profilePictureURL, setProfilePictureURL] = useState('');

  const [userData, setUserData] = useState({
      name: '',
      email: '',
      profilePicture: '',
      balance: 0
  });

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
        const data = userSnap.data();
        setUserData({
          name: data.firstName,
          email: data.email,
          profilePicture: data.profilePicture,
          balance: data.balance || 0,
        });
        setProfilePictureURL(data.profilePicture || 'default-avatar.png'); // Use Firestore or default image
      } else {
        console.error("No user data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    }
  };

 const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

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

  const handleProfileManagement = () => {
    navigate('/profilemanagement');
  };

  return (
    <div className="bidder-homepage">
      {/* Profile container */}
      <div className="profile-container" onClick={handleProfileManagement}>
        <h3>{userData.name || "User Name"}</h3>
        <div className="profile-image">
          <img 
            src={profilePictureURL} 
            alt="Profile" 
            onError={(e) => e.target.src = 'default-avatar.png'} // Fallback for broken images
          />
        </div>
      </div>

      <div className="top-bar">
        <div className="logo-container">
          <img 
            src={BidBayLogo}
            alt="BidBay Logo" 
            className="logo" 
            style={{ cursor: 'pointer' }}
          />
        </div>
        <div className="balance-container">
          <h3>${userData.balance.toFixed(2)}</h3>
        </div>
      </div>

      <SidebarB 
        isNavOpen={isNavOpen}
        onWalletClick={() => setCurrentContent("wallet")}
        onLogoutClick={handleLogoutClick}
        toggleNav={toggleNav} 
      />

      <div className="content-container">
        <div className="main-content">            
          {currentContent === 'wallet' && <BidderWallet />}
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
