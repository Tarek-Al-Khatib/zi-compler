import React from "react";
import "../styles/navbar.css"
import { useNavigate } from 'react-router-dom';
import "../assets/zcompilerjpeg.jpeg"

const Navbar = () => {
  const navigate = useNavigate();

const logo = "../assets/zcompilerjpeg.jpeg";

const isLoggedIn = Boolean(localStorage.getItem("token"));

const handleLogout = () => {
  localStorage.clear(); 
  alert("You have been logged out.");
  navigate("/"); 
};

    return(

<nav className="navbar flex">
      <div className="logo">
        <img src={require("../assets/zcompilerjpeg.jpeg")} alt="learnn" />
      </div>
      <h1>Z-Compiler</h1>

      <div className="navbar-links">
        {isLoggedIn ? (
          <button className="logout-btn" onClick={handleLogout}>
            Logout
          </button>
        ) : (
          <a href="/login">Login</a>
        )}
      </div>
    </nav>
    );

};

export default Navbar;