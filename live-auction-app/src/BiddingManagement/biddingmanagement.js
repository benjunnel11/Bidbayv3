import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { doc, getDoc } from 'firebase/firestore';
import { firestore, auth } from '../firebase';  // Import Firebase auth
import './biddingmanagement.css';

function Biddingpage() {
  // State for auction info
  const [managementText, setManagementText] = useState("BIDDING MANAGEMENT");
  const [historyText, setHistoryText] = useState("HISTORY");

  // User profile data state
  const [userProfile, setUserProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  const [userId, setUserId] = useState(null); // Track user ID dynamically
  const navigate = useNavigate();

  // Fetching user ID from Firebase Authentication
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        console.log("User ID: ", user.uid);  // Check if user ID is being set
        setUserId(user.uid);
      } else {
        setUserId(null); // Handle if no user is logged in
      }
    });
  
    return () => unsubscribe();
  }, []);

  // Fetch user profile data from Firestore when userId changes
  useEffect(() => {
    if (userId) {
      const fetchUserProfile = async () => {
        try {
          const docRef = doc(firestore, 'users', userId);  // Make sure 'users' is the correct collection
          const docSnap = await getDoc(docRef);
          if (docSnap.exists()) {
            setUserProfile(docSnap.data());  // Set profile data
          } else {
            console.log("No such document!");
          }
        } catch (error) {
          console.error("Error fetching user profile:", error);
        }
      };

      fetchUserProfile();
    }
  }, [userId]); // Trigger fetching when userId changes

  return (
    <div className="bidding-page">
      {/* Return Button */}
      <button 
        className="return-button" 
        onClick={() => navigate('/bidderhomepage')} // Navigate to Homepage
      >
        ←
      </button>

      {/* Header Section */}
      <header className="header">
        <h1>{historyText}</h1>
      </header>

      {/* User Profile Information */}
      <div className="user-profile">
        <h2>User Profile</h2>
        <p>First Name: {userProfile.firstName}</p>
        <p>Last Name: {userProfile.lastName}</p>
        <p>Email: {userProfile.email}</p>
        <p>Phone: {userProfile.phone}</p>
        <p>Address: {userProfile.address}</p>
      </div>

      {/* Auction History Table */}
      <div className="auction-history">
        <h3>Auction History:</h3>
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
            {/* Sample Data - Replace with actual Firebase data */}
            <tr>
              <td>1</td>
              <td>Isaac</td>
              <td>1</td>
              <td>99</td>
              <td>Painting</td>
              <td>20,000</td>
              <td><button>Choose Payment</button></td>
              <td>Old</td>
              <td>Notes</td>
            </tr>
            {/* Additional rows here */}
          </tbody>
        </table>
      </div>
    </div>
  );
}

export default Biddingpage;