import React from 'react';
import { Link } from 'react-router-dom';
import Logo from './Logo';
import './Footer.css';

function Footer() {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="footer">
      <div className="footer-container">
        <div className="footer-top">
          <div className="footer-brand">
            <Link to="/calculator" className="footer-logo">
              <Logo size={48} />
              <div className="footer-brand-text">
                <h3>BlessedBump</h3>
                <p>Because every pregnancy story deserves to be celebrated</p>
              </div>
            </Link>
            <p className="footer-tagline">
              Your trusted companion through every step of your pregnancy journey. 
              Track milestones, connect with your community, and celebrate each moment.
            </p>
          </div>

          <div className="footer-links-grid">
            <div className="footer-column">
              <h4>Product</h4>
              <ul>
                <li><Link to="/dashboard">GlowBoard</Link></li>
                <li><Link to="/tracker">Journey Keeper</Link></li>
                <li><Link to="/calculator">Due-Date Oracle</Link></li>
                <li><Link to="/fertility">Fertility Oracle</Link></li>
                <li><Link to="/community">Village Voice</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Company</h4>
              <ul>
                <li><Link to="/about">About Us</Link></li>
                <li><Link to="/contact">Contact Us</Link></li>
                <li><Link to="/blog">Blog</Link></li>
                <li><Link to="/careers">Careers</Link></li>
                <li><Link to="/press">Press Kit</Link></li>
              </ul>
              <div className="footer-contact-info">
                <p className="footer-email">
                  <a href="mailto:blessedbump.co@gmail.com">blessedbump.co@gmail.com</a>
                </p>
              </div>
            </div>

            <div className="footer-column">
              <h4>Legal</h4>
              <ul>
                <li><Link to="/privacy-policy">Privacy Policy</Link></li>
                <li><Link to="/terms-of-service">Terms of Service</Link></li>
                <li><Link to="/cookie-policy">Cookie Policy</Link></li>
                <li><Link to="/refund-policy">Refund Policy</Link></li>
                <li><Link to="/accessibility">Accessibility</Link></li>
              </ul>
            </div>

            <div className="footer-column">
              <h4>Support</h4>
              <ul>
                <li><Link to="/help">Help Center</Link></li>
                <li><Link to="/faq">FAQ</Link></li>
                <li><Link to="/safety">Safety Guidelines</Link></li>
                <li><Link to="/community-guidelines">Community Guidelines</Link></li>
                <li><Link to="/report">Report an Issue</Link></li>
              </ul>
            </div>
          </div>
        </div>

        <div className="footer-middle">
          <div className="footer-connect">
            <h4>Connect With Us</h4>
            <div className="social-links">
              <a 
                href="https://facebook.com/blessedbump" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Facebook"
              >
                <span className="social-icon">📘</span>
                <span>Facebook</span>
              </a>
              <a 
                href="https://instagram.com/blessedbump" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Instagram"
              >
                <span className="social-icon">📷</span>
                <span>Instagram</span>
              </a>
              <a 
                href="https://twitter.com/freetoolhubcomm" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Twitter"
              >
                <span className="social-icon">🐦</span>
                <span>Twitter</span>
              </a>
              <a 
                href="https://www.linkedin.com/in/freetoolhubcommunity-freetoolhubcommunity-338202393" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="LinkedIn"
              >
                <span className="social-icon">💼</span>
                <span>LinkedIn</span>
              </a>
              <a 
                href="https://youtube.com/blessedbump" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="YouTube"
              >
                <span className="social-icon">📺</span>
                <span>YouTube</span>
              </a>
              <a 
                href="https://pinterest.com/blessedbump" 
                target="_blank" 
                rel="noopener noreferrer"
                aria-label="Pinterest"
              >
                <span className="social-icon">📌</span>
                <span>Pinterest</span>
              </a>
            </div>
          </div>

          <div className="footer-newsletter">
            <h4>Stay Updated</h4>
            <p>Get pregnancy tips, updates, and community stories delivered to your inbox.</p>
            <form className="newsletter-form" onSubmit={(e) => e.preventDefault()}>
              <input 
                type="email" 
                placeholder="Enter your email" 
                required
                aria-label="Email address for newsletter"
              />
              <button type="submit">Subscribe</button>
            </form>
          </div>
        </div>

        <div className="footer-bottom">
          <div className="footer-copyright">
            <p>&copy; {currentYear} BlessedBump. All rights reserved.</p>
            <p className="footer-disclaimer">
              BlessedBump provides informational content only and is not a substitute for professional medical advice, 
              diagnosis, or treatment. Always seek the advice of your physician or other qualified health provider 
              with any questions you may have regarding a medical condition.
            </p>
          </div>
          <div className="footer-badges">
            <span className="badge">🔒 Secure & Private</span>
            <span className="badge">✅ HIPAA Compliant</span>
            <span className="badge">🌍 Available Worldwide</span>
          </div>
        </div>
      </div>
    </footer>
  );
}

export default Footer;

