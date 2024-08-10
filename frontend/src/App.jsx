import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";
import Home from "./pages/Home";
import Profile from "./pages/profile";
import LED from "./pages/led"
import NavBar from './pages/NavBar';
const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch(" http://localhost:7000/api")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((error) => console.log("Error fetching message:", error));
  }, []);

  return (
    <Router>
     <NavBar />
      <Routes>
        <Route path="/" element={<Home/>}/>
        <Route path="/register" element={<Register />} />
        <Route path="/login" element={<Login />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/products" element={<LED/>}/>
      </Routes>
    </Router>
  );
};

export default App;
