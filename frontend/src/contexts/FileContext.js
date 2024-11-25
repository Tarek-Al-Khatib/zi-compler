import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const filesContext = createContext();

const FilesProvider = ({ children }) => {
  const [files, setFiles] = useState([]);
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

  useEffect(() => {
    getFiles();
  }, []);

  return (
    <filesContext.Provider
      value={{
        list: files,
        getFiles,
        selectedFile,
        setSelectedFile,
      }}
    >
      {children}
    </filesContext.Provider>
  );
};

export default FilesProvider;
