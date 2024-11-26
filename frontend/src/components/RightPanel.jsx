import React, { useState, useEffect } from "react";
import axios from "axios";
import "../styles/leftPannel.css";
import { useNavigate } from 'react-router-dom';
import Navbar from '../base/navbar';

const RightPannel = () => {
  const [users, setUsers] = useState([]);
  const [files, setFiles] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
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
      const token = localStorage.getItem("token");
      const response = await axios.get("http://127.0.0.1:8000/api/auth/files1", {
        headers: {
          Authorization: `Bearer ${token}`,
        }
      });
  
      setFiles(response.data.files); 
    } catch (error) {
      console.error("Error fetching files:", error);
      setError("Unable to fetch files.");
    }
  };
  

  const fetchCollaborations = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/auth/collabs", {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('token')}` 
            }
        });
        console.log("API Response Data:", response.data);
        setCollaborations(response.data.collaborations); 
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
      setError("Unable to fetch users.");
    }
  };

  const handleFileChange = (e) => {
    const fileId = e.target.value;
    setSelectedFile(files.find((file) => file.id === parseInt(fileId))); 
  };

  const handleUserChange = (e) => {
    const userId = e.target.value;
    setSelectedUser(users.find((user) => user.id === parseInt(userId))); 
  };
  


  const handleCollaborate = async () => {
    if (!selectedFile || !selectedUser) {
      setError("Please select both a file and a user to collaborate.");
      return;
    }
  
    try {
        const userData = JSON.parse(localStorage.getItem("user"));

        const senderName = userData ? userData.username : null;
    
        if (!senderName) {
          setError("Sender name is missing. Please log in again.");
          return;
        }
      const token = localStorage.getItem("token");

      console.log({
        fileId: selectedFile.id,
        senderName: senderName,
        receiverEmail: selectedUser.email,
        receiverId: selectedUser.id,
      });
        
      const response = await axios.post(
        "http://127.0.0.1:8000/api/auth/sendColabos",
        {
          fileId: selectedFile.id,
          senderName: senderName, 
          receiverEmail: selectedUser.email,
          receiverId: selectedUser.id,
          
        },
        
        {
            
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
          
        }
        
      );
  
      alert("Collaboration invitation sent successfully!");
      fetchCollaborations(); 
    } catch (error) {
      console.error("Error sending collaboration invitation:", error);
      setError("Error sending collaboration invitation.");
    }
  };

  const handleRoleChange = async (fileId, userId, newRole) => {
    try {
      const token = localStorage.getItem("token");
  
      const response = await axios.patch(
        `http://127.0.0.1:8000/api/auth/collaborations/${fileId}/${userId}/role`,
        { role: newRole },
        {
          headers: {
            Authorization: `Bearer ${token}`,
            "Content-Type": "application/json",
          },
        }
      );
  
      setCollaborations(prevCollaborations =>
        prevCollaborations.map(collab =>
          collab.file_id === fileId && collab.user_id === userId
            ? { ...collab, role: newRole }
            : collab
        )
      );
  
      alert("Role updated successfully!");
    } catch (error) {
      console.error("Error updating role:", error);
      setError("Error updating role.");
    }
  };


  return (
    <div>
      <h3>Collaborators</h3>

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


      <div>
        <button onClick={handleCollaborate}>Invite to Collaborate</button>
      </div>

      <div className="collaborators-list">
        <h3>Collaborators</h3>
        {collaborations.length > 0 ? (
          <ul>
            {collaborations.map((collab) => (
              <li key={collab.id}>
                <p>User: {collab.user ? collab.user.name : 'N/A'}</p>
                <p>File: {collab.file ? collab.file.name : 'N/A'}</p>
                <p>Role: {collab.role} ({collab.status})</p>
                <select
            value={collab.role}
            onChange={(e) => handleRoleChange(collab.file_id, collab.user_id, e.target.value)}
          >
            <option value="editor">Editor</option>
            <option value="viewer">Viewer</option>
          </select>
              </li>
            ))}
          </ul>
        ) : (
          <p>No collaborators yet.</p>
        )}
      </div>
    </div>
  );
};

export default RightPannel;
