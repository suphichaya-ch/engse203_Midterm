import React from 'react';
import { NavLink } from 'react-router-dom';
import './Navbar.css';

function Navbar() {
  return (
    <nav className="navbar">
      <div className="nav-container">
        <NavLink to="/" className="nav-logo">🍸 Cocktail Finder</NavLink>
        <div className="nav-links">
          <NavLink to="/" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Search</NavLink>
          <NavLink to="/random" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Random</NavLink>
          <NavLink to="/favorites" className={({ isActive }) => (isActive ? 'nav-link active' : 'nav-link')}>Favorites</NavLink>
        </div>
      </div>
    </nav>
  );
}
export default Navbar;