import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/leftPannel.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../base/navbar';


const RightPannel = () =>{
    const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]); 
  const [collaborations,setCollaborations] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null); 
  const [selectedUser, setSelectedUser] = useState(null); 
  const [error, setError] = useState("");  



    useEffect(() => {
        fetchCollaborations();
        fetchUsers();
        fetchFiles(); 
      }, []);


      const fetchFiles = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/auth/files");
          setFiles(response.data.files); 
        } catch (error) {
          console.error("Error fetching files:", error);
          setError("Unable to fetch files.");
        }
      };
    
      const fetchCollaborations = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/auth/collaborations");
          setCollaborations(response.data.collaborations);
          console.log(response.data.collaborations);
        } catch (error) {
          console.error("Error fetching collaborations:", error);
        }
      };
    
      const fetchUsers = async () => {
        try {
          const response = await axios.get("http://127.0.0.1:8000/api/auth/users"); 
          setUsers(response.data.users);
          console.log(response.data.users);
        } catch (error) {
          console.error("Error fetching users:", error);
        }
      };
    
      const handleFileChange = (e) => {
        const fileId = e.target.value;
        setSelectedFile(files.find((file) => file.id === parseInt(fileId))); // Update selected file
      };
    
      const handleUserChange = (e) => {
        const userId = e.target.value;
        setSelectedUser(users.find((user) => user.id === parseInt(userId))); // Update selected user
      };
    
      const handleCollaborate = async () => {
        if (!selectedFile || !selectedUser) {
          setError("Please select both a file and a user to collaborate.");
          return;
        }
    
        try {
          const response = await axios.post(
            `http://127.0.0.1:8000/api/auth/collaborations/accept/${selectedFile.id}/${selectedUser.id}`
          );
          alert("Collaboration accepted successfully!");
        } catch (error) {
          console.error("Error accepting collaboration:", error);
          setError("Error accepting collaboration.");
        }
      };



    return(
        <div>
       <h3>Collaborators</h3>

{/* File Selection */}
<div>
  <label>Select File</label>
  <select onChange={handleFileChange} value={selectedFile ? selectedFile.id : ""}>
    <option value="">Select a file</option>
    {files.length > 0 ? (
      files.map((file) => (
        <option key={file.id} value={file.id}>
          {file.name} ({file.language})
        </option>
      ))
    ) : (
      <option disabled>No files found</option>
    )}
  </select>
</div>

{/* User Selection */}
<div>
  <label>Select User</label>
  <select onChange={handleUserChange} value={selectedUser ? selectedUser.id : ""}>
    <option value="">Select a user</option>
    {users.length > 0 ? (
      users.map((user) => (
        <option key={user.id} value={user.id}>
          {user.name} ({user.email})
        </option>
      ))
    ) : (
      <option disabled>No users found</option>
    )}
  </select>
</div>

{/* Error Message */}
{error && <p className="error-message">{error}</p>}

{/* Collaborate Button */}
<div>
  <button onClick={handleCollaborate}>Invite to Collaborate</button>
</div>
    </div>
  );
};

export default RightPannel;