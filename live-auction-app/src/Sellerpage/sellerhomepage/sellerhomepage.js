import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './sellerhomepage.css';

function SellerHomePage() {
  const navigate = useNavigate();
  const [isNavOpen, setIsNavOpen] = useState(false);
  const [showLogoutModal, setShowLogoutModal] = useState(false);

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
        <div className="profile-container">
          <div className="profile-image"></div>
        </div>
        
        <div className={`nav-toggle ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
          <span></span>
          <span></span>
          <span></span>
        </div>
        <nav className={`side-nav ${isNavOpen ? 'open' : ''}`}>
          <button className="dashboard-button" onClick={handleAddNewItem}>Add new Item</button>
          <button className="dashboard-button" onClick={handleViewItems}>View My Items</button>
          <button className="dashboard-button" onClick={handleViewSales}>View Sales Analytics</button>
          <button className="dashboard-button logout" onClick={handleLogoutClick}>Logout</button>
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
