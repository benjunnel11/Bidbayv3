import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./watchlive.css";

const WatchLive = () => {
  const [isLiveAccessGranted, setLiveAccessGranted] = useState(false); // Track access
  const [showPrompt, setShowPrompt] = useState(false); // Track code prompt visibility

  const navigate = useNavigate(); // Initialize useNavigate

  const handleLiveClick = () => {
    setShowPrompt(true); // Show the code prompt
  };

  const handleCodeSubmit = (code) => {
    const correctCode = "123456"; // Updated access code
    if (code === correctCode) {
      setLiveAccessGranted(true);
      setShowPrompt(false); // Hide the prompt after success
    } else {
      alert("Incorrect Code. Please try again.");
    }
  };

  // Function to handle "Back" button click
  const handleBackClick = () => {
    navigate('/bidderhomepage'); // Navigate to bidderhomepage
  };

  return (
    <div className="watchlive-container">
      {/* Back Button */}
      <button className="back-btn" onClick={handleBackClick}>
        Back
      </button>

      {/* Live Section */}
      <div className="live-section" onClick={handleLiveClick}>
        <div className="live-overlay">
          <span>LIVE</span>
        </div>
        {!isLiveAccessGranted && (
          <button className="enter-live">Click to Access Live</button>
        )}
      </div>

      {/* Code Prompt */}
      {showPrompt && (
        <div className="code-prompt">
          <div className="prompt-box">
            <p>Enter Access Code:</p>
            <input
              type="text"
              placeholder="Access Code"
              onKeyDown={(e) => {
                if (e.key === "Enter") handleCodeSubmit(e.target.value);
              }}
            />
            <button
              onClick={() =>
                handleCodeSubmit(document.querySelector("input").value)
              }
            >
              Submit
            </button>
            {/* Close Button */}
            <button className="close-prompt" onClick={() => setShowPrompt(false)}>
              Close
            </button>
          </div>
        </div>
      )}

      {/* Product Description */}
      {isLiveAccessGranted && (
        <div className="product-container">
          <img src="/images/watch.jpg" alt="Watch" />
          <div className="description">
            <h3>Description</h3>
            <p>Item: Watch</p>
            <p>Color: Black</p>
            <p>Price: $69.00</p>
          </div>
        </div>
      )}
    </div>
  );
};

export default WatchLive;