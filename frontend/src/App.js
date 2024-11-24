import Navbar from './base/navbar';
import LeftPannel from './components/LeftPanel';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";


function App() {
  return (
    <div className="App">
   <Routes>/
        <Route path="/" element={ <LeftPannel/>}/>
     
     
      </Routes>
    </div>
  );
}

export default App;
