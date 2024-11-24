import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/leftPannel.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../../base/navbar';
import LeftPannel from "../../components/LeftPanel";
import RightPanel from "../../components/RightPanel";


const AppLayout = () =>{





    return(

     <div className="layouts">
        <Navbar/>
        <div className="container">
                
        <div className="left-panel">
            <LeftPannel />
            </div>

            <div className="middle-panel">
            <h3>Code Compiler</h3>
            <textarea
             placeholder="Write your code here..."> 
             </textarea>
            <button>Run Code</button>
        </div>

      <div className="right-panel">
       <RightPanel/>
      </div>
            
            </div>
            </div>

    );
}

export default AppLayout;