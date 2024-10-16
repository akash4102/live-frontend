import React, { useState, useEffect } from "react";
import { Container, Row, Col, Card } from "react-bootstrap";
import Sidebar from "./Sidebar";
import { fetchAdminDashboardData } from "../../services/authService";
import { Pie } from "@ant-design/charts";
import "./index.css";

const AdminDashboard = () => {
  const [dashboardData, setDashboardData] = useState({});
  const [loading, setLoading] = useState(false);

  async function fetchDashboardDetails() {
    const response = await fetchAdminDashboardData();
    setDashboardData(response);
    setLoading(false);
  }

  useEffect(() => {
    setLoading(true);
    fetchDashboardDetails();
  }, []);

  const hotelStatusData = [
    { type: "Total Hotels", value: dashboardData.totalHotels || 0 },
    { type: "Active Hotels", value: dashboardData.activeHotels || 0 },
    { type: "Deleted Hotels", value: dashboardData.deletedHotels || 0 },
  ];

  const userStatusData = [
    { type: "Total Users", value: dashboardData.totalUsers || 0 },
    { type: "Active Users", value: dashboardData.activeUsers || 0 },
    { type: "Admins", value: dashboardData.totalAdmins || 0 },
  ];

  const bookingStatusData = [
    { type: "Total Bookings", value: dashboardData.totalBookings || 0 },
    { type: "Active Bookings", value: dashboardData.activeBookings || 0 },
    { type: "Completed Bookings", value: dashboardData.completedBookings || 0 },
    { type: "Cancelled Bookings", value: dashboardData.cancelledBookings || 0 },
  ];

  const roomStatusData = [
    { type: "Total Rooms", value: dashboardData.totalRooms || 0 },
    { type: "Available Rooms", value: dashboardData.availableRooms || 0 },
    { type: "Booked Rooms", value: dashboardData.bookedRooms || 0 },
  ];

  const pieConfig = (data) => ({
    appendPadding: 10,
    data,
    angleField: "value",
    colorField: "type",
    radius: 0.8,
    label: {
      type: "outer",
      content: "{name} ({percentage})",
    },
    interactions: [{ type: "element-active" }],
  });

  if (loading) {
    return ;
  }

  return (
    <>
      {!loading ? (
      <div className="d-flex">
        <div className="sidebar-container">
          <Sidebar />
        </div>
        <Container fluid className="dashboard-container">
          <h1 className="dashboard-title">Admin Dashboard</h1>

          <Row className="mt-4">
            <Col lg={6}>
              <Card className="stat-card">
                <Card.Body>
                  <h3>Hotel Status Overview</h3>
                  <Pie {...pieConfig(hotelStatusData)} />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="stat-card">
                <Card.Body>
                  <h3>User Status Overview</h3>
                  <Pie {...pieConfig(userStatusData)} />
                </Card.Body>
              </Card>
            </Col>
          </Row>

          <Row className="mt-4">
            <Col lg={6}>
              <Card className="stat-card">
                <Card.Body>
                  <h3>Booking Status Overview</h3>
                  <Pie {...pieConfig(bookingStatusData)} />
                </Card.Body>
              </Card>
            </Col>
            <Col lg={6}>
              <Card className="stat-card">
                <Card.Body>
                  <h3>Room Status Overview</h3>
                  <Pie {...pieConfig(roomStatusData)} />
                </Card.Body>
              </Card>
            </Col>
          </Row>
        </Container>
      </div>
      ): <div>loading data</div>}
    </>
  );
};

export default AdminDashboard;
