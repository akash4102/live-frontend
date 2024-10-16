import React, { useEffect, useState } from "react";
import DataTable from "react-data-table-component";
import Sidebar from "./Sidebar";
import { Container, Row, Col, Button, Modal, Form } from "react-bootstrap";
import "./index.css";
import { getAllBookingsAdmin } from "../../services/authService";
import {
  updateBookingStatus,
  updateBookingDetails,
} from "../../services/hotelService";
import { showToast } from "../../utils/toast";

const AdminBookings = () => {
  const [loading, setLoading] = useState(false);
  const [bookings, setBookings] = useState([]);
  const [selectedBooking, setSelectedBooking] = useState(null);
  const [showEditModal, setShowEditModal] = useState(false);
  const [editCheckInDate, setEditCheckInDate] = useState("");
  const [editCheckOutDate, setEditCheckOutDate] = useState("");

  async function getAllBookigns() {
    const response = await getAllBookingsAdmin();
    setBookings(response);
  }

  useEffect(() => {
    setLoading(true);
    getAllBookigns();
    setLoading(false);
  }, []);

  const changeBookingStatus = async (bookingId, status) => {
    try {
      setLoading(true);
      const response = await updateBookingStatus(bookingId, status);
      if (response.success) {
        showToast(response.message, "success");
        setBookings(
          bookings.map((booking) =>
            booking._id === bookingId ? { ...booking, status } : booking
          )
        );
      } else {
        showToast("Error while updating status", "error");
      }
    } catch (error) {
      console.error("Error changing booking status:", error);
    } finally {
      setLoading(false);
    }
  };

  const handleEditBooking = (booking) => {
    setSelectedBooking(booking);
    setEditCheckInDate(
      new Date(booking.checkInDate).toISOString().slice(0, 10)
    );
    setEditCheckOutDate(
      new Date(booking.checkOutDate).toISOString().slice(0, 10)
    );
    setShowEditModal(true);
  };

  const saveEditedBooking = async () => {
    try {
      setLoading(true);
      const updatedBooking = {
        ...selectedBooking,
        checkInDate: editCheckInDate,
        checkOutDate: editCheckOutDate,
      };
      const response = await updateBookingDetails(
        selectedBooking._id,
        updatedBooking
      );
      if (response.success) {
        showToast("Booking updated successfully", "success");
        setBookings(
          bookings.map((booking) =>
            booking._id === selectedBooking._id
              ? {
                  ...booking,
                  checkInDate: editCheckInDate,
                  checkOutDate: editCheckOutDate,
                }
              : booking
          )
        );
        setShowEditModal(false);
      } else {
        showToast("Error while updating booking", "error");
      }
    } catch (error) {
      console.error("Error saving booking:", error);
    } finally {
      setLoading(false);
    }
  };

  const columns = [
    {
      name: "Booking ID",
      selector: (row) => row._id,
      sortable: true,
    },
    {
      name: "Hotel Id",
      selector: (row) => row.hotel || "N/A",
      sortable: true,
    },
    {
      name: "Rooms Booked",
      selector: (row) =>
        row.rooms
          .map((room) => `Room ID: ${room._id}, Quantity: ${room.quantity}`)
          .join(", "),
      sortable: false,
    },
    {
      name: "Status",
      selector: (row) => row.status,
      sortable: true,
    },
    {
      name: "Booking Date",
      selector: (row) => new Date(row?.created).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "CheckIn Date",
      selector: (row) => new Date(row?.checkInDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "CheckOut Date",
      selector: (row) => new Date(row?.checkOutDate).toLocaleDateString(),
      sortable: true,
    },
    {
      name: "Actions",
      cell: (row) => (
        <div>
          <Button
            variant="success"
            size="sm"
            className="me-2"
            onClick={() => changeBookingStatus(row._id, "completed")}
          >
            Mark as Completed
          </Button>
          <Button
            variant="danger"
            size="sm"
            className="me-2"
            onClick={() => changeBookingStatus(row._id, "cancelled")}
          >
            Mark as Cancelled
          </Button>
          <Button
            variant="warning"
            size="sm"
            onClick={() => handleEditBooking(row)}
          >
            Edit Booking
          </Button>
        </div>
      ),
      ignoreRowClick: true,
      allowOverflow: true,
      button: true,
    },
  ];

  const conditionalRowStyles = [
    {
      when: (row) => row.status === "completed",
      style: {
        backgroundColor: "rgba(63, 81, 181, 0.1)",
        color: "#3f51b5",
      },
    },
    {
      when: (row) => row.status === "booked",
      style: {
        backgroundColor: "rgba(76, 175, 80, 0.1)",
        color: "#4caf50",
      },
    },
    {
      when: (row) => row.status === "cancelled",
      style: {
        backgroundColor: "rgba(244, 67, 54, 0.1)",
        color: "#f44336",
      },
    },
  ];

  return (
    <>
      <Container fluid>
        <Row>
          <Col md={2} className="p-0">
            <Sidebar />
          </Col>
          {loading ? (
            "loading booking data"
          ) : (
            <Col md={10} className="users p-4">
              <h1 className="mb-4">All Bookings for all users and Admins</h1>
              <DataTable
                title="Bookings"
                columns={columns}
                data={bookings}
                progressPending={loading}
                pagination
                paginationRowsPerPageOptions={[10, 20, 30]}
                conditionalRowStyles={conditionalRowStyles}
                className="table-striped"
              />
            </Col>
          )}
        </Row>
      </Container>

      {/* Modal for Editing Booking */}
      <Modal show={showEditModal} onHide={() => setShowEditModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>Edit Booking</Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group controlId="formCheckInDate">
              <Form.Label>Check-In Date</Form.Label>
              <Form.Control
                type="date"
                value={editCheckInDate}
                onChange={(e) => setEditCheckInDate(e.target.value)}
              />
            </Form.Group>
            <Form.Group controlId="formCheckOutDate" className="mt-3">
              <Form.Label>Check-Out Date</Form.Label>
              <Form.Control
                type="date"
                value={editCheckOutDate}
                onChange={(e) => setEditCheckOutDate(e.target.value)}
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowEditModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={saveEditedBooking}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </>
  );
};

export default AdminBookings;
