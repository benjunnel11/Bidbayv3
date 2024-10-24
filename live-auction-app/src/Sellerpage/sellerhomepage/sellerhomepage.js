import React, { useState, useEffect, useRef } from 'react';
import { useNavigate } from 'react-router-dom';
import './sellerhomepage.css';
import { FaVideo } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";
import { FaSignOutAlt } from "react-icons/fa";

function SellerHomePage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [stream, setStream] = useState(null);
  const [userName, setUserName] = useState("John Doe"); // Example default value
  const [userEmail, setUserEmail] = useState("john@example.com"); // Example default value
  const [profilePicture, setProfilePicture] = useState(null);
  const webcamContainerRef = useRef(null);

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

  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleAddNewItem = () => {
    navigate('/addnewitem');
  };

  const handleViewItems = () => {
    navigate('/viewitems');
  };

  const handleViewSales = () => {
    navigate('/salesanalytics');
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
      <div className="profile-container" onClick={toggleModal}>
  <h3>{userName}</h3>
  <div className="profile-image">
    <img src={profilePicture || 'default-avatar.png'} alt="Profile" />
  </div>
</div>


        <div className={`nav-toggle ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>

        <nav className={`side-nav ${isNavOpen ? 'open' : ''}`}>
          <button className="dashboard-button" onClick={handleAddNewItem}><IoMdAdd />Add new Item</button>
          <button className="dashboard-button" onClick={handleViewItems}>
            <FaShoppingCart /> View My Items
          </button>
          <button className="dashboard-button" onClick={handleViewSales}>
            <SiGoogleanalytics /> Analytics
          </button>
          <button className="dashboard-button" onClick={handleGoLive}>
            <FaVideo /> Go Live
          </button>
          <button className="dashboard-button logout" onClick={handleLogoutClick}>
            <FaSignOutAlt /> Logout
          </button>
        </nav>

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

<div className={`profile-modal-overlay ${isModalOpen ? 'show' : ''}`}>
  <div className="profile-modal">
    <h2>Edit Profile</h2>
    <form className="profile-edit-form" onSubmit={handleFormSubmit}>
    <div className="profile-picture-upload">
  <img 
    src={profilePicture || 'default-avatar.png'} 
    alt="Profile" 
    className="profile-picture-preview"
  />
  <input 
    type="file" 
    accept="image/*" 
    id="profile-upload" 
    hidden 
    onChange={handleFileChange}
  />
  <button type="button" className="upload-button" onClick={handleUploadClick}>
    Upload New Picture
  </button>
</div>
      
      <input 
        type="text" 
        className="form-input" 
        placeholder="Full Name" 
        value={userName} 
        onChange={(e) => setUserName(e.target.value)}
      />
      
      <input 
        type="email" 
        className="form-input" 
        placeholder="Email" 
        value={userEmail} 
        onChange={(e) => setUserEmail(e.target.value)}
      />
      
      <div className="form-actions">
        <button type="button" className="cancel-button" onClick={toggleModal}>
          Cancel
        </button>
        <button type="submit" className="save-button">
          Save Changes
        </button>
      </div>
    </form>
  </div>
</div>
      </div>
    </div>
  );
}

export default SellerHomePage;
