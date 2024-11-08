import React, { useState, useEffect } from 'react';
import { auth, firestore, storage } from '../firebase';
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './profilemanagement.css';
import { useNavigate } from 'react-router-dom';

function ProfileManagement({ profileType }) {
  const navigate = useNavigate();
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState('');
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);
  const [user, setUser] = useState(null);
  const [userType, setUserType] = useState('');

  const onClose = () => {
    navigate(-1);
  };

  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user);
        fetchUserProfile(user.uid);
      } else {
        setUser(null);
        resetProfile();
      }
    });

    return () => unsubscribe();
  }, []);

  const resetProfile = () => {
    setProfile({ firstName: '', lastName: '', email: '', phone: '', address: '' });
    setProfilePictureURL('');
  };

  const fetchUserProfile = async (uid) => {
    try {
      // Check in 'userSeller' collection first
      const sellerDoc = doc(firestore, 'userSeller', uid);
      const sellerSnap = await getDoc(sellerDoc);
      if (sellerSnap.exists()) {
        setUserType('userSeller');
        populateProfile(sellerSnap.data());
        return;
      }

      // If not in 'userSeller', check 'userBidder'
      const bidderDoc = doc(firestore, 'userBidder', uid);
      const bidderSnap = await getDoc(bidderDoc);
      if (bidderSnap.exists()) {
        setUserType('userBidder');
        populateProfile(bidderSnap.data());
      } else {
        console.error("User profile not found in either collection.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  const populateProfile = (userData) => {
    setProfile({
      firstName: userData.firstName || '',
      lastName: userData.lastName || '',
      email: userData.email || '',
      phone: userData.phone || '',
      address: userData.address || ''
    });
    setProfilePictureURL(userData.profilePicture || '');
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePicture(file);
  };

  const handleUploadPicture = async () => {
    if (!profilePicture || !user) {
      alert("Please select a profile picture to upload.");
      return;
    }

    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}/${profilePicture.name}`);
      await uploadBytes(storageRef, profilePicture);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(firestore, userType, user.uid), { profilePicture: downloadURL });
      setProfilePictureURL(downloadURL);
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture. Please try again.');
    }
  };

  const handleSaveChanges = async () => {
    if (!user || !userType) {
      alert("User is not authenticated or user type is not set.");
      return;
    }

    setIsSaving(true);

    try {
      const userDoc = doc(firestore, userType, user.uid);
      await updateDoc(userDoc, {
        ...profile,
        profilePicture: profilePictureURL
      });
      alert('Profile updated successfully!');
    } catch (error) {
      console.error('Error updating profile:', error);
      alert('Failed to update profile. Please try again.');
    } finally {
      setIsSaving(false);
    }
  };

  if (isLoading) {
    return <div className="loading">Loading profile data...</div>;
  }

  return (
    <div className="profile-management-container">
      <h2>{userType === 'userBidder' ? 'Bidder Profile Management' : 'Seller Profile Management'}</h2>

      <div className="profile-picture-container">
        <img src={profilePictureURL || 'default-avatar.png'} alt="Profile" className="profile-picture" />
        <input type="file" accept="image/*" onChange={handleFileChange} />
        <button className="upload-button" onClick={handleUploadPicture}>Upload Profile Picture</button>
      </div>

      <div className="profile-fields">
        <label>
          First Name:
          <input
            type="text"
            name="firstName"
            value={profile.firstName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Last Name:
          <input
            type="text"
            name="lastName"
            value={profile.lastName}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Email:
          <input
            type="email"
            name="email"
            value={profile.email}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Phone:
          <input
            type="text"
            name="phone"
            value={profile.phone}
            onChange={handleInputChange}
          />
        </label>

        <label>
          Address:
          <textarea
            name="address"
            value={profile.address}
            onChange={handleInputChange}
          />
        </label>

        <button className="save-button" onClick={handleSaveChanges} disabled={isSaving}>
          {isSaving ? 'Saving...' : 'Save Changes'}
        </button>
        <button className="save-button" onClick={onClose} disabled={isSaving}>
          {isSaving ? 'Going Back...' : 'Back to Homepage'}
        </button>
      </div>
    </div>
  );
}

export default ProfileManagement;
