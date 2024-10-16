import React from "react";

const Dropdown = ({ label, options, name, value, onChange }) => {
  return (
    <div className="dropdown-group">
      <select
        name={name}
        value={value}
        onChange={onChange}
        className="dropdown"
      >
        <option value="">{label}</option>
        {options.map((option) => (
          <option key={option.value} value={option.value}>
            {option.label}
          </option>
        ))}
      </select>
    </div>
  );
};

export default Dropdown;
