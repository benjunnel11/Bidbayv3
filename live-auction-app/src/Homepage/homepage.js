import './homepage.css';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom';
import coverGif from './video/cover.gif'; // Import the GIF

function App() {
  const navigate = useNavigate();
  const handleLogin = () => {
    navigate('/login');
  };

  return (
    <div className="Homepage">
      <div className="top-bar">
        <nav className="nav-left">
          <ul>
            <Link to="/about" className="nav-link">About Us</Link>
            <Link to="/contacts" className="about-link">Contact</Link>
           
          </ul>
        </nav>
        <div className="nav-right">
          <button className="login-btn" onClick={handleLogin}>Get Started!</button>
        </div>
      </div>

      {/* GIF Background */}
      <div className="gif-background">
        <img src={coverGif} alt="Background Animation" />
      </div>

    </div>
  );
}

export default App;