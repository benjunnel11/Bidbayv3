import React, { useEffect, useState } from 'react';
import { useNavigate } from 'react-router-dom'; // For navigation
import { firestore, auth } from '../firebase'; // Adjust the path based on your structure
import { collection, query, where, onSnapshot } from 'firebase/firestore';
import './itemmanagement.css';

const ItemManagement = () => {
  const [items, setItems] = useState([]);
  const [loading, setLoading] = useState(true);
  const navigate = useNavigate(); // Hook for navigation

  useEffect(() => {
    // Get the current authenticated user
    const user = auth.currentUser;

    if (user) {
      // Reference to the Firestore collection
      const itemsRef = collection(firestore, 'auctionItems');

      // Query for items added by the authenticated user
      const q = query(itemsRef, where("username", "==", user.displayName || user.email));

      // Real-time listener for items
      const unsubscribe = onSnapshot(q, (querySnapshot) => {
        const userItems = querySnapshot.docs.map((doc) => ({
          id: doc.id,
          ...doc.data(),
        }));
        setItems(userItems);
        setLoading(false);
      });

      // Cleanup listener on component unmount
      return () => unsubscribe();
    } else {
      // If no user is authenticated, clear items
      setItems([]);
      setLoading(false);
    }
  }, []);

  if (loading) {
    return <div>Loading items...</div>;
  }

  if (items.length === 0) {
    return <div>No items found for your account.</div>;
  }

  return (
    <div className="homepage">
      <div className="header">
        <h2>Your Auction Items</h2>
        <div>
          <button
            className="back-button"
            onClick={() => navigate('/sellerhomepage')} // Navigate to the Seller Homepage
          >
            Back
          </button>
          <button
            className="add-item-button"
            onClick={() => navigate('/additemspage')} // Navigate to the Add Items page
          >
            Add New Item
          </button>
        </div>
      </div>

      <div className="items-list">
        {items.map((item) => (
          <div className="item-card" key={item.id}>
            <img src={item.imageUrl} alt={item.name} className="item-image" />
            <h3>{item.name}</h3>
            <p>Initial Price: ${item.initialPrice.toFixed(2)}</p>
            <p>Time Span: {item.timeSpan}</p>
            <p>Quantity: {item.quantity}</p>
            <p>Highest Bidder: {item.highestBidder}</p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default ItemManagement;