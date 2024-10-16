import React from "react";

const TextArea = ({ label, name, value, onChange, placeholder }) => {
  return (
    <div className="textarea-group">
      <label htmlFor={name}>{label}</label>
      <textarea
        name={name}
        value={value}
        onChange={onChange}
        placeholder={placeholder}
        className="textarea"
      />
    </div>
  );
};

export default TextArea;
