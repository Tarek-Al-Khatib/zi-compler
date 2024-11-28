import React, { useState, useRef, useContext, useEffect } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";
import Pusher from "pusher-js";
import { filesContext } from "../contexts/FileContext";

const CodeEditor = () => {
  const { selectedFile } = useContext(filesContext);
  const editorRef = useRef();
  const [code, setCode] = useState(null);
  const [cursors, setCursors] = useState({});
  const [output, setOutput] = useState("Run code for output");
  const [isViewer, setIsViewer] = useState(false);

  useEffect(() => {
    if (selectedFile) {
      setCode(selectedFile?.content || null);
      setIsViewer(selectedFile?.role === "viewer");
    }
  }, [selectedFile]);

  useEffect(() => {
    if (selectedFile) {
      const pusher = new Pusher("90700eb534538226cdab", {
        cluster: "eu",
      });

      const channel = pusher.subscribe(`file.${selectedFile.id}`);
      channel.bind("FileContentUpdated", (data) => {
        setCode(data.content);
        setCursors((prev) => ({
          ...prev,
          [data.userId]: data.cursorPosition,
        }));
      });

      return () => {
        pusher.unsubscribe(`file.${selectedFile.id}`);
      };
    }
  }, [selectedFile]);

  const formatErrorMessage = (error) => {
    const format = error.indexOf("line");

    return error.substring(format);
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  const updateContent = (newCode) => {
    setCode(newCode);
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
        console.error(
          "error updating the file:",
          error.response?.data || error.message
        );
      });
  };

  const run = async () => {
    updateContent();
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

      setOutput(
        response.data.run.stdout || formatErrorMessage(response.data.run.stderr)
      );
    } catch (error) {
      console.error("Error Details:", error.message);
      setOutput("Error: " + error.message);
    }
  };

  const analyze = () => {
    const data = new FormData();
    data.append("code", code);
    axios
      .post("http://127.0.0.1:8000/api/debugCode", data, {
        headers: {
          "Content-Type": "application/json",
        },
      })
      .then((response) => {
        setCode(response.data.choices[0].message.content);
      })
      .catch((error) => {
        console.error("error:", error.response?.data || error.message);
      });
  };

  return (
      <div className="flex column compilar">
        <div className="flex row compilar-heading">
          {!isViewer && (
          <button className="flex center action-btn compilar-bg run-btn " onClick={run}>
            Run
          </button>
        )}
          <button className="flex center action-btn compilar-bg run-btn" 
          onClick={analyze}>
            AI Analyzer
          </button>
        </div>
        <div className="flex input">

          <Editor
            defaultLanguage="python"
            defaultValue="# start code"
            theme="vs-dark"
            value={code}
            onChange={(newCode) => setCode(newCode)}
            onMount={onMount}
            options={{ readOnly: isViewer }}
          />
        </div>
        
        <div className="black-txt output-header">Output</div>
        <div className="flex vs-bg output white-txt">
          {output}
        </div>
      </div>

      <p className="black-txt">Output</p>
      <div className="flex vs-bg output white-txt">{output}</div>
    </div>
  );
};

export default CodeEditor;
