import React, { useState, useEffect } from "react";
import { BrowserRouter as Router, Routes, Route } from "react-router-dom";
import Register from "./pages/register";
import Login from "./pages/login";

const App = () => {
  const [data, setData] = useState(null);

  useEffect(() => {
    fetch("")
      .then((res) => res.json())
      .then((data) => setData(data.message))
      .catch((error) => console.log("Error fetching message:", error));
  }, []);

  return (
    <Router>
      <Routes>
        
        {/* <Route path="/" element={<Register />} /> */}
        <Route path="/" element={<Login />} />
        
      </Routes>
    </Router>
  );
};

export default App;
