import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaVideo, FaWallet, FaSignOutAlt, FaBoxOpen } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import './Sidebar.css';

function Sidebar({ isNavOpen, onWalletClick, onSalesClick, onLogoutClick, toggleNav }) {
    const navigate = useNavigate();

    const handleAddNewItem = () => {
        navigate('/addnewitems');
    };

    const onClickLive = () => {
        navigate('/golive');
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
                
                    <button className="dashboard-button" onClick={handleAddNewItem}>
                        <FaBoxOpen /> Item Management
                    </button>
                    <button className="dashboard-button" onClick={onClickLive}>
                        <FaVideo /> Go Live
                    </button>
                    <button className="dashboard-button" onClick={onWalletClick}>
                        <FaWallet /> E-Wallet
                    </button>
                    <button className="dashboard-button" onClick={onSalesClick}>
                        <SiGoogleanalytics /> Sales
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
