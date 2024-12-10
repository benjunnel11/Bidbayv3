import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaList, FaVideo, FaWallet, FaSignOutAlt, FaDesktop, FaTimes } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdStats } from "react-icons/io";
import './Sidebar.css';

function Sidebar({ onWalletClick, onLogoutClick, isVisible, onCloseSidebar }) {
  const navigate = useNavigate();

  const handleDashboard = () => {
    navigate('/dashboard');
  };

  const handleViewProfile = () => {
    navigate('/profilemanagement');
  };

  const handleWatchLive = () => {
    navigate('/watchlive');
  };

  const handleBidHistory = () => {
    navigate('/biddingmanagement');
  };

  return (
    <nav className={`side-nav ${isVisible ? 'show' : ''}`}>
      {/* Close button inside sidebar */}
      <button className="close-btn" onClick={onCloseSidebar}>
        <FaTimes />
      </button>

      <button className="dashboard-button" onClick={handleDashboard}>
        <IoMdStats /> Dashboard
      </button>
      <button className="dashboard-button" onClick={handleViewProfile}>
        <IoPersonSharp /> Profile
      </button>
      <button className="dashboard-button" onClick={handleWatchLive}>
        <FaDesktop /> Watch Live
      </button>
      <button className="dashboard-button" onClick={onWalletClick}>
        <FaWallet /> E-Wallet
      </button>
      <button className="dashboard-button" onClick={handleBidHistory}>
        <FaList /> Bid History
      </button>
      <button className="dashboard-button logout" onClick={onLogoutClick}>
        <FaSignOutAlt /> Logout
      </button>
    </nav>
  );
}

export default Sidebar;