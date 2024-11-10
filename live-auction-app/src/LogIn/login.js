import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth'; // Import fetchSignInMethodsForEmail
import { signInWithFacebook } from '../firebase';
import { signInWithGoogle } from '../firebase'; // Import Google login method
import { firestore } from '../firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';
import { FaFacebook } from "react-icons/fa6";
import { FaGoogle } from "react-icons/fa";
import { FaUser } from "react-icons/fa";
import { FiLogIn } from "react-icons/fi";
import { IoCloseSharp } from "react-icons/io5";


function LoginPage() {
  const [isBidderLogin, setIsBidderLogin] = useState(false);
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [error, setError] = useState('');
  const navigate = useNavigate();

  // Toggle between Seller and Bidder login forms
  const toggleLogin = () => {
    setIsBidderLogin(!isBidderLogin);
  };

  // Handle Manual Login
  const handleLogin = async () => {
    setError(''); // Clear previous errors
    try {
      const userCredential = await signInWithEmailAndPassword(auth, email, password);
      const uid = userCredential.user.uid;

      // Check the user type in Firestore based on the login type (seller or bidder)
      if (isBidderLogin) {
        const bidderDoc = await getDoc(doc(firestore, 'userBidder', uid));
        
        if (bidderDoc.exists()) {
          console.log('Bidder logged in successfully');
          navigate('/bidderhomepage');
        } else {
          setError('This account is not registered as a Bidder.');
          auth.signOut(); // Log the user out if they are not a bidder
        }
      } else {
        const sellerDoc = await getDoc(doc(firestore, 'userSeller', uid));
        
        if (sellerDoc.exists()) {
          console.log('Seller logged in successfully');
          navigate('/sellerhomepage');
        } else {
          setError('This account is not registered as a Seller.');
          auth.signOut(); // Log the user out if they are not a seller
        }
      }
    } catch (error) {
      console.error('Error during login:', error);
      if (error.code === 'auth/account-exists-with-different-credential') {
        const methods = await fetchSignInMethodsForEmail(auth, email);
        setError(`This email is associated with: ${methods.join(', ')}. Please log in using one of these methods.`);
      } else {
        setError(error.message);
      }
    }
  };

  // Navigate to Seller Registration
  const onSellerRegister = () => {
    navigate('/sellerregistration');
  };

  // Navigate to Bidder Registration
  const onBidderRegister = () => {
    navigate('/bidderregistration');
  };

  // Handle Facebook Login for Seller
  const handleFacebookLoginseller = async () => {
    try {
      const result = await signInWithFacebook();
      const user = result.user;

      if (user) {
        const { displayName, email, uid } = user;

        const userDoc = doc(firestore, 'userSeller', uid);
        const userSnap = await getDoc(userDoc);

        if (!userSnap.exists()) {
          await setDoc(userDoc, {
            username: displayName?.split(" ")[0] || '',
            email: email || '',
            firstName: displayName?.split(" ")[0] || '',
            lastName: displayName?.split(" ")[1] || '',
            provider: 'facebook',
          });
          navigate('/sellerregistration2');
        } else {
          navigate('/sellerhomepage');
        }
      } else {
        throw new Error("No user data returned from Facebook login");
      }
    } catch (error) {
      console.error('Error during Facebook login:', error);
      setError(error.message || 'An unknown error occurred during Facebook login.');
    }
  };

  // Handle Facebook Login for Bidder
  const handleFacebookLoginbidder = async () => {
    try {
      const result = await signInWithFacebook(); 

      if (result.user) {
        console.log('Facebook login successful for Bidder');
        navigate('/bidderhomepage');
      } else {
        console.error('Facebook login was not successful');
        setError('Facebook login failed');
      }
    } catch (error) {
      console.error('Error during Facebook login:', error);
      setError(error.message);
    }
  };

  // Handle Google Login for Seller
  const handleGoogleLoginseller = async () => {
    try {
      const result = await signInWithGoogle(); // Assume signInWithGoogle() is implemented
      const user = result.user;

      if (user) {
        const { displayName, email, uid } = user;

        const userDoc = doc(firestore, 'userSeller', uid);
        const userSnap = await getDoc(userDoc);

        if (!userSnap.exists()) {
          await setDoc(userDoc, {
            username: displayName?.split(" ")[0] || '',
            email: email || '',
            firstName: displayName?.split(" ")[0] || '',
            lastName: displayName?.split(" ")[1] || '',
            provider: 'google',
          });
          navigate('/sellerregistration2');
        } else {
          navigate('/sellerhomepage');
        }
      } else {
        throw new Error("No user data returned from Google login");
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      setError(error.message || 'An unknown error occurred during Google login.');
    }
  };

  // Handle Google Login for Bidder
  const handleGoogleLoginbidder = async () => {
    try {
      const result = await signInWithGoogle(); 

      if (result.user) {
        console.log('Google login successful for Bidder');
        navigate('/bidderhomepage');
      } else {
        console.error('Google login was not successful');
        setError('Google login failed');
      }
    } catch (error) {
      console.error('Error during Google login:', error);
      setError(error.message);
    }
  };

  // Close the login page
  const onClose = () => {
    navigate(-1);
  };

  return (
    <div className="App">
      <div className="login-container">
        {/* Display Error Message */}
        {error && <p className="error-message">{error}</p>}
        
        {/* Toggle Panel */}
        <div className="toggle-panel">
          <button
            className={`toggle-button ${!isBidderLogin ? 'active' : ''}`}
            onClick={() => setIsBidderLogin(false)}
          >
            Login as Seller
          </button>
          <button
            className={`toggle-button ${isBidderLogin ? 'active' : ''}`}
            onClick={() => setIsBidderLogin(true)}
          >
            Login as Bidder
          </button>
        </div>
        
        {/* Login Form Containers */}
        <div className="form-container">
          {!isBidderLogin ? (
            <div className="login-form seller-login-form">
              <h2>Seller Login</h2>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin} className="icon-button">
                <FiLogIn /> Login
              </button>
              <button onClick={onSellerRegister} className="icon-button">
                <FaUser /> Register as Seller
              </button>
              <button onClick={handleFacebookLoginseller} className="icon-button">
                <FaFacebook /> Login with Facebook
              </button>
              <button onClick={handleGoogleLoginseller} className="google-button">
              <FaGoogle /> Login with Google
              </button>

              <button onClick={onClose} className="icon-button">
                <IoCloseSharp /> Close
              </button>
            </div>
          ) : (
            <div className="login-form bidder-login-form">
              <h2>Bidder Login</h2>
              <input 
                type="email" 
                placeholder="Email" 
                value={email}
                onChange={(e) => setEmail(e.target.value)}
              />
              <input 
                type="password" 
                placeholder="Password" 
                value={password}
                onChange={(e) => setPassword(e.target.value)}
              />
              <button onClick={handleLogin} className="icon-button">
                <FiLogIn /> Login
              </button>
              <button onClick={onBidderRegister} className="icon-button">
                <FaUser /> Register as Bidder
              </button>
              <button onClick={handleFacebookLoginbidder} className="icon-button">
                <FaFacebook /> Login with Facebook
              </button>
              <button onClick={handleGoogleLoginbidder} className="icon-button google-button">
              <FaGoogle /> Login with Google
              </button>

              <button onClick={onClose} className="icon-button">
                <IoCloseSharp /> Close
              </button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}

export default LoginPage;
