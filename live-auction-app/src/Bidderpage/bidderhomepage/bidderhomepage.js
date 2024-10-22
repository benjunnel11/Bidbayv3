import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bidderhomepage.css';

function BidderHomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
    // Implement search functionality here
    console.log('Searching for:', searchTerm);
  };

  const handleViewAuctions = () => {
    navigate('/viewauctions');
  };

  const handleMyBids = () => {
    navigate('/mybids');
  };

  const handleWatchlist = () => {
    navigate('/watchlist');
  };

  const handleViewHistory = () => {
    navigate('/biddingmanagement'); // Navigate to the Bidding Management page
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bidder-homepage">
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
        <button onClick={handleLogout}>Logout</button>
      </div>

      <div className="content-wrapper">
        <div className="side-bar">
          <nav>
            <ul>
              <li onClick={handleViewAuctions}>View Auctions</li>
              <li onClick={handleMyBids}>My Bids</li>
              <li onClick={handleWatchlist}>Watchlist</li>
            </ul>
          </nav>
        </div>

        <div className="main-content">
          <header>
            <h2>Welcome back Bidder!</h2>
          </header>

          <div className="dashboard-content">
            <p>Welcome to your Bidder Dashboard!</p>
            {/* Add bidder-specific content here */}
          </div>
        </div>
      </div>
    </div>
  );
}

export default BidderHomePage;
