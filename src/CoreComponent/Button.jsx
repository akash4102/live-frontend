import React from "react";

const Button = ({ type, label, variant, fullWidth }) => (
  <button
    type={type}
    className={`btn btn-${variant} ${fullWidth ? "w-100" : ""}`}
  >
    {label}
  </button>
);

export default Button;
