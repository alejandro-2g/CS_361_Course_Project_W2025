import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Home from "./pages/Home";
import Converter from "./components/Converter";
import "./index.css";

function App() {
    return (
        <Router>
            <Routes>
                <Route path="/" element={<Home />} />
                <Route path="/convert" element={<Converter />} />
            </Routes>
        </Router>
    );
}

export default App;
