import React, { useState, useEffect } from 'react';
import { auth, firestore, storage } from '../firebase'; // Ensure correct import paths
import { doc, getDoc, updateDoc } from 'firebase/firestore';
import { ref, uploadBytes, getDownloadURL } from 'firebase/storage';
import './profilemanagement.css'; // Import the CSS file
import { useNavigate } from 'react-router-dom';

function ProfileManagement() {
  const navigate = useNavigate();

  // State to hold user profile information
  const [profile, setProfile] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    address: ''
  });

  // State to manage profile picture
  const [profilePicture, setProfilePicture] = useState(null);
  const [profilePictureURL, setProfilePictureURL] = useState('');

  // State to manage loading and saving states
  const [isSaving, setIsSaving] = useState(false);
  const [isLoading, setIsLoading] = useState(true);

  // State to track user authentication status
  const [user, setUser] = useState(null);

  const onClose = () => {
    navigate(-1);
  };

  // Listen to authentication state change
  useEffect(() => {
    const unsubscribe = auth.onAuthStateChanged((user) => {
      if (user) {
        setUser(user); // Store the logged-in user
        fetchUserProfile(user.uid); // Fetch profile data
      } else {
        setUser(null); // User is logged out
        setProfile({ firstName: '', lastName: '', email: '', phone: '', address: '' });
        setProfilePictureURL(''); // Reset profile data on logout
      }
    });

    return () => unsubscribe(); // Clean up the listener on unmount
  }, []);

  // Fetch user profile data from Firestore
  const fetchUserProfile = async (uid) => {
    try {
      const userDoc = doc(firestore, 'userSeller', uid);
      const userSnap = await getDoc(userDoc);

      if (userSnap.exists()) {
        const userData = userSnap.data();
        setProfile({
          firstName: userData.firstName || '',
          lastName: userData.lastName || '',
          email: userData.email || '',
          phone: userData.phone || '',
          address: userData.address || ''
        });
        setProfilePictureURL(userData.profilePicture || '');
      } else {
        console.error("No user data found.");
      }
    } catch (error) {
      console.error("Error fetching user data:", error);
    } finally {
      setIsLoading(false);
    }
  };

  // Handle changes in input fields
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setProfile((prevProfile) => ({
      ...prevProfile,
      [name]: value
    }));
  };

  // Handle file selection for profile picture
  const handleFileChange = (e) => {
    const file = e.target.files[0];
    if (file) setProfilePicture(file);
  };

  // Handle profile picture upload to Firebase Storage
  const handleUploadPicture = async () => {
    if (!profilePicture || !user) {
      alert("Please select a profile picture to upload.");
      return;
    }

    try {
      const storageRef = ref(storage, `profilePictures/${user.uid}/${profilePicture.name}`);
      await uploadBytes(storageRef, profilePicture);
      const downloadURL = await getDownloadURL(storageRef);
      await updateDoc(doc(firestore, 'userSeller', user.uid), { profilePicture: downloadURL });
      setProfilePictureURL(downloadURL);
      alert("Profile picture uploaded successfully!");
    } catch (error) {
      console.error('Error uploading profile picture:', error);
      alert('Failed to upload profile picture. Please try again.');
    }
  };

  // Handle saving changes to Firestore
  const handleSaveChanges = async () => {
    if (!user) {
      alert("User is not authenticated.");
      return;
    }

    setIsSaving(true);

    try {
      const userDoc = doc(firestore, 'userSeller', user.uid);
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

  // Show loading state while fetching data
  if (isLoading) {
    return <div className="loading">Loading profile data...</div>;
  }

  return (
    <div className="profile-management-container">
      <h2>Profile Management</h2>

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
