import React, { useState, useEffect } from 'react';
import { Link, useLocation } from 'react-router-dom';
import { useCart } from '../context/CartContext';

export default function Navbar() {
  const { cartCount, setIsQuoteOpen } = useCart();
  const [scrolled, setScrolled] = useState(false);
  const [menuOpen, setMenuOpen] = useState(false);
  const location = useLocation();

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 40);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  // Close menu on route change
  useEffect(() => { setMenuOpen(false); }, [location.pathname]);

  const isActive = (path) => location.pathname === path;

  return (
    <header className={`navbar ${scrolled ? 'scrolled' : ''}`} style={{ zIndex: 600 }}>
      <div className="container">
        <div className="nav-inner">
          {/* Logo */}
          <Link to="/" className="nav-logo" style={{ gap: 12 }}>
            <div className="nav-logo-icon">🧪</div>
            <div style={{ display: 'flex', flexDirection: 'column', lineHeight: 1, gap: 4 }}>
              <span style={{ fontSize: '1.05rem', fontWeight: 800, letterSpacing: '-0.02em', color: 'var(--text-1)' }}>KLGW</span>
              <span style={{ fontSize: '0.6rem', fontWeight: 500, color: 'rgba(143,184,204,0.9)', letterSpacing: '0.04em', textTransform: 'uppercase' }}>Kavitha Lab Glass Works</span>
            </div>
          </Link>

          {/* Desktop Links */}
          <ul className="nav-links">
            <li><Link to="/" className={isActive('/') ? 'active' : ''}>Home</Link></li>
            <li><Link to="/catalogue" className={isActive('/catalogue') ? 'active' : ''}>Catalogue</Link></li>
            <li><Link to="/about" className={isActive('/about') ? 'active' : ''}>About</Link></li>
            <li><Link to="/contact" className={isActive('/contact') ? 'active' : ''}>Contact</Link></li>
          </ul>

          {/* Right controls */}
          <div style={{ display: 'flex', alignItems: 'center', gap: '10px' }}>
            {/* Quote button */}
            <button
              className="nav-cart-btn"
              onClick={() => setIsQuoteOpen(true)}
              aria-label="Open quote list"
              style={{ display: 'flex', alignItems: 'center', gap: 7, padding: '9px 14px' }}
            >
              <span style={{ fontSize: '1rem' }}>📋</span>
              <span style={{ fontSize: '0.8rem', fontWeight: 600, color: 'var(--text-1)' }}>Quote</span>
              {cartCount > 0 && (
                <span className="cart-badge">{cartCount}</span>
              )}
            </button>

            {/* Mobile hamburger */}
            <button
              className="nav-hamburger"
              onClick={() => setMenuOpen(!menuOpen)}
              aria-label="Toggle menu"
              aria-expanded={menuOpen}
            >
              <span style={{ transform: menuOpen ? 'translateY(7px) rotate(45deg)' : '' }} />
              <span style={{ opacity: menuOpen ? 0 : 1 }} />
              <span style={{ transform: menuOpen ? 'translateY(-7px) rotate(-45deg)' : '' }} />
            </button>
          </div>
        </div>
      </div>

      {/* Mobile menu — outside container so it's full width */}
      {menuOpen && (
        <nav
          className="mobile-nav open"
          onClick={() => setMenuOpen(false)}
        >
          <Link to="/">🏠 Home</Link>
          <Link to="/catalogue">🔬 Catalogue</Link>
          <Link to="/about">🏭 About</Link>
          <Link to="/contact">📞 Contact</Link>
          <button
            onClick={(e) => { e.stopPropagation(); setIsQuoteOpen(true); setMenuOpen(false); }}
          >
            📋 Quote List {cartCount > 0 && `(${cartCount})`}
          </button>
        </nav>
      )}
    </header>
  );
}
