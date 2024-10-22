import React, { useState } from 'react';
import { NavLink, useNavigate } from 'react-router-dom'; // Import useNavigate
import './biddingmanagement.css';

function Biddingpage() {
  // State for opening/closing dates and auction status
  const [openingDate, setOpeningDate] = useState("08/30/2024");
  const [closingDate, setClosingDate] = useState("09/30/2024");
  const [auctionStatus, setAuctionStatus] = useState("Open");
  const [managementText, setManagementText] = useState("BIDDING MANAGEMENT");
  const [historyText, setHistoryText] = useState("HISTORY");

  // Initialize useNavigate
  const navigate = useNavigate();

  return (
    <div className="bidding-page">
      {/* Header Section */}
      <header className="header">
        <h1>{managementText}</h1>
        <nav>
          <NavLink to="/manage-auction">Manage Auction</NavLink>
          <NavLink to="/auction-items">Auction Items</NavLink>
          <NavLink to="/report">Report</NavLink>
        </nav>
      </header>

      {/* Main Section */}
      <div className="main-section">
        <div className="auction-info">
          <div 
            className="editable-management-text" 
            contentEditable 
            suppressContentEditableWarning 
            onBlur={(e) => setManagementText(e.target.innerText)}
          >
            {managementText}
          </div>
          <div 
            className="editable-history-text" 
            contentEditable 
            suppressContentEditableWarning 
            onBlur={(e) => setHistoryText(e.target.innerText)}
          >
            {historyText}
          </div>

          <div className="auction-dates">
            {/* Editable dates for opening and closing packages */}
            <div className="opening-package">
              <label>Opening Package: </label>
              <input 
                type="date" 
                value={openingDate} 
                onChange={(e) => setOpeningDate(e.target.value)} 
              />
            </div>
            <div className="closing-package">
              <label>Closing Package: </label>
              <input 
                type="date" 
                value={closingDate} 
                onChange={(e) => setClosingDate(e.target.value)} 
              />
            </div>
            {/* Dropdown to toggle auction status */}
            <div className="auction-status">
              <label>Status: </label>
              <select 
                value={auctionStatus} 
                onChange={(e) => setAuctionStatus(e.target.value)}
              >
                <option value="Open">Open Auction</option>
                <option value="Close">Close Auction</option>
              </select>
            </div>
          </div>

          <div className="banner-image">
            {/* Placeholder for image */}
            <img src="./Image/BiddingImage.jpg" alt="Auction Banner" />
          </div>
        </div>

        {/* Bid Form Section */}
        <div className="bid-form">
          <h3>BID FORM</h3>
          <div className="bidder-info">
            <div className="bidder-row">
              <label>Name & Surname:</label>
              <input type="text" value="auto" readOnly />
              <label>Section:</label>
              <input type="text" value="auto" readOnly />
              <label>Position:</label>
              <input type="text" value="auto" readOnly />
            </div>
            <div className="bidder-row">
              <label>Account Number:</label>
              <input type="text" value="input" />
              <label>Phone Number:</label>
              <input type="text" value="auto" readOnly />
            </div>
          </div>

          {/* Auction History Table */}
          <h4>Auction History:</h4>
          <table className="auction-table">
            <thead>
              <tr>
                <th>Bid Number</th>
                <th>Seller Name</th>
                <th>Specification/Version</th>
                <th>Quantity</th>
                <th>Item</th>
                <th>Bidding Price</th>
                <th>Payment</th>
                <th>Condition</th>
                <th>Note</th>
              </tr>
            </thead>
            <tbody>
              {/* Sample Data */}
              <tr>
                <td>1</td>
                <td>Isaac</td>
                <td>1</td>
                <td>99</td>
                <td>Painting</td>
                <td>20.000</td>
                <td><button>Choose Payment</button></td>
                <td>Old</td>
                <td>Oh my god</td>
              </tr>
              <tr>
                <td>2</td>
                <td>Ramses</td>
                <td>2</td>
                <td>99</td>
                <td>Robotics</td>
                <td>40,000</td>
                <td><button>Choose Payment</button></td>
                <td>New</td>
                <td></td>
              </tr>
            </tbody>
          </table>

          {/* Options Button */}
          <div className="options-container">
            <button 
              className="options-button" 
              onClick={() => navigate('/bidderhomepage')} // Navigate to BidderHomePage
            >
              Back
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default Biddingpage;