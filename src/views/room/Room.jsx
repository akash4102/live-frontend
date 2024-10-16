import React, { useEffect, useState } from "react";
import RoomCard from "./RoomCard";
import { Col, Container, Row } from "react-bootstrap";
import RoomFilter from "../../Component/RoomFilter";
import RoomPaginator from "../../Component/RoomPaginator";
import { useHotelContext } from "../../Context/HotelContext";

const Room = () => {
  const { rooms, loading } = useHotelContext();
  const [filteredData, setFilteredData] = useState([]);
  const [currentPage, setCurrentPage] = useState(1);
  const [roomsPerPage] = useState(6);
  useEffect(() => {
    if (rooms.length > 0) {
      setFilteredData(rooms);
    }
  }, [rooms]);

  if (loading) {
    return <div>Loading rooms...</div>;
  }

  const handlePageChange = (pageNumber) => {
    setCurrentPage(pageNumber);
  };

  const totalPages = Math.ceil(filteredData.length / roomsPerPage);

  const renderRooms = () => {
    const startIndex = (currentPage - 1) * roomsPerPage;
    const endIndex = startIndex + roomsPerPage;
    return filteredData
      .slice(startIndex, endIndex)
      .map((room) => <RoomCard key={room?.room?._id} room={room?.room} />);
  };

  return (
    <Container>
      <Row>
        <Col md={6} className="mb-3 mb-md-0">
          <RoomFilter data={rooms} setFilteredData={setFilteredData} />
        </Col>

        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>

      <Row>{renderRooms()}</Row>

      <Row>
        <Col md={6} className="d-flex align-items-center justify-content-end">
          <RoomPaginator
            currentPage={currentPage}
            totalPages={totalPages}
            onPageChange={handlePageChange}
          />
        </Col>
      </Row>
    </Container>
  );
};

export default Room;
