import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import { auth, firestore, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import SellerWallet from '../../E-WalletManagement/Seller/Wallet';
import SalesManagement from '../../SalesManagement/Sales'
import BidBayLogo from '../../image/Bidbay.png';
import Sidebar from './Sidebar';
import './sellerhomepage.css';

function SellerHomePage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [currentContent, setCurrentContent] = useState('dashboard');
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
      const userDoc = doc(firestore, 'userSeller', uid);
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

  const handleAddNewItem = () => {
    navigate('/addnewitem');
  };

  const onWalletClick = () => {
    setCurrentContent('wallet');
  };

  const onSalesClick = () => {
    setCurrentContent('sales');
  };

  const onClickLive = () => {
    navigate('/golive');
  };

  const handleProfileManagement = () => {
    navigate('/profilemanagement');
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
      <div className="seller-homepage">
        {/* Profile Container */}
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
      
        <Sidebar 
            isNavOpen={isNavOpen}
            onWalletClick={() => setCurrentContent('wallet')}
            onSalesClick={() => setCurrentContent('sales')}
            onLogoutClick={handleLogoutClick}
            toggleNav={toggleNav}
        />

        <div className="content-container">
          <div className="main-content">            
            {currentContent === 'wallet' && <SellerWallet />}
            {currentContent === 'sales' && <SalesManagement />}
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
    </div>
  );
}

export default SellerHomePage
