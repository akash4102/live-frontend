import React, { useEffect } from "react";
import { useNavigate } from "react-router-dom";
import "./index.css";

const ShowBookingDetails = ({ bookingData, onClose }) => {
  const navigate = useNavigate();

  console.log("booking data is", bookingData);
  const handleViewAllBookings = () => {
    navigate("/find-booking");
  };

  useEffect(() => {
    console.log("componet load");
  });

  return (
    <div className="modal-overlay">
      <div className="modal-content">
        <h2>Your Booking Details</h2>

        <div className="booking-details">
          <p>
            <strong>Hotel: </strong> {bookingData.hotel}
          </p>
          <p>
            <strong>Booking Date: </strong>{" "}
            {new Date(bookingData.created).toLocaleDateString()}
          </p>
          <p>
            <strong>Check IN Date: </strong>{" "}
            {new Date(bookingData.checkInDate).toLocaleDateString()} 11Am
          </p>
          <p>
            <strong>Check OUT Date: </strong>{" "}
            {new Date(bookingData.checkOutDate).toLocaleDateString()} 10Am
          </p>
          <p>
            <strong>Status: </strong> {bookingData.status}
          </p>

          <h3>Rooms Booked:</h3>
          {bookingData.rooms.map((room, index) => (
            <div key={index} className="room-details">
              <p>
                <strong>Room Type: </strong> {room.room}
              </p>
              <p>
                <strong>Quantity: </strong> {room.quantity}
              </p>
            </div>
          ))}
        </div>

        <button className="btn btn-primary" onClick={handleViewAllBookings}>
          View All Bookings
        </button>
        <button className="close-modal-btn" onClick={onClose}>
          Close
        </button>
      </div>
    </div>
  );
};

export default ShowBookingDetails;
