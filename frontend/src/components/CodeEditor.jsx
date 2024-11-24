import React, {useState,useRef} from "react";
import Editor from '@monaco-editor/react';
import axios from "axios";
const CodeEditor = () => {
    const editorRef = useRef();
    const [code, setCode] = useState("");
    const [output, setOutput] = useState("// output");
  
    const run = async () => {
      const code = editorRef.current?.getValue();
      if (!code) return;
  
      try {
        const response = await axios.post("https://emkc.org/api/v2/piston/execute", {
          language: "javascript",
          version: "15.10.0",
          files: [{ content: code }],
        });
  
        setOutput(response.data?.run?.stdout || "No output");
      } catch (error) {
        setOutput("Error: Unable to execute code");
        console.error(error);
      }
    };
    const onMount = (editor) =>{
        editorRef.current = editor;
        editor.focus();
    }

    return(
        <div className="flex row code-editor">
            <div className="flex column input-container">
                <div className="flex row center input-header">

                    <p className="white-txt">Input</p>
                    <button className="action-btn blue-txt black-bg"
                    onClick={run}
                    >Run</button>
                </div>
                <Editor 
                
                // height="80vh" 
                defaultLanguage="javascript" 
                defaultValue="// start code" 
                theme="vs-dark" 
                value={code}
                onChange={(code, )=>setCode(code)}
                onMount={onMount}
                />
            </div>
            <div className="flex column output-container">
                <p className="white-txt">Output</p>
                <div className="flex vs-bg output white-txt">
                    {output}
                </div>
            </div>
        </div>
    )
}

export default CodeEditor;