import React from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Login from "./components/Login";
import Register from "./components/Register";
import Boarding from "./components/Boarding";
import Join from "./components/Join";
import CanvasPage from "./components/CanvasPage";
import "./App.css";

function App() {
  return (
    <Router>
      <div className="App">
        <Routes>
          <Route path="/" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route path="/boarding" element={<Boarding />} />
          <Route path="/join" element={<Join />} />
          <Route path="/canvas" element={<CanvasPage />} />
        </Routes>
      </div>
    </Router>
  );
}

export default App;
