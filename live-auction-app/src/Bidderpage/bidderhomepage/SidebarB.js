import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaList, FaWallet, FaSignOutAlt, FaDesktop } from "react-icons/fa";
import { IoPersonSharp } from "react-icons/io5";
import './SidebarB.css';

function Sidebar({isNavOpen, toggleNav, onWalletClick, onLogoutClick}) {
  const navigate = useNavigate();

  const handleProfileManagement = () => {
    navigate('/profilemanagement');
  };

  const handleWatchLive = () => {
    navigate('/watchlive');
  };

  const handleBidHistory = () => {
    navigate('/biddingmanagement');  
  };

  return (
    <>
      <div>
        <nav className={`side-nav ${isNavOpen ? 'open' : ''}`}>
          <div className={`nav-toggle ${isNavOpen ? 'open' : ''}`} onClick={toggleNav}>
              <span></span>
              <span></span>
              <span></span>
          </div>

          <button className="dashboard-button" onClick={handleProfileManagement}>
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
      </div>
    </>
  );
}

export default Sidebar;