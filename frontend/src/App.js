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
import FilesProvider from "./contexts/FileContext";
import 'typeface-fira-code';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <FilesProvider>
          <Routes>
            <Route path="/" element={<Auth />} />
            <Route path="/layout" element={<AppLayout />} />
          </Routes>
          </FilesProvider>
      </BrowserRouter>
    </div>
  );
}

export default App;
