import React from "react";
import { BrowserRouter as Router, Route, Routes } from "react-router-dom";
import InventoryList from "../components/InventoryList/InventoryList";
import Navbar from "../components/common/Navbar";
import Home from "../components/common/Home"; // Ensure this import is correct
import ProtectedRoute from "../components/common/ProtectedRoute";
import Auth from "../components/auth/Auth";
import "bootstrap/dist/css/bootstrap.min.css";

const App = () => {
  return (
    <Router>
      <Navbar />
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route
          path="/inventory"
          element={<ProtectedRoute component={<InventoryList />} />}
        />
      </Routes>
    </Router>
  );
};

export default App;
