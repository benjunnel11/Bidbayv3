import React, { useState } from 'react';
import { auth, firestore } from '../../firebase';
import { doc, setDoc } from 'firebase/firestore';
import { useNavigate } from 'react-router-dom';
import './bidderregistration.css'; // Ensure styling is consistent
import { IoCloseSharp } from "react-icons/io5";

const BidderRegistrationPage2 = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [gender, setGender] = useState('');
  const [birthdate, setBirthdate] = useState('');
  const [address, setAddress] = useState('');
  const [balance] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const uid = auth.currentUser?.uid; // Get the UID of the currently authenticated user
  const username = localStorage.getItem('username'); // Retrieve username from localStorage
  const email = localStorage.getItem('email'); // Retrieve email from localStorage

  const onClose = () => {
    navigate(-1);
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');

    if (!uid) {
      setError("User not authenticated.");
      return;
    }

    try {
      // Save personal info along with username and email to the bidderUser collection
      await setDoc(doc(firestore, 'userBidder', uid), {
        firstName,
        lastName,
        gender,
        birthdate,
        address,
        balance,
        email,
        username,
        mode: "",
        wallet: "",
        refID: "",
        number: "",
        amount: "",
        transactionHistory: [],
        date: new Date().toISOString(),
      });

      // Clear localStorage after successful registration
      localStorage.removeItem('username');
      localStorage.removeItem('email');

      navigate('/login'); // Redirect to login or another page after successful registration

    } catch (error) {
      console.error("Error saving user info:", error);
      setError(error.message);
    }
  };

  return (
    <div className="bidder-registration">
      <div className="registration-page">
        {error && <p className="error-message">{error}</p>}
        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="First Name"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Last Name"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Gender"
            value={gender}
            onChange={(e) => setGender(e.target.value)}
            required
          />
          <input
            type="date"
            value={birthdate}
            onChange={(e) => setBirthdate(e.target.value)}
            required
          />
          <input
            type="text"
            placeholder="Address"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            required
          />
          <button type="submit">Submit</button>
          <button onClick={onClose}>
  <IoCloseSharp /> Close
</button>
        </form>
      </div>
    </div>
  );
};

export default BidderRegistrationPage2;
