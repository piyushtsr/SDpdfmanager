import { Route, Routes } from "react-router-dom";
// import { Login, Signup } from "./pages";
import Home from "./pages/Home";
import Login from "./pages/Login";
import Signup from "./pages/Signup";
import PdfView from "./pages/PdfView";




function App() {
  return (
    <div className="App">
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/login" element={<Login />} />
        <Route path="/signup" element={<Signup />} />
        <Route path="/pdfview" element={<PdfView/>} />
      </Routes>
    </div>
  );
}

export default App;