import React, {useState,useRef} from "react"
import Editor from '@monaco-editor/react';
const CodeEditor = ()=>{
    const editorRef = useRef();
    const [code,setCode]=useState();
    
    const onMount = (editor) =>{
        editorRef.current = editor;
        editor.focus();
    }

    return(
        <div className="flex row code-editor">
            <div className="flex column input-container">
                <div className="flex row center input-header">

                    <p className="white-txt">Input</p>
                    <button className="action-btn blue-txt black-bg">Run</button>
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
                <div className="flex vs-bg output">

                </div>
            </div>
        </div>
    )
}

export default CodeEditor;