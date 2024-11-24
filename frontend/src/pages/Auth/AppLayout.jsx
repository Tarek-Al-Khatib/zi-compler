import React, { useState, useEffect } from "react";
import axios from "axios";
import "../../styles/leftPannel.css"
import { useNavigate } from 'react-router-dom';
import Navbar from '../../base/navbar';
import LeftPannel from "../../components/LeftPanel";


const AppLayout = () =>{





    return(

        <div className="layouts">
            <Navbar/>
            <div className="container">
                
             <div className="left-panel">
                 <LeftPannel />
                </div>
            
            </div>
            </div>

    );
}

export default AppLayout;