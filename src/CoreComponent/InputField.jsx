import React from 'react';

const InputField = ({ label, type, name, value, onChange, placeholder, required }) => (
  <div className="input-field mb-3">
    <label htmlFor={name} className="form-label">{label}</label>
    <input
      type={type}
      name={name}
      id={name}
      className="form-control"
      value={value}
      onChange={onChange}
      placeholder={placeholder}
      required={required}
    />
  </div>
);

export default InputField;
