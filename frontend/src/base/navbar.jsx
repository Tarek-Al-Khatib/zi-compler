import React from "react";
import "../styles/navbar.css"
import { useNavigate } from 'react-router-dom';
import "../assets/zcompilerjpeg.jpeg"

const Navbar = () => {
  const navigate = useNavigate();

const logo = "../assets/zcompilerjpeg.jpeg";

    return(

<nav className="navbar flex">
      <div className="logo">
        <img src={logo} alt="learnn" />
      </div>
      <h1>Z-Compiler</h1>
    </nav>
    );

};

export default Navbar;