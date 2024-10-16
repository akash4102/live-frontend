import React from "react";
import { Link } from "react-router-dom";
import { Container, Row, Nav, Button } from "react-bootstrap";
import "./index.css";
import { useAuthContext } from "../../Context/AuthContext";
import { useNavigate } from "react-router-dom";
import { showToast } from "../../utils/toast";
import { logoutUser } from "../../services/authService";

const Sidebar = () => {
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
    <Container fluid className="p-0">
      <Row>
        <div
          className="sidebar d-flex flex-column bg-dark text-white vh-100 position-fixed"
          style={{ width: "250px" }}
        >
          <h2 className="text-center py-4 sidebar-title">Admin Panel</h2>

          <Nav className="flex-column p-3 flex-grow-1">
            <Nav.Link
              as={Link}
              to="/admin/dashboard"
              className="text-white mb-3"
            >
              Dashboard
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/hotels" className="text-white mb-3">
              Hotels
            </Nav.Link>
            <Nav.Link
              as={Link}
              to="/admin/bookings"
              className="text-white mb-3"
            >
              Bookings
            </Nav.Link>
            <Nav.Link as={Link} to="/admin/users" className="text-white mb-3">
              Users
            </Nav.Link>
          </Nav>

          <div className="d-flex flex-column p-3">
            <Button
              as={Link}
              to="/admin/profile"
              variant="outline-light"
              className="mb-3"
            >
              Profile
            </Button>
            <Button variant="outline-light" onClick={handleLogout}>
              Logout
            </Button>
          </div>
        </div>
      </Row>
    </Container>
  );
};

export default Sidebar;
