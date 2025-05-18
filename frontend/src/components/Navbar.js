import React from "react";
import { Link } from "react-router-dom";
import "./Navbar.css";

function Navbar() {
  return (
    <nav className="navbar">
      <div className="navbar-container">
        <div className="navbar-links">
          <Link to="/">Home</Link>
          <Link to="/prompt">Search Here</Link>
          <Link to="/profile">Profile</Link>
          <Link to="/editprofile">Edit Profile</Link>
          <Link to="/login">Login</Link>
          <Link to="/signup">Sign Up</Link>
          <Link to="/about">About Us</Link>
  
        </div>

  
      </div>
    </nav>
  );
}

export default Navbar;