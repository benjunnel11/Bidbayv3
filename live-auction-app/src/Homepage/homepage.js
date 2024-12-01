import './homepage.css';
import { useNavigate } from 'react-router-dom'; 
import { Link } from 'react-router-dom'

function App() {
  const navigate = useNavigate();
  const handleLogin =() => {
    navigate('/login');
  };
  
  return (
    <div className="Homepage">
      <div className="top-bar">
      <nav className="nav-left">
          <ul>
          <Link to="/about" className="nav-link">
        About Us
      </Link>
            <li><a href="/contact">Contact</a></li>
            <li><a href="/store-list">StoreList</a></li>
          </ul>
        </nav>  
        <div className="nav-right">
          <button className="login-btn" onClick={handleLogin}>Get Started!</button>
        </div>
      </div>

      <div className="welcome-container">
        <h1>Welcome User</h1>
      </div>
    </div>
  );
}

export default App;
