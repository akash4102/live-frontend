import React, { useEffect, useState } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import "./index.css";
import { useHotelContext } from "../../Context/HotelContext";
import { useParams } from "react-router-dom";
import NavBar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import BookingModal from "../BookHotel";
import { useAuthContext } from "../../Context/AuthContext";
import ShowBookingDetails from "../BookingDetails";
import { removeHotel } from "../../services/hotelService";
import { showToast } from "../../utils/toast";
import ReviewModal from "./ReviewModal";

const HotelDetails = () => {
  const [showBookingDetailsModal, setShowBookingDetailsModal] = useState(false);
  const [bookingData, setBookingData] = useState({});
  const { hotelId } = useParams();
  const { role, loggedIn } = useAuthContext();
  const { hotels, loading, fetchHotels } = useHotelContext();
  const [mainImage, setMainImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [isReviewModalOpen, setIsReviewModalOpen] = useState(false);
  const [searchParams, setSearchParams] = useSearchParams();
  const navigate = useNavigate();

  useEffect(() => {
    const openModal = searchParams.get("openModal");
    if (openModal === "true") {
      setIsModalOpen(true);
    }
  }, [searchParams]);

  const handleDeleteHotel = async () => {
    const response = await removeHotel(hotel._id);
    if (response.success) {
      showToast(response.message, "success");
      fetchHotels();
      navigate("/admin/hotels");
    } else {
      showToast("error while removing hotel", "error");
    }
  };

  if (loading) {
    return <div>Loading hotel details...</div>;
  }

  useEffect(() => {
    const hotel = hotels.find((data) => data._id === hotelId);
    if (hotel && hotel.images.length > 0) {
      setMainImage(hotel.images[0]);
    }
  }, [hotels, hotelId]);

  const hotel = hotels.find((data) => data._id === hotelId);
  if (!hotel) {
    return <div>Hotel not found.</div>;
  }

  const handleOpenModal = () => {
    setSearchParams({ openModal: "true" });
    setIsModalOpen(true);
  };

  const handleCloseModal = () => {
    setIsModalOpen(false);
    setSearchParams((prev) => {
      const newParams = new URLSearchParams(prev);
      newParams.delete("openModal");
      return newParams;
    });
  };

  const handleOpenReviewModal = () => {
    setIsReviewModalOpen(true);
  };

  const handleCloseReviewModal = () => {
    setIsReviewModalOpen(false);
  };
  console.log(hotel, "current hotel is");
  return (
    <>
      {role != "admin" && <NavBar />}
      {role == "admin" ? (
        <div className="">
          <a href={`/admin/hotels`} className="hotel-card-btn">
            all hotels
          </a>
          <a href={`/admin/edit-hotel/${hotel._id}`} className="hotel-card-btn">
            Edit Hotel
          </a>
          <button onClick={handleDeleteHotel} className="hotel-card-btn">
            Delete Hotel
          </button>
          <a href={`/admin/edit-room/${hotel._id}`} className="hotel-card-btn">
            Add Or Edit Rooms
          </a>
        </div>
      ) : (
        <div>
          {loggedIn && (
            <button onClick={handleOpenReviewModal} className="hotel-card-btn">
              Add Review
            </button>
          )}
          <div className="hotel-actions">
            <button className="reserve-btn" onClick={handleOpenModal}>
              Book
            </button>
          </div>
        </div>
      )}
      <div className="hotel-details-page hotel-details-container">
        <div className="left-section">
          <div className="main-image">
            <img src={mainImage} alt="Hotel main view" />
          </div>
          <div className="image-thumbnails">
            {hotel?.images?.map((img, index) => (
              <img
                key={index}
                src={img}
                alt={`Thumbnail ${index}`}
                onClick={() => setMainImage(img)}
                className={mainImage === img ? "active-thumbnail" : ""}
              />
            ))}
          </div>
        </div>
        <div className="right-section">
          <h1>{hotel.name}</h1>
          <p className="hotel-location">
            {hotel.address_list.city} -{" "}
            <a href={hotel?.map_url} target="_blank" rel="noreferrer">
              Show on map
            </a>
          </p>

          <div className="hotel-contact">
            <p>Phone: {hotel?.contact?.phone}</p>
            <p>Email: {hotel?.contact?.email}</p>
          </div>

          <div className="hotel-ratings">
            <span className="rating">{hotel?.overall_rating.toFixed(1)}</span> /
            5
          </div>

          <div className="hotel-amenities">
            <h3>Amenities</h3>
            <ul>
              {hotel?.amenities.map((amenity, index) => (
                <li key={index}>{amenity}</li>
              ))}
            </ul>
          </div>

          <div className="hotel-policies">
            <h3>Policies</h3>
            <p>Check-in Time: {hotel?.policies?.checkInTime}</p>
            <p>Check-out Time: {hotel?.policies?.checkOutTime}</p>
            <p>Cancellation Policy: {hotel?.policies?.cancellationPolicy}</p>
            <p>Refund Policy: {hotel?.policies?.refundPolicy}</p>
          </div>

          <div className="hotel-reviews">
            <h3>Reviews</h3>
            {hotel.reviews.length > 0 ? (
              <ul>
                {hotel?.reviews?.map((review, index) => (
                  <li key={index}>
                    <strong>Rating:</strong> {review?.rating} / 5 <br />
                    <strong>Comment:</strong> {review?.comment}
                  </li>
                ))}
              </ul>
            ) : (
              <p>No reviews yet.</p>
            )}
          </div>

          {isModalOpen && (
            <BookingModal
              hotel={hotel}
              onClose={handleCloseModal}
              setBookingData={setBookingData}
              setShowBookingDetailsModal={setShowBookingDetailsModal}
            />
          )}
          {showBookingDetailsModal && (
            <ShowBookingDetails
              bookingData={bookingData}
              onClose={() => setShowBookingDetailsModal(false)}
            />
          )}
          {isReviewModalOpen && (
            <ReviewModal hotelId={hotelId} onClose={handleCloseReviewModal} />
          )}
        </div>
      </div>
      <div className="hotel-room-details">
        <h3>Available Rooms</h3>
        {hotel.roomDetails.length > 0 ? (
          <ul>
            {hotel?.roomDetails
              .filter((room) => {
                return role === "admin" || room.room.status === "available";
              })
              .map((room, index) => (
                <li key={index} className="room-item">
                  <h4>
                    {room.room.type.charAt(0).toUpperCase() +
                      room.room.type.slice(1)}{" "}
                    Room
                  </h4>
                  <p>
                    <strong>Price per Night:</strong> $
                    {room?.room?.pricePerNight}
                  </p>
                  <p>
                    <strong>Description:</strong> {room?.room?.description}
                  </p>
                  <p>
                    <strong>Features:</strong> {room?.room?.features.join(", ")}
                  </p>
                  <p>
                    <strong>Status:</strong> {room?.room?.status}
                  </p>
                  <div className="room-images">
                    {room?.room?.images.map((img, imgIndex) => (
                      <img
                        key={imgIndex}
                        src={img}
                        alt={`Room ${index} Image ${imgIndex}`}
                        className="room-thumbnail"
                      />
                    ))}
                  </div>
                </li>
              ))}
          </ul>
        ) : (
          <p>No rooms available.</p>
        )}
      </div>
      {role != "admin" && <Footer />}
    </>
  );
};

export default HotelDetails;
