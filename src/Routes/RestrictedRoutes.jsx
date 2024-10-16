import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";

const restrictedRoute = ({ children }) => {
  const { loggedIn } = useAuthContext();
  if (loggedIn) {
    return <Navigate to="/" />;
  }
  return children;
};

export default restrictedRoute;
