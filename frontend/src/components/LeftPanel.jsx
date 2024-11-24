import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/leftPannel.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../base/navbar';


const LeftPannel = ()=>{
    const [files, setFiles] = useState([]);
    const [formData,setFormData] = useState({
        name: "",
        language: "javascript",
        content: "",
    });


    useEffect(() => {
        fetchFiles();
      }, []);
    
      const fetchFiles = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/files"); 
          setFiles(response.data.files);
          console.log(response.data);
        } catch (error) {
          console.error("Error fetching files:", error);
        }
      };

      const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData((prev) => ({ ...prev, [name]: value }));
      };


      const handleSubmit = async (e) => {
        e.preventDefault();
        try {
          const response = await axios.post("/api/files", formData); 
          setFiles((prev) => [...prev, response.data.file]); 
          setFormData({ name: "", language: "javascript", content: "" }); 
        } catch (error) {
          console.error("Error adding file:", error);
        }
      };


    return(
        

<div className="leftPanel">
    <Navbar/>


</div>

    );
}

export default LeftPannel;