import React from "react";
import { Container, Row, Col } from "react-bootstrap";
import "./index.css";
import { useHotelContext } from "../../Context/HotelContext";
import Sidebar from "./Sidebar";
import Card from "../../Component/Card";

const AdminHotels = () => {
  const { hotels } = useHotelContext();

  return (
    <>
      <div className="d-flex">
        <div className="sidebar-container">
          <Sidebar />
        </div>

        <Container fluid>
          <div className="hotel-list-container">
            <h1>Hotels and Rooms</h1>
            <a href="/admin/add-new-hotel">Add New Hotel</a>
            <Row>
              {hotels.map((hotel) => (
                <Col lg={3} md={6} sm={12} key={hotel._id}>
                  <Card hotel={hotel} />
                </Col>
              ))}
            </Row>
          </div>
        </Container>
      </div>
    </>
  );
};

export default AdminHotels;
