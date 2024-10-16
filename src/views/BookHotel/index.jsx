import React, { useState, useEffect } from "react";
import { useSearchParams, useNavigate } from "react-router-dom";
import { Modal, Button, Form, Row, Col } from "react-bootstrap";
import Joi from "joi";
import { bookHotel } from "../../services/hotelService";
import { showToast } from "../../utils/toast";
import { useAuthContext } from "../../Context/AuthContext";
import "./index.css";

const bookHotelSchema = Joi.object({
  rooms: Joi.array()
    .items(
      Joi.object({
        room: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
        quantity: Joi.number().integer().min(1).required(),
        hotelId: Joi.string().required().regex(/^[0-9a-fA-F]{24}$/),
      })
    )
    .min(1)
    .required(),
  checkInDate: Joi.date().iso().required(),
  checkOutDate: Joi.date().iso().greater(Joi.ref("checkInDate")).required(),
});

const BookingModal = ({
  hotel,
  onClose,
  setBookingData,
  setShowBookingDetailsModal,
}) => {
  const { role, loggedIn } = useAuthContext();
  const [selectedRooms, setSelectedRooms] = useState([]);
  const [totalPrice, setTotalPrice] = useState(0);
  const [checkInDate, setCheckInDate] = useState("");
  const [checkOutDate, setCheckOutDate] = useState("");
  const [searchParams, setSearchParams] = useSearchParams();
  const [error, setError] = useState(""); 
  const navigate = useNavigate();


  useEffect(() => {
    const roomParams = searchParams.getAll("room");
    const quantityParams = searchParams.getAll("quantity");
    const checkIn = searchParams.get("checkInDate");
    const checkOut = searchParams.get("checkOutDate");

    if (roomParams.length > 0 && quantityParams.length > 0) {
      const loadedRooms = roomParams.map((type, index) => {
        const selectedRoom = availableRooms.find(
          (roomDetail) => roomDetail.room.type === type
        );
        return {
          type,
          quantity: quantityParams[index],
          price: selectedRoom ? selectedRoom.room.pricePerNight : 0,
        };
      });
      setSelectedRooms(loadedRooms);
      calculateTotalPrice(loadedRooms);
    }

    if (checkIn) setCheckInDate(checkIn);
    if (checkOut) setCheckOutDate(checkOut);
  }, [searchParams]);

  const availableRooms =
    role === "admin"
      ? hotel.roomDetails
      : hotel.roomDetails.filter(
          (roomDetail) => roomDetail.room.status === "available"
        );

  const handleAddRoom = () => {
    setSelectedRooms([...selectedRooms, { type: "", quantity: 1, price: 0 }]);
  };

  const handleRoomChange = (index, field, value) => {
    const updatedRooms = selectedRooms.map((room, idx) => {
      if (idx === index) {
        const selectedRoom = availableRooms.find(
          (roomDetail) => roomDetail.room.type === value
        );
        const price = selectedRoom ? selectedRoom.room.pricePerNight : 0;
        return {
          ...room,
          [field]: value,
          price: field === "type" ? price : room.price,
        };
      }
      return room;
    });

    setSelectedRooms(updatedRooms);
    calculateTotalPrice(updatedRooms);

    setSearchParams((prevParams) => {
      const newParams = new URLSearchParams(prevParams);
      newParams.delete("room");
      newParams.delete("quantity");
      updatedRooms.forEach((room) => {
        newParams.append("room", room.type);
        newParams.append("quantity", room.quantity);
      });
      return newParams;
    });
  };

  const calculateTotalPrice = (rooms) => {
    const total = rooms.reduce(
      (acc, room) => acc + room.quantity * room.price,
      0
    );
    setTotalPrice(total);
  };

  const handleBookNow = async () => {
    const today = new Date().toISOString().split("T")[0];
    if (!checkInDate || !checkOutDate) {
      setError("Please select both check-in and check-out dates.");
      return;
    }
    if (checkInDate < today) {
      setError("Check-in date cannot be a past date.");
      return;
    }
    if (checkOutDate <= checkInDate) {
      setError("Check-out date must be greater than check-in date.");
      return;
    }

    const bookingData = {
      rooms: selectedRooms.map((room) => {
        const selectedRoom = availableRooms.find(
          (roomDetail) => roomDetail.room.type === room.type
        );
        return {
          hotelId: hotel._id,
          room: selectedRoom.room._id,
          quantity: room.quantity,
        };
      }),
      checkInDate,
      checkOutDate,
    };

    const { error: validationError } = bookHotelSchema.validate(bookingData, {
      abortEarly: false, 
    });

    if (validationError) {
      setError(validationError.details.map((d) => d.message).join(", "));
      return;
    }

    if (!loggedIn) {
      const currentPath = window.location.pathname;
      const queryParams = window.location.search;
      navigate(`/login?redirect=${currentPath}${queryParams}`);
      return;
    }

    const response = await bookHotel(bookingData);
    if (response.success) {
      setBookingData(response.data.booking);
      setShowBookingDetailsModal(true);
      showToast(response.message,"success");
    } else {
      showToast("Error while booking", "error");
    }
    onClose();
  };

  return (
    <Modal show onHide={onClose} centered>
      <Modal.Header closeButton>
        <Modal.Title>Book Your Stay</Modal.Title>
      </Modal.Header>
      <Modal.Body>
        {error && <div className="alert alert-danger">{error}</div>}
        <Form>
          <Row>
            <Col>
              <Form.Group controlId="checkInDate">
                <Form.Label>Check-In Date</Form.Label>
                <Form.Control
                  type="date"
                  value={checkInDate}
                  onChange={(e) => {
                    setCheckInDate(e.target.value);
                    setError("");
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev);
                      newParams.set("checkInDate", e.target.value);
                      return newParams;
                    });
                  }}
                  min={new Date().toISOString().split("T")[0]}
                />
              </Form.Group>
            </Col>
            <Col>
              <Form.Group controlId="checkOutDate">
                <Form.Label>Check-Out Date</Form.Label>
                <Form.Control
                  type="date"
                  value={checkOutDate}
                  onChange={(e) => {
                    setCheckOutDate(e.target.value);
                    setError("");
                    setSearchParams((prev) => {
                      const newParams = new URLSearchParams(prev);
                      newParams.set("checkOutDate", e.target.value);
                      return newParams;
                    });
                  }}
                  min={checkInDate || new Date().toISOString().split("T")[0]}
                />
              </Form.Group>
            </Col>
          </Row>

          {selectedRooms.map((room, index) => (
            <Row key={index} className="mb-3">
              <Col>
                <Form.Group controlId={`roomType${index}`}>
                  <Form.Label>Room Type</Form.Label>
                  <Form.Select
                    value={room.type}
                    onChange={(e) =>
                      handleRoomChange(index, "type", e.target.value)
                    }
                  >
                    <option value="">Select Room Type</option>
                    {availableRooms.map((roomDetail, idx) => (
                      <option key={idx} value={roomDetail.room.type}>
                        {roomDetail.room.type} - $
                        {roomDetail.room.pricePerNight}/night
                      </option>
                    ))}
                  </Form.Select>
                </Form.Group>
              </Col>
              <Col>
                <Form.Group controlId={`quantity${index}`}>
                  <Form.Label>Quantity</Form.Label>
                  <Form.Control
                    type="number"
                    value={room.quantity}
                    min="1"
                    onChange={(e) =>
                      handleRoomChange(index, "quantity", e.target.value)
                    }
                  />
                </Form.Group>
              </Col>
            </Row>
          ))}

          <Button variant="secondary" onClick={handleAddRoom}>
            Add Another Room
          </Button>
          <div className="mt-3">
            <strong>Total Price: ${totalPrice}</strong>
          </div>
        </Form>
      </Modal.Body>
      <Modal.Footer>
        <Button variant="secondary" onClick={onClose}>
          Close
        </Button>
        <Button variant="primary" onClick={handleBookNow}>
          Book Now
        </Button>
      </Modal.Footer>
    </Modal>
  );
};

export default BookingModal;
