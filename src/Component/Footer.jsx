import React from "react";
import "./index.css";

const Footer = () => {
  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-section">
          <h4>Hotel Booking</h4>
          <p>&copy; 2024 Hotel Booking. All Rights Reserved.</p>
          <p>1234 Elm Street, Suite 5678, City, Country</p>
          <p>Email: support@hotelbooking.com</p>
          <p>Phone: +123 456 7890</p>
        </div>

        <div className="footer-section">
          <h5>Quick Links</h5>
          <ul className="footer-links">
            <li>
              <a href="#!">Privacy Policy</a>
            </li>
            <li>
              <a href="#!">Terms of Service</a>
            </li>
            <li>
              <a href="#!">FAQs</a>
            </li>
            <li>
              <a href="#!">Contact Us</a>
            </li>
          </ul>
        </div>

        <div className="footer-section">
          <h5>Follow Us</h5>
          <ul className="footer-social">
            <li>
              <a
                href="https://facebook.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Facebook
              </a>
            </li>
            <li>
              <a
                href="https://twitter.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Twitter
              </a>
            </li>
            <li>
              <a
                href="https://instagram.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                Instagram
              </a>
            </li>
            <li>
              <a
                href="https://linkedin.com"
                target="_blank"
                rel="noopener noreferrer"
              >
                LinkedIn
              </a>
            </li>
          </ul>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
