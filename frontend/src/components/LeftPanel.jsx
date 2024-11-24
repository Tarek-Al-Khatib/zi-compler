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


    useEffect(() => {
        fetchFiles();
      }, []);
    
      const fetchFiles = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/collabs"); 
          setFiles(response.data.files);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      };


    return(
        

<div className="leftPanel">
    <Navbar/>


</div>

    );
}

export default LeftPannel;