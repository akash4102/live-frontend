import React from "react";
import "./index.css";
import { useAuthContext } from "../Context/AuthContext";
import { showToast } from "../utils/toast";

const Card = ({ hotel }) => {
  const { role } = useAuthContext();
  const {
    name,
    description,
    price,
    images,
    address_list,
    location,
    overall_rating,
    amenities,
  } = hotel;

  return (
    <div className="hotel-card">
      <img src={images[0]} alt={name} className="hotel-card-img" />

      <div className="hotel-card-body">
        <h5 className="hotel-card-title">{name}</h5>

        <p className="hotel-card-description">{description}</p>

        {address_list && address_list.city && (
          <p className="hotel-card-address">
            <strong>City:</strong> {address_list.city}
          </p>
        )}

        {amenities && amenities.length > 0 && (
          <ul className="hotel-card-amenities">
            <strong>Amenities:</strong>
            {amenities.map((amenity, index) => (
              <li key={index}>{amenity}</li>
            ))}
          </ul>
        )}

        <a href={`/hotel/${hotel._id}`} className="hotel-card-btn">
          View Details
        </a>
      </div>
    </div>
  );
};

export default Card;
