import React from "react";
import { Navigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { showToast } from "../utils/toast";

const AdminRoute = ({ children }) => {
  const { role } = useAuthContext();
  if (role !== "admin") {
    showToast("Not Authorize", "warning");
    return <Navigate to="/" />;
  }
  return children;
};

export default AdminRoute;
