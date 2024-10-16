import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const PrivateRoute = ({ children }) => {
  const { loggedIn } = useAuthContext();
  if (!loggedIn) {
    return <Navigate to="/login" />;
  }
  return children;
};

export default PrivateRoute;
