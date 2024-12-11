import React from 'react';
import './Contacts.css';

const ContactsPage = () => {
  return (
    <div className="contacts-container">
      <h1>Contact BidBay</h1>
      
      <div className="contact-sections">
        <div className="contact-card">
             <h2>Customer Support</h2>
              <p>Available 24/7</p>
             <p>Email: support@bidbay.com</p>
          <p>Phone: 09375727381</p>
        </div>

              <div className="contact-card">
          <h2>Business Inquiries</h2>
          <p>For sellers and business partnerships</p>
          <p>Email: business@bidbay.com</p>
          <p>Phone: 09293749931</p>
             </div>

        <div className="contact-form">
          <h2>Send us a Message</h2>
          <form>
            <input type="text" placeholder="Your Name" required />
            <input type="email" placeholder="Your Email" required />
            <select>
              <option value="">Select Topic</option>
                <option value="support">General Support</option>
              <option value="billing">Billing Issues</option>
                  <option value="technical">Technical Support</option>
              <option value="feedback">Feedback</option>
            </select>
            <textarea placeholder="Your Message" required></textarea>
            <button type="submit">Send Message</button>
          </form>
        </div>

        <div className="social-links">
          <h2>Connect With Us</h2>
          <div className="social-icons">
       <a href="https://www.facebook.com/profile.php?id=61553815831897" target="_blank" rel="noopener noreferrer">Facebook</a>
     <a href="https://www.instagram.com/bidbay2023/" target="_blank" rel="noopener noreferrer">Instagram</a>
         <a href="https://twitter.com/BidBay2023" target="_blank" rel="noopener noreferrer">Twitter</a>
          <a href="https://www.linkedin.com/in/bid-bay-18b992297/" target="_blank" rel="noopener noreferrer">LinkedIn</a>
</div>

        </div>

        <div className="office-location">
          <h2>BIDBAY</h2>
          <p>N.Bacalso Avenue</p>
          <p>Cebu City, Philippines</p>
          <p>Operating Hours: Monday - Friday, 9:00 AM - 6:00 PM PHT</p>
        </div>
      </div>
    </div>
  );
};

export default ContactsPage;
