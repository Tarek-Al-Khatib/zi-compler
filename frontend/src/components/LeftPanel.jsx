import React, { useState, useEffect, useContext } from "react";
import axios from "axios";
import "../styles/leftPannel.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../base/navbar";
import { filesContext } from "../contexts/FileContext";

const LeftPannel = () => {
  const { list, setSelectedFile, getFiles } = useContext(filesContext);
  const [files, setFiles] = useState([]);
  const [formData, setFormData] = useState({
    name: "",
    language: "",
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const token = localStorage.getItem("token");
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/files2",
        formData,
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        }
      );
      setFiles((prev) => [...prev, response.data.file]);
      setFormData({ name: "", language: "" });
    } catch (error) {
      if (error.response) {
        console.error("API Error:", error.response.data);
      } else {
        console.error("Error:", error.message);
      }
    }
  };

    return(
        

<div>
    <form onSubmit={handleSubmit}>
        <h2 className="flex center">Files</h2>
        <h4> &gt; New File</h4>
        <input
        className="vs-bg white-txt"
          type="text"
          name="name"
          value={formData.name}
          onChange={handleInputChange}
          placeholder="File name"
          required
        />
        <select
          name="language"
          value={formData.language}
          onChange={handleInputChange}
          className="vs-bg dim-txt"
        >
            <option value="javascript">Language</option>
          <option value="javascript">JavaScript</option>
          <option value="python">Python</option>
          <option value="java">Java</option>
          <option value="cpp">C++</option>
        </select>
        
        
        <button type="submit"
        className="blue-bg dim-txt"
        onClick={getFiles()}
        >Add File</button>
      </form>

      <div className="file-list">
        <h4 className=""> &gt; Files</h4>
        <ul className="dim-txt">
          {list.map((file) => (
            <li key={file.id} 
            
            onClick={() => {setSelectedFile(file)}}>
              {file.name} ({file.language})
            </li>
          ))}
        </ul>
      </div>
    </div>
  );
};

export default LeftPannel;
