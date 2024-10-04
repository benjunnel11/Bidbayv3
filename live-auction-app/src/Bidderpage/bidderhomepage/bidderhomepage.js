import React from 'react';
import { useNavigate } from 'react-router-dom';
import './bidderhomepage.css'; // Import CSS for styling

function SellerHomePage() {
  const navigate = useNavigate();

  const handleAddNewItem = () => {
    navigate('/addnewitem');
  };

  const handleViewItems = () => {
    navigate('/viewitems');
  };

  const handleViewSales = () => {
    navigate('/salesanalytics');
  };

  const handleLogout = () => {
    navigate('/login'); // Redirect to login page
  };

  return (
    <div className="App">
    <div className="bidder-homepage">
      <header className="header">
        <h2>Bidder Dashboard</h2>
      </header>

      <div className="buttons-container">
        <button className="dashboard-button" onClick={handleAddNewItem}>
          Add New Item
        </button>
        <button className="dashboard-button" onClick={handleViewItems}>
          View My Items
        </button>
        <button className="dashboard-button" onClick={handleViewSales}>
          View Sales Analytics
        </button>
        <button className="dashboard-button logout" onClick={handleLogout}>
          Logout
        </button>
      </div>
    </div>
    </div>
  );
}

export default SellerHomePage;
