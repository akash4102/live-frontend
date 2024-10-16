import React from "react";
import "./index.css";

const HotelImages = ({ images }) => {
  return (
    <div className="hotel-images">
      {images &&
        images.map((img, index) => (
          <img
            key={index}
            src={img}
            alt={`hotel-img-${index}`}
            className="hotel-image"
          />
        ))}
    </div>
  );
};

export default HotelImages;
