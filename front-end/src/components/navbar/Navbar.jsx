import React, { useState } from 'react';
import { Link, useLocation } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  const [isOpen, setIsOpen] = useState(false);
  const location = useLocation();

  const toggleMenu = () => setIsOpen(!isOpen);

  // Close menu when link is clicked (on mobile)
  const handleLinkClick = () => {
    setIsOpen(false);
  };
  

  return (
    <nav className="navbar">
      {/* Logo */}
      <div className="nav-logo">
        <Link to="/" onClick={handleLinkClick}>
          Shop<span>More</span>
        </Link>
      </div>

      {/* Desktop Menu */}
      <ul className="nav-menu desktop">
        <li>
          <Link 
            to="/home" 
            className={location.pathname === '/' ? 'active' : ''} 
            onClick={handleLinkClick}
          >
            Home
          </Link>
        </li>
        <li>
          <Link 
            to="/products" 
            className={location.pathname === '/products' ? 'active' : ''} 
            onClick={handleLinkClick}
          >
            Products
          </Link>
        </li>
        <li>
          <Link 
            to="/signin" 
            className={location.pathname === '/signin' ? 'active' : ''} 
            onClick={handleLinkClick}
          >
            Login
          </Link>
        </li>
        <li>
          <Link 
            to="/signup" 
            className={location.pathname === '/signup' ? 'active' : ''} 
            onClick={handleLinkClick}
          >
            Register
          </Link>
        </li>
      </ul>

      {/* Mobile Menu Button */}
      <div className={`nav-toggle ${isOpen ? 'open' : ''}`} onClick={toggleMenu}>
        <span></span>
        <span></span>
        <span></span>
      </div>

      {/* Mobile Menu */}
      <ul className={`nav-menu mobile ${isOpen ? 'open' : ''}`}>
        <li>
          <Link to="/" onClick={handleLinkClick}>Home</Link>
        </li>
        <li>
          <Link to="/products" onClick={handleLinkClick}>Products</Link>
        </li>
        <li>
          <Link to="/signin" onClick={handleLinkClick}>Login</Link>
        </li>
        <li>
          <Link to="/signup" onClick={handleLinkClick}>Register</Link>
        </li>
      </ul>
    </nav>
  );
}

export default Navbar;