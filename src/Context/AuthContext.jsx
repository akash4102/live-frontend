import React, { createContext, useContext, useState, useEffect } from "react";
import { authenticateUser } from "../services/authService";
const AuthContext = createContext();

export const useAuthContext = () => useContext(AuthContext);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(null);
  const [loading, setLoading] = useState(true);
  const [loggedIn, setLoggedIn] = useState(false);
  const [role, setRole] = useState("");

  useEffect(() => {
    async function loadUser() {
      const token = localStorage.getItem("token");
      if (token) {
        const response = await authenticateUser();
        localStorage.setItem("user", JSON.stringify(response.user));
        setUser(response.user);
        setLoggedIn(true);
        setRole(response.user.role);
      }
      setLoading(false);
    }
    loadUser();
  }, []);

  return (
    <AuthContext.Provider
      value={{ user, loading, loggedIn, role, setLoggedIn, setUser, setRole }}
    >
      {!loading && children}
    </AuthContext.Provider>
  );
};
