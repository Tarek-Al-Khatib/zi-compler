import React, {useState} from "react"
import Editor from '@monaco-editor/react';
const CodeEditor = ()=>{
    const [code,setCode]=useState();
    console.log(code)
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
            />
        </div>
    )
}

export default CodeEditor;