import Navbar from "./base/navbar";
import './styles/colors.css'
import './styles/utilities.css'
import './styles/base.css'
import './styles/editor.css'
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";
import LeftPannel from "./components/LeftPanel";
import RightPanel from "./components/RightPanel";
import AppLayout from "./pages/Auth/AppLayout";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/layout" element={<AppLayout />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
