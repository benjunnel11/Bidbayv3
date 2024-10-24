import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import './bidderhomepage.css';

function BidderHomePage() {
  const navigate = useNavigate();
  const [searchTerm, setSearchTerm] = useState('');

  const handleSearch = (e) => {
    e.preventDefault();
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
    navigate('/bidhistory');
  };

  const handleLogout = () => {
    navigate('/login');
  };

  return (
    <div className="bidder-homepage">
      {/* Top bar with BidBay title and centered search */}
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

      <div className="content-wrapper">
        {/* Sidebar */}
        <div className="side-bar">
          <ul>
            <li onClick={handleViewAuctions}>Home</li>
            <li onClick={handleWatchlist}>Watch Live</li>
            <li onClick={handleViewHistory}>Bid History</li>
            <li className="logout" onClick={handleLogout}>Logout</li>
          </ul>
        </div>

        {/* Main content */}
        <div className="main-content">
          <header>
            <h2>Welcome back Bidder!</h2>
          </header>
          <div className="dashboard-content">
            <p>Welcome to your Bidder Dashboard!</p>
          </div>
        </div>
      </div>
    </div>
  );
}

export default BidderHomePage;
