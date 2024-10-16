import React from "react";
import "./index.css";

const HotelFeatures = ({ features }) => {
  return (
    <div className="hotel-features">
      {features &&
        features.map((feature, index) => (
          <div key={index} className="feature-item">
            <i className={`feature-icon ${feature.iconClass}`}></i>
            <span className="feature-text">{feature.name}</span>
          </div>
        ))}
    </div>
  );
};

export default HotelFeatures;
