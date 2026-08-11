import React from 'react';
import { Link } from 'react-router-dom';

export default function Footer() {
  return (
    <footer className="footer">
      <div className="container">
        <div className="footer-grid">

          {/* Brand */}
          <div>
            <div style={{ display: 'flex', alignItems: 'center', gap: 10, marginBottom: 16 }}>
              <div style={{
                width: 38, height: 38, borderRadius: 8,
                background: 'linear-gradient(135deg, var(--cyan), var(--teal))',
                display: 'flex', alignItems: 'center', justifyContent: 'center', fontSize: '1.1rem'
              }}>🧪</div>
              <div style={{ lineHeight: 1.2 }}>
                <div style={{ fontFamily: "'Space Grotesk', sans-serif", fontWeight: 800, fontSize: '1rem', color: 'var(--text-1)' }}>
                  Kavitha Lab Glass Works
                </div>
                <div style={{ fontSize: '0.65rem', color: 'var(--cyan)', fontStyle: 'italic', letterSpacing: '0.04em' }}>
                  Glass that Scientists Trust.
                </div>
              </div>
            </div>
            <p className="footer-tagline">
              Precision-engineered borosilicate glassware for laboratories, research
              institutions, and industrial applications. Manufactured in Chennai since 1993.
            </p>
            <a
              href="https://share.google/IpH6xXf3GpUxeKt3z"
              target="_blank"
              rel="noopener noreferrer"
              className="btn btn-ghost"
              style={{ fontSize: '0.82rem', padding: '8px 16px' }}
            >
              📍 View on Google Maps
            </a>
          </div>

          {/* Quick Links */}
          <div>
            <div className="footer-title">Quick Links</div>
            <ul className="footer-links">
              <li><Link to="/">Home</Link></li>
              <li><Link to="/catalogue">Product Catalogue</Link></li>
              <li><Link to="/about">About Us</Link></li>
              <li><Link to="/contact">Contact</Link></li>
            </ul>
          </div>

          {/* Contact & Legal */}
          <div>
            <div className="footer-title">Contact Us</div>
            <ul className="footer-links">
              <li>
                <a href="tel:+919381034732">📞 +91 93810 34732</a>
              </li>
              <li>
                <a href="mailto:kavithaglass1967@gmail.com">✉️ kavithaglass1967@gmail.com</a>
              </li>
              <li>
                <span style={{ color: 'var(--text-3)', fontSize: '0.85rem', lineHeight: 1.6, display: 'block' }}>
                  📍 Plot No.11, Annal Gandhi Nagar<br />
                  Main Road, Anakaputhur,<br />
                  Chennai – 600 070, Tamil Nadu
                </span>
              </li>
              <li><span style={{ color: 'var(--text-3)' }}>🕐 Mon – Sat: 9 AM – 6 PM IST</span></li>
            </ul>
          </div>
        </div>

        <div className="footer-bottom">
          <div>
            <p className="footer-copy">
              © {new Date().getFullYear()} Kavitha Lab Glass Works. All rights reserved.
            </p>
            <p className="footer-copy" style={{ marginTop: 4 }}>
              Proprietor: Govindaraj &nbsp;·&nbsp; GSTIN: 33AQPG7384C1Z3
            </p>
          </div>
          <div style={{ display: 'flex', gap: 16 }}>
            <p className="footer-copy">
              Designed & Maintained by <a href="https://thoshotech.com" target="_blank" rel="noreferrer" style={{ color: 'var(--cyan)', textDecoration: 'none' }}>Thosho Tech</a>
            </p>
          </div>
        </div>
      </div>
    </footer>
  );
}
