import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import EWalletManagement from '../../E-WalletManagement/Wallet';
import './sellerhomepage.css';
import { FaVideo, FaWallet, FaSignOutAlt, FaBoxOpen } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { auth, firestore, storage } from '../../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import BidBayLogo from '../../image/Bidbay.png';

function SellerHomePage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [balance, setBalance] = useState('$0.00');
  const [currentContent, setCurrentContent] = useState('dashboard');
  const [stream, setStream] = useState(null);
  const [userName, setUserName] = useState();
  const [userEmail, setUserEmail] = useState();
  const [profilePicture, setProfilePicture] = useState(null);
  const webcamContainerRef = useRef(null);
  const [profilePictureURL, setProfilePictureURL] = useState('');

  const [userData, setUserData] = useState({
      name: '',
      email: '',
      profilePicture: '',
      balance: 0
  });

  const handleStopLive = () => {
    if (stream) {
      stream.getTracks().forEach(track => track.stop());
      setStream(null);
    }
  };

  const handleUploadClick = () => {
    document.getElementById('profile-upload').click();
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setProfilePicture(reader.result);
      };
      reader.readAsDataURL(file);
    }
  };

  const handleFormSubmit = (e) => {
    e.preventDefault();
    setUserName(userName);
    setIsModalOpen(false);
  };

  const toggleModal = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handleGoLive = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
  };

  useEffect(() => {
    if (stream && webcamContainerRef.current) {
      const videoElement = document.createElement('video');
      videoElement.srcObject = stream;
      videoElement.autoplay = true;
      videoElement.playsInline = true;
      webcamContainerRef.current.appendChild(videoElement);

      return () => {
        if (webcamContainerRef.current) {
          webcamContainerRef.current.innerHTML = '';
        }
      };
    }
  }, [stream]);

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

  const handleViewItems = () => {
    navigate('/viewitems');
  };

  const handleViewSales = () => {
    navigate('/salesanalytics');
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

        <div className={`nav-toggle ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`side-nav ${isNavOpen ? 'open' : ''}`}>
          <button className="dashboard-button" onClick={handleAddNewItem}>
            <FaBoxOpen /> Item Management
          </button>
          <button className="dashboard-button" onClick={handleGoLive}>
            <FaVideo /> Go Live
          </button>
          <button className="dashboard-button" onClick={onWalletClick}>
            <FaWallet /> E-Wallet
          </button>
          <button className="dashboard-button" onClick={handleViewSales}>
            <SiGoogleanalytics /> Analytics
          </button>
          <button className="dashboard-button logout" onClick={handleLogoutClick}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>

        <div className="content-container">
          <div className="main-content">            
            {currentContent === 'wallet' && <EWalletManagement />}
          </div>
        </div>

        <div ref={webcamContainerRef} className="webcam-container"></div>

        {stream && (
          <div className="camera-container">
            <div className="camera-header">
              <h3>Live Stream</h3>
              <button className="exit-button" onClick={handleStopLive}>X</button>
            </div>
            <video
              ref={(videoElement) => {
                if (videoElement) {
                  videoElement.srcObject = stream;
                }
              }}
              autoPlay
              playsInline
            />
          </div>
        )}

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
