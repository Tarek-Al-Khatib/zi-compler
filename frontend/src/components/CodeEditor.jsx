import React, { useState, useRef, useContext, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import { filesContext } from "../contexts/FileContext";

const CodeEditor = () => {
  const { selectedFile } = useContext(filesContext);
  const editorRef = useRef();
  const [code, setCode] = useState(null);
  const [output, setOutput] = useState("Run code for output");



  useEffect(()=>{
    setCode(selectedFile?.content || null)
  },[selectedFile])

  
  const formatErrorMessage = (error) => {
    const format = error.indexOf("line")

    return error.substring(format)
  };
  
  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const updateContent = ()=>{
    const data = new FormData();
    data.append("content", code);
    
    axios
      .put(`http://127.0.0.1:8000/api/auth/${selectedFile.id}`, data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        console.log("updated successfully:", response.data);
      })
      .catch((error) => {
        console.error("error updating the file:", error.response?.data || error.message);
      });
  }
  
  const run = async () => {
    updateContent()
    const code = editorRef.current?.getValue();
    if (!code) return;

    try {
      const API = axios.create({
        baseURL: "https://emkc.org/api/v2/piston",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const response = await API.post("/execute", {
        language: "python",
        version: "3",
        files: [
          {
            file: "random.py",
            content: code,
          },
        ],
      });

      setOutput(response.data.run.stdout || formatErrorMessage(response.data.run.stderr));
    } catch (error) {
      console.error("Error Details:",error.message);
      setOutput("Error: " + (error.message));
    }
  };

  return (

      <div className="flex column center compilar">
        <button className="flex center action-btn white-txt black-bg run-btn" onClick={run}>
          Run
        </button>
        <div className="flex input">

          <Editor
            defaultLanguage="python"
            defaultValue="# start code"
            theme="vs-dark"
            value={code}
            onChange={(newCode) => setCode(newCode)}
            onMount={onMount}
          />
        </div>

        <p className="black-txt">Output</p>
        <div className="flex vs-bg output white-txt">
          {output}
        </div>
      </div>

  );
};

export default CodeEditor;