import Navbar from './base/navbar';
import './App.css';
import { Routes, Route, useLocation } from "react-router-dom";


function App() {
  return (
    <div className="App">
   <Routes>/
        <Route path="/" element={ <Navbar/>}/>
     
     
      </Routes>
    </div>
  );
}

export default App;
