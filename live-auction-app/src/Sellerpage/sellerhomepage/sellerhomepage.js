import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sellerhomepage.css';
import { FaVideo } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { FaShoppingCart } from "react-icons/fa";
import { IoMdAdd } from "react-icons/io";

function SellerHomePage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

  const [stream, setStream] = useState(null);



{stream && (
  <div className="webcam-container">
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


  const toggleNav = () => {
    setIsNavOpen(!isNavOpen);
  };

  const handleGoLive = async () => {
    try {
      const mediaStream = await navigator.mediaDevices.getUserMedia({ video: true });
      setStream(mediaStream);
    } catch (error) {
      console.error('Error accessing webcam:', error);
    }
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
        <div className="profile-container">
          <div className="profile-image"></div>
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
          <button className="dashboard-button logout" onClick={handleLogoutClick}>Logout</button>
          <button className="dashboard-button" onClick={handleGoLive}>
    <FaVideo /> Go Live
  </button>
        </nav>
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