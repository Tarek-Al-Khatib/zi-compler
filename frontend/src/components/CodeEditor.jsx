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
        <div>
            <Editor 
            className="code-editor"
            height="70vh" 
            defaultLanguage="javascript" 
            defaultValue="// start code" 
            theme="vs-dark" 
            value={code}
            onChange={(code, )=>setCode(code)}
            onMount={onMount}
            />
        </div>
    )
}

export default CodeEditor;