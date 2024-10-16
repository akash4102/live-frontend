import React from "react";
import { Link, useNavigate } from "react-router-dom";
import { useAuthContext } from "../Context/AuthContext";
import { showToast } from "../utils/toast";
import { logoutUser } from "../services/authService";

const Logout = () => {
  const { setLoggedIn, setUser } = useAuthContext();
  const navigate = useNavigate();

  const handleLogout = async () => {
    const response = await logoutUser();
    if (response.success) {
      showToast(response.message, "success");
      setTimeout(() => {
        localStorage.removeItem("user");
        localStorage.removeItem("role");
        localStorage.removeItem("token");
        setLoggedIn(false);
        setUser(null);
        navigate("/");
      }, 1000);
    } else {
      showToast("internal server error", "error");
    }
  };
  return (
    <>
      <li>
        <Link className="dropdown-item" to={"/profile"}>
          Profile
        </Link>
      </li>
      <li>
        <hr className="dropdown-divider" />
      </li>
      <button className="dropdown-item" onClick={handleLogout}>
        Logout
      </button>
    </>
  );
};

export default Logout;
