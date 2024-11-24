import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/leftPannel.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../base/navbar';


const LeftPannel = ()=>{
    const [files, setFiles] = useState([]);
    const [formdata,setFormdata] = useState({
        name: "",
        language: "javascript",
        content: "",
    });


    

    return(
        

<div className="leftPanel">
    <Navbar/>


</div>

    );
}

export default LeftPannel;