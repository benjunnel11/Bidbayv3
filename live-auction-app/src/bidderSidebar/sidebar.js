import React from 'react';
import './sidebar.css';
import { useHistory } from 'react-router-dom';

const Sidebar = () => {
  const history = useHistory();

  const handleNavigation = (path) => {
    history.push(path);
  };

  const handleLogout = () => {
    // Logic for logout (e.g., Firebase sign out)
  };

  return (
    <div className="sidebar">
      <div className="sidebar-options">
        <button onClick={() => handleNavigation('/home')}>Home</button>
        <button onClick={() => handleNavigation('/watch-live')}>Watch Live</button>
        <button onClick={() => handleNavigation('/bid-history')}>Bid History</button>
      </div>
      <div className="sidebar-logout">
        <button onClick={handleLogout}>Log Out</button>
      </div>
    </div>
  );
};

export default Sidebar;
