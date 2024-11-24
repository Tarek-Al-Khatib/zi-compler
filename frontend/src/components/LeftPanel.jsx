import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/leftPannel.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../base/navbar';


const LeftPannel = ()=>{
    const [files, setFiles] = useState([]);
    const [formData,setFormData] = useState({
        name: "",
        language: "",
        content: "",
    });


    useEffect(() => {
        fetchFiles();
      }, []);
    
      const fetchFiles = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/auth/files"); 
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
          const token = localStorage.getItem("token");
          const response = await axios.post(
            "http://127.0.0.1:8000/api/auth/files1",
            formData,
            {
              headers: {
                Authorization: `Bearer ${token}`,
              },
            }
          );
          setFiles((prev) => [...prev, response.data.file]);
          setFormData({ name: "", language: "", content: "" });
        } catch (error) {
          if (error.response) {
            console.error("API Error:", error.response.data); 
          } else {
            console.error("Error:", error.message); 
          }
        }
      };
      


    return(
        

<div className="left-panel">
    <Navbar/>
    <form onSubmit={handleSubmit}>
        <h3>Add New File</h3>
        <label>File Name:</label>
        <input
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="Enter file name"
          required
        />
        
        <label>Language:</label>
        <select
          name="language"
          value={formData.language}
          onChange={handleInputChange}
        >
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        
        <label>Content:</label>
        <textarea
          name="content"
          value={formData.content}
          onChange={handleInputChange}
          placeholder="Write your code here"
          required
        ></textarea>
        
        <button type="submit">Add File</button>
      </form>

      <div className="file-list">
        <h3>Existing Files</h3>
        <ul>
          {files.map((file) => (
            <li key={file.id} onClick={() => console.log("Load file:", file)}>
              {file.name} ({file.language})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftPannel;