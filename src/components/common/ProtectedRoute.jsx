// src/components/common/ProtectedRoute.js

import React from "react";
import { useAuth } from "../../Context/AuthContext";
import { Navigate, useLocation } from "react-router-dom";

const ProtectedRoute = ({ component: Component }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return <div>Loading...</div>;
  }

  return user ? Component : <Navigate to="/auth" />;
};

export default ProtectedRoute;
