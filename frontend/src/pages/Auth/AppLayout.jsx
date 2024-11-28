import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/leftPannel.css";
import { useNavigate } from "react-router-dom";
import Navbar from "../../base/navbar";
import LeftPannel from "../../components/LeftPanel";
import RightPanel from "../../components/RightPanel";
import CodeEditor from "../../components/CodeEditor";
import FilesProvider from "../../contexts/FileContext";

const AppLayout = () => {
  return (
    <div className="layouts">
      {/* <Navbar/> */}
      <FilesProvider>
        <div className="container">
          <div className="left-panel">
            <LeftPannel />
          </div>

          <div className="middle-panel">
            <CodeEditor />
          </div>

          <div className="right-panel">
            <RightPanel />
          </div>
        </div>
      </FilesProvider>
    </div>
  );
};

export default AppLayout;
