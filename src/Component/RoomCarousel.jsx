import React from "react";
import { Link } from "react-router-dom";
import { Card, Carousel, Col, Container, Row } from "react-bootstrap";
import { useHotelContext } from "../Context/HotelContext";

const RoomCarousel = () => {
  const { rooms, loading } = useHotelContext();

  if (loading) {
    return <div className="mt-5">Loading rooms....</div>;
  }

  return (
    <section className="bg-light mb-5 mt-5 shadow">
      <Link to={"/browse-all-rooms"} className="hote-color text-center">
        {rooms.length > 0 ? "Browse All Rooms" : "No Rooms Available"}
      </Link>

      <Container>
        <Carousel indicators={false}>
          {[...Array(Math.ceil(rooms.length / 4))].map((_, index) => (
            <Carousel.Item key={index}>
              <Row>
                {rooms.slice(index * 4, index * 4 + 4).map((room) => (
                  <Col
                    key={room?.room?._id}
                    className="mb-4"
                    xs={12}
                    md={6}
                    lg={3}
                  >
                    <Link
                      to={`/hotel/${room?.room?.hotel}`}
                      className="text-decoration-none"
                    >
                      <Card className="clickable-card">
                        <Card.Img
                          variant="top"
                          src={room?.room?.images[0]}
                          alt="Room Photo"
                          className="w-100"
                          style={{ height: "200px" }}
                        />
                        <Card.Body>
                          <Card.Title className="hotel-color">
                            {room?.room?.type}
                          </Card.Title>
                          <Card.Title className="room-price">
                            ${room?.room?.pricePerNight}/night
                          </Card.Title>
                          <div className="flex-shrink-0">
                            <span className="btn btn-hotel btn-sm">
                              Book Now
                            </span>
                          </div>
                        </Card.Body>
                      </Card>
                    </Link>
                  </Col>
                ))}
              </Row>
            </Carousel.Item>
          ))}
        </Carousel>
      </Container>
    </section>
  );
};

export default RoomCarousel;
