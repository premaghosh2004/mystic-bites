import React from "react";
import { Link } from "react-router-dom";
import "/src/index.css"; // Make sure this is imported

const Navbar = () => {
  return (
    <nav className="navbar-container">
      {/* Logo/Title */}
  <Link to="/" className="navbar-logo no-underline text-inherit">
  <h1 className="text-red-900 font-serif font-semibold text-2xl">
    MYSTIC BITES <span>🩸</span>
  </h1>
</Link>

      
      {/* Navigation Links - Pure CSS Spacing */}
      <div className="nav-links">
        <Link to="/">HOME</Link>
        <Link to="/menu">MENU</Link>
        <Link to="/reservations">RESERVATIONS</Link>
        <Link to="/events">EVENTS</Link>
      </div>
      
      {/* Mobile menu button */}
      <div className="mobile-menu-btn">
        <svg viewBox="0 0 24 24" stroke="currentColor">
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 12h16M4 18h16" />
        </svg>
      </div>
    </nav>
  );
};

export default Navbar;
