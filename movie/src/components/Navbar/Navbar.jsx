import React, { useEffect, useRef, useState } from 'react';
import './Navbar.css';
import logo from '../../assets/s.png';
import search_icon from '../../assets/search_icon.svg';
import profile_img from '../../assets/profile_img.png';
import caret_icon from '../../assets/caret_icon.svg';
import hamburger_icon from '../../assets/hamburger_icon.png'; // Add your hamburger icon
import { logout } from '../../firebase';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';

const Navbar = ({ onSearch, onFilterByType }) => {
  const navRef = useRef();
  const navigate = useNavigate();
  const [searchQuery, setSearchQuery] = useState('');

  useEffect(() => {
    window.addEventListener('scroll', () => {
      if (window.scrollY >= 80) {
        navRef.current.classList.add('nav-dark');
      } else {
        navRef.current.classList.remove('nav-dark');
      }
    });
  }, []);

  const handleSearch = (e) => {
    const value = e.target.value;
    setSearchQuery(value);
    onSearch(value); // Send the query to Home component
  };

  return (
    <div ref={navRef} className="navbar">
      <div className="navbar-left">
        {/* Hamburger Menu */}
        <div className="hamburger-menu">
          <img src={hamburger_icon} alt="Menu" />
          <div className="menu-message">
            <p>Hamburger menu clicked! This is a placeholder message.</p>
          </div>
        </div>
        <img src={logo} alt="Logo" />
        <ul>
          <li onClick={() => onFilterByType('all')}>Home</li>
          <li onClick={() => onFilterByType('show')}>TV Shows</li>
          <li onClick={() => onFilterByType('movie')}>Movies</li>
          <li>
            <Link to="/mylist">My List</Link>
          </li>
        </ul>
      </div>
      <div className="navbar-right">
        <div className="search-bar">
          <input
            type="text"
            placeholder="Search movies or shows..."
            value={searchQuery}
            onChange={handleSearch}
          />
          <img src={search_icon} alt="Search" />
        </div>
        <div className="navbar-profile">
          <img
            src={profile_img}
            alt="Profile"
            className="profile"
            onClick={() => {
              navigate('/profile');
            }}
          />
          <img src={caret_icon} alt="Dropdown" />
          <div className="dropdown">
            <p
              onClick={() => {
                logout();
              }}
            >
              Sign Out
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Navbar;
