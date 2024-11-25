import axios from "axios";
import { createContext, useEffect, useState } from "react";

export const filesContext = createContext();

const FilesProvider = ({ children, x }) => {
  const [files, setFiles] = useState([]);

  const getFiles = () => {
    const token = localStorage.getItem("token");
    axios.get("http://127.0.0.1:8000/api/auth/files",
        {
            headers: {
                Authorization: `Bearer ${token}`,
              },
        }
    ).then(({ data }) => {
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
        getFiles
      }}
    >
      {children}
    </filesContext.Provider>
  );
};

export default FilesProvider;
