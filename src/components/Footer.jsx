import React from 'react';
import { UtensilsCrossed, Smartphone, Apple } from 'lucide-react';
import './Footer.css';

export default function Footer() {
  return (
    <footer className="footer-container">
      <div className="container">
        <div className="footer-grid">
          <div className="footer-brand">
            <div style={{ display: 'flex', alignItems: 'center', gap: '8px' }}>
              <UtensilsCrossed size={28} color="var(--primary)" />
              <span className="footer-brand-title">swiggy</span>
            </div>
            <p className="footer-brand-sub">
              © 2026 Bundl Technologies Pvt. Ltd. Crafted with precision & passion.
            </p>
            <div className="app-badge-row">
              <div className="app-badge">
                <Smartphone size={16} />
                Google Play
              </div>
              <div className="app-badge">
                <Apple size={16} />
                App Store
              </div>
            </div>
          </div>

          <div className="footer-col">
            <h4>Company</h4>
            <ul>
              <li><a href="#about">About Swiggy</a></li>
              <li><a href="#careers">Careers</a></li>
              <li><a href="#team">Swiggy One</a></li>
              <li><a href="#instamart">Swiggy Instamart</a></li>
              <li><a href="#dineout">Swiggy Dineout</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>Contact Us</h4>
            <ul>
              <li><a href="#help">Help & Support</a></li>
              <li><a href="#partner">Partner with us</a></li>
              <li><a href="#ride">Ride with us</a></li>
            </ul>
          </div>

          <div className="footer-col">
            <h4>We deliver to</h4>
            <ul>
              <li><a href="#blr">Bengaluru</a></li>
              <li><a href="#hyd">Hyderabad</a></li>
              <li><a href="#del">Delhi NCR</a></li>
              <li><a href="#bom">Mumbai</a></li>
              <li><a href="#maa">Chennai</a></li>
              <li><a href="#ccu">Kolkata</a></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <span>For better experience, download the Swiggy app now</span>
          <div style={{ display: 'flex', gap: '16px' }}>
            <a href="#terms" style={{ color: '#64748B', textDecoration: 'none' }}>Terms & Conditions</a>
            <a href="#privacy" style={{ color: '#64748B', textDecoration: 'none' }}>Privacy Policy</a>
            <a href="#security" style={{ color: '#64748B', textDecoration: 'none' }}>Security</a>
          </div>
        </div>
      </div>
    </footer>
  );
}
