import React from "react"
import Editor from '@monaco-editor/react';
const CodeEditor = ()=>{
    return(
        <div className="black-bg editor-container">
            <Editor defaultLanguage="javascript" defaultValue="// start" />
        </div>
    )
}

export default CodeEditor;