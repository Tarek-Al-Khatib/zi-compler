import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const filesContext = createContext();

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
  const [collaborations, setCollaborations] = useState([]);
  const [selectedFile, setSelectedFile] = useState(null);

  const getFiles = () => {
    const token = localStorage.getItem("token");
    axios
      .get("http://127.0.0.1:8000/api/auth/files", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      })
      .then(({ data }) => {
        setFiles(data.files);
      });
  };

  const fetchCollaborations = async () => {
    try {
        const response = await axios.get("http://127.0.0.1:8000/api/user/collaborations", {
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


  useEffect(() => {
    getFiles();
    fetchCollaborations();
  }, []);

  return (
    <filesContext.Provider
      value={{
        list: files,collaborations,
        getFiles,
        fetchCollaborations,
        setCollaborations,
        collaborations,
        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </filesContext.Provider>
  );
};

export default FilesProvider;
