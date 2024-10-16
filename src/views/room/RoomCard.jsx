import React from "react";
import { Card, Col } from "react-bootstrap";
import { Link } from "react-router-dom";

const RoomCard = ({ room }) => {
  return (
    <Col key={room._id} className="mb-4" xs={12} md={6} lg={4}>
      <Card className="room-card">
        <div className="room-img">
          <Link to={`/book-room/${room._id}`}>
            <Card.Img
              variant="top"
              src={`${room.images[0]}`}
              alt="Room Photo"
            />
          </Link>
        </div>
        <Card.Body className="room-details">
          <Card.Title className="room-type">
            {room.type.charAt(0).toUpperCase() + room.type.slice(1)} Room
          </Card.Title>
          <Card.Text className="room-price">
            ${room.pricePerNight} / night
          </Card.Text>
          <Card.Text className="room-description">{room.description}</Card.Text>
          <Link
            to={`/hotel/${room.hotel}`}
            className="btn btn-primary btn-block"
          >
            Book Now
          </Link>
        </Card.Body>
      </Card>
    </Col>
  );
};

export default RoomCard;
