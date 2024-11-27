import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaList, FaVideo, FaWallet, FaSignOutAlt } from "react-icons/fa";
import { SiGoogleanalytics } from "react-icons/si";
import { IoPersonSharp } from "react-icons/io5";
import { IoMdStats } from "react-icons/io";
import './Sidebar.css';

function Sidebar({ onWalletClick, onLogoutClick, isVisible, onCloseSidebar }) {
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
    
    const handleGoLive = () => {
        navigate('/golive');
    };

    return (
        <nav className="side-nav">
            <button className="dashboard-button" onClick={handleAddNewItem}>
                <IoMdStats /> Dashboard
            </button>
            <button className="dashboard-button" onClick={handleViewItems}>
                <IoPersonSharp /> Profile
            </button>
            <button className="dashboard-button" onClick={handleViewItems}>
                <FaList /> Items
            </button>
            <button className="dashboard-button" onClick={handleViewSales}>
                <SiGoogleanalytics /> Sales
            </button>
            <button className="dashboard-button" onClick={handleGoLive}>
                <FaVideo /> Go Live
            </button>
            <button className="dashboard-button" onClick={onWalletClick}>
                <FaWallet />  E-Wallet
            </button>
            <button className="dashboard-button logout" onClick={onLogoutClick}>
                <FaSignOutAlt /> Logout
            </button>
        </nav>
    );
}

export default Sidebar;
