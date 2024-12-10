import React, { useState, useEffect } from "react";
import { useNavigate } from "react-router-dom"; // Import useNavigate
import "./watchlive.css";

// Importing images for slides
import slide1 from './Images/BidBuy.jpg';
import slide2 from './Images/Warning.jpg';
import slide3 from './Images/Security.jpg';
import slide4 from './Images/Seller.jpg';

const WatchLive = () => {
  const [currentSlide, setCurrentSlide] = useState(0);
  const [isLiveAccessGranted, setLiveAccessGranted] = useState(false); // Track access
  const [showPrompt, setShowPrompt] = useState(false); // Track code prompt visibility

  const navigate = useNavigate(); // Initialize useNavigate
  
  // Using imported images in the slides array
  const slides = [
    slide1,
    slide2,
    slide3,
    slide4,
  ];

  const videos = [
    { id: 1, title: "Live Video 1", src: "/videos/video1.mp4" },
    { id: 2, title: "Live Video 2", src: "/videos/video2.mp4" },
    { id: 3, title: "Recorded Video 1", src: "/videos/video3.mp4" },
    { id: 4, title: "Recorded Video 2", src: "/videos/video4.mp4" },
  ];

  const handlePrevSlide = () => {
    setCurrentSlide((prev) => (prev === 0 ? slides.length - 1 : prev - 1));
  };

  const handleNextSlide = () => {
    setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
  };

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

  // Automatic slide change every 3 seconds
  useEffect(() => {
    const slideInterval = setInterval(() => {
      setCurrentSlide((prev) => (prev === slides.length - 1 ? 0 : prev + 1));
    }, 3000); // Change slide every 3 seconds

    // Cleanup the interval on component unmount
    return () => clearInterval(slideInterval);
  }, [slides.length]); // Only re-run effect when slides length changes

  return (
    <div className="watchlive-container">
      {/* Back Button */}
      <button className="back-btn" onClick={handleBackClick}>
        Back
      </button>

      {/* Slideshow */}
      <div className="slideshow">
        <button className="slide-button left" onClick={handlePrevSlide}>
          &#8249;
        </button>
        <img src={slides[currentSlide]} alt="Slide" className="slide-image" />
        <button className="slide-button right" onClick={handleNextSlide}>
          &#8250;
        </button>
      </div>

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