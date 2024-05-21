import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InventoryList from "../components/InventoryList/InventoryList";
import Navbar from "../components/common/Navbar";
import Home from "../components/common/Home"; // Make sure this import is correct

import "bootstrap/dist/css/bootstrap.min.css";
// Other imports

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/inventory" element={<InventoryList />} />

        {/* Add other routes here */}
      </Routes>
    </Router>
  );
};

export default App;
