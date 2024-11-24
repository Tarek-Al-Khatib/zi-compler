import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const editorRef = useRef();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("// output");

  const run = async () => {
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
            content: code,
          },
        ],
      });

      setOutput(response.data?.run?.stdout || "No output");
    } catch (error) {
      console.error("Error Details:",error.message);
      setOutput("Error: " + (error.message));
    }
  };

  const onMount = (editor) => {
    editorRef.current = editor;
    editor.focus();
  };

  return (
    <div className="flex row code-editor">
      <div className="flex column input-container">
        <div className="flex row center input-header">
          <p className="white-txt">Input</p>
          <button className="action-btn blue-txt black-bg" onClick={run}>
            Run
          </button>
        </div>
        <Editor
          defaultLanguage="javascript"
          defaultValue="// start code"
          theme="vs-dark"
          value={code}
          onChange={(newCode) => setCode(newCode)}
          onMount={onMount}
        />
      </div>
      <div className="flex column output-container">
        <p className="white-txt">Output</p>
        <div className="flex vs-bg output white-txt">{output}</div>
      </div>
    </div>
  );
};

export default CodeEditor;
