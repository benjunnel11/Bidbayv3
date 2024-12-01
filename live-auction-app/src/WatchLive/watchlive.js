import React, { useState } from "react";
import "./watchlive.css";

const WatchLive = () => {
  const [currentSlide, setCurrentSlide] = useState(0);

  const slides = [
    "/images/slide1.jpg", // Replace with your image URLs
    "/images/slide2.jpg",
    "/images/slide3.jpg",
    "/images/slide4.jpg",
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

  return (
    <div className="watchlive-container">
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

      {/* Options */}
      <div className="options">
        <button className="option-button">Option 1</button>
        <button className="option-button">Option 2</button>
        <button className="option-button">Option 3</button>
      </div>

      {/* Videos Section */}
      <div className="videos-section">
        <h2>Live and Recorded Videos</h2>
        <div className="video-list">
          {videos.map((video) => (
            <div className="video-box" key={video.id}>
              <video controls>
                <source src={video.src} type="video/mp4" />
                Your browser does not support the video tag.
              </video>
              <p>{video.title}</p>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default WatchLive;