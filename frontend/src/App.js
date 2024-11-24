import Navbar from "./base/navbar";
import LeftPannel from "./components/LeftPanel";
import "./App.css";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Auth from "./pages/Auth/Auth";

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Auth />} />
          <Route path="/panel" element={<LeftPannel />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;
