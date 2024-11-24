import React, { useState, useRef } from "react";
import Editor from "@monaco-editor/react";
import axios from "axios";

const CodeEditor = () => {
  const editorRef = useRef();
  const [code, setCode] = useState("");
  const [output, setOutput] = useState("// output");

  const escapeCodeForJSON = (code) => {
    return code.replace(/\n/g, "\\n").replace(/"/g, '\\"');
  };

  const run = async () => {
    const code = editorRef.current?.getValue();
    if (!code) return;
  
    try {
      const escapedCode = escapeCodeForJSON(code)
  
      const response = await axios.post("https://emkc.org/api/v2/execute", {
        language: "python",
        version: "3.10.0",
        files: [{ content: escapedCode }],
      });
  
      const stdout = response.data?.run?.stdout || "";
      const stderr = response.data?.run?.stderr || "";
  
      if (stderr) {
        setOutput("Code Error: " + stderr);
      } else {
        setOutput(stdout || "No output");
      }
    } catch (error) {
      setOutput("Error: " + (error.message || "Unable to execute code"));
      console.error(error);
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
          defaultLanguage="python"
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
