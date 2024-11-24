import './styles/colors.css'
import './styles/utilities.css'
import './styles/base.css'
import './styles/editor.css'
import { Routes, Route, useLocation } from "react-router-dom";
import Compilar from "./pages/Compiler"
const App = () => {
  // const location = useLocation();

  return (
    <div className='app white-bg'>
      <Routes>
        <Route path="/" element={<Compilar />} />
      </Routes>
    </div>
  );
};

export default App;

