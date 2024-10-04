import { useState } from 'react';
import './login.css';
import { useNavigate } from 'react-router-dom';
import { auth } from '../firebase'; 
import { signInWithEmailAndPassword, fetchSignInMethodsForEmail } from 'firebase/auth'; // Import fetchSignInMethodsForEmail
import { signInWithFacebook } from '../firebase';
import { firestore } from '../firebase';
import { setDoc, getDoc, doc } from 'firebase/firestore';

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
        if (isBidderLogin) {
            console.log('Bidder login logic');
            navigate('/bidderhomepage');
        } else {
            await signInWithEmailAndPassword(auth, email, password);
            console.log('Seller logged in successfully');
            navigate('/sellerhomepage');
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
            const { displayName, email, uid } = user; // Ensure you're accessing the correct fields

            // Firestore logic...
            const userDoc = doc(firestore, 'userSeller', uid);
            const userSnap = await getDoc(userDoc);

            if (!userSnap.exists()) {
                await setDoc(userDoc, {
                    username: displayName?.split(" ")[0] || '',
                    email: email || '', // This should now properly access the email
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
    const result = await signInWithFacebook(); // Assuming this function returns a promise

    // Check if user successfully logged in
    if (result.user) {
      console.log('Facebook login successful for Bidder');
      navigate('/bidderhomepage'); // Redirect to Bidder Home Page only if login is successful
    } else {
      console.error('Facebook login was not successful');
      setError('Facebook login failed');
    }
  } catch (error) {
    console.error('Error during Facebook login:', error);
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
              onChange={(e) => setEmail(e.target.value)} // Capture email input
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Capture password input
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={onSellerRegister}>Register as Seller</button>
            <button onClick={handleFacebookLoginseller}>
              <i className="fab fa-facebook-f"></i> Login with Facebook
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        ) : (
          <div className="login-form bidder-login-form">
            <h2>Bidder Login</h2>
            <input 
              type="email" 
              placeholder="Email" 
              value={email}
              onChange={(e) => setEmail(e.target.value)} // Capture email input
            />
            <input 
              type="password" 
              placeholder="Password" 
              value={password}
              onChange={(e) => setPassword(e.target.value)} // Capture password input
            />
            <button onClick={handleLogin}>Login</button>
            <button onClick={onBidderRegister}>Register as Bidder</button>
            <button onClick={handleFacebookLoginbidder}>
              <i className="fab fa-facebook-f"></i> Login with Facebook
            </button>
            <button onClick={onClose}>Close</button>
          </div>
        )}
      </div>
    </div>
  </div>
);
}

export default LoginPage;
