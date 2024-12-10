import React, { useEffect } from 'react';
import './aboutUs.css';
import AOS from 'aos';
import 'aos/dist/aos.css';

function About() {
  useEffect(() => {
    AOS.init({
      duration: 1000,
      once: true
    });
  }, []);

  const handleReturn = () => {
    window.history.back(); // This takes the user to the previous page
  };

  return (
    <div className="about-container">
      <button className="return-button" onClick={handleReturn}>
        Return
      </button>

      <div className="about-scroll-wrapper">
        <h1 className="glowing-text" data-aos="zoom-in">Welcome to BidBay</h1>
        
        <div className="about-content">
          {/* Main Introduction */}
          <section className="intro-section" data-aos="fade-up">
            <h2>Your Premier Live Auction Platform</h2>
            <p>Experience the thrill of real-time bidding from anywhere in the world. BidBay brings the excitement of live auctions directly to your screen.</p>
          </section>

          {/* Live Auction Experience */}
          <section className="live-auction-features" data-aos="fade-up">
            <h2>Live Auction Experience</h2>
            <div className="feature-cards">
              <div className="feature-card">
                <h3>HD Live Streaming</h3>
                <ul>
                  <li>Crystal clear video quality</li>
                  <li>Multiple camera angles</li>
                  <li>Real-time audio</li>
                  <li>Interactive bidding overlay</li>
                </ul>
              </div>
              <div className="feature-card">
                <h3>Interactive Bidding</h3>
                <ul>
                  <li>One-click bid placement</li>
                  <li>Live price updates</li>
                  <li>Instant notifications</li>
                  <li>Chat with auctioneers</li>
                </ul>
              </div>
            </div>
          </section>

          {/* For Bidders */}
          <section className="bidder-features" data-aos="fade-up">
            <h2>For Bidders</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <h3>Easy Participation</h3>
                <ul>
                  <li>Quick registration</li>
                  <li>Watch multiple auctions</li>
                  <li>Favorite items tracking</li>
                  <li>Mobile bidding support</li>
                </ul>
              </div>
              <div className="feature-item">
                <h3>Smart Tools</h3>
                <ul>
                  <li>Automated bidding</li>
                  <li>Price alerts</li>
                  <li>Auction reminders</li>
                  <li>Bid history tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* For Sellers */}
          <section className="seller-features" data-aos="fade-up">
            <h2>For Sellers</h2>
            <div className="feature-grid">
              <div className="feature-item">
                <h3>Auction Management</h3>
                <ul>
                  <li>Easy item listing</li>
                  <li>Schedule auctions</li>
                  <li>Set reserve prices</li>
                  <li>Real-time viewer count</li>
                </ul>
              </div>
              <div className="feature-item">
                <h3>Seller Tools</h3>
                <ul>
                  <li>Live streaming setup</li>
                  <li>Item showcase tools</li>
                  <li>Audience interaction</li>
                  <li>Sales tracking</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Payment & Security */}
          <section className="payment-features" data-aos="fade-up">
            <h2>Safe & Secure</h2>
            <div className="security-grid">
              <div className="security-item">
                <h3>Easy Payments</h3>
                <ul>
                  <li>Multiple payment options</li>
                  <li>Secure transactions</li>
                  <li>Quick withdrawals</li>
                  <li>Transaction history</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Join Us */}
          <section className="join-section" data-aos="fade-up">
            <h2>Join BidBay Today</h2>
            <p>Start your journey in the exciting world of live online auctions. Whether you're buying or selling, BidBay provides the platform you need to succeed.</p>
          </section>
        </div>
      </div>
    </div>
  );
}

export default About;



