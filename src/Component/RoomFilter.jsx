import React, { useState, useEffect } from "react";

const RoomFilter = ({ data, setFilteredData }) => {
  const [filter, setFilter] = useState("all");
  const handleSelectChange = (e) => {
    const selectedType = e.target.value;
    setFilter(selectedType);

    const filteredRooms = data.filter((room) => {
      return room.room.type.toLowerCase().includes(selectedType.toLowerCase());
    });

    setFilteredData(selectedType === "all" ? data : filteredRooms);
  };

  useEffect(() => {
    setFilteredData(data);
  }, [data]);

  const clearFilter = () => {
    setFilter("all");
    setFilteredData(data);
  };

  const roomTypes = ["all", ...new Set(data.map((room) => room.room.type))];

  return (
    <div className="input-group mb-3">
      <span className="input-group-text" id="room-type-filter">
        Filter rooms by type
      </span>
      <select
        className="form-select"
        aria-label="room type filter"
        value={filter}
        onChange={handleSelectChange}
      >
        <option value="">Select a room type to filter...</option>
        {roomTypes.map((type, index) => (
          <option key={index} value={type}>
            {type}
          </option>
        ))}
      </select>
      <button className="btn btn-hotel" type="button" onClick={clearFilter}>
        Clear Filter
      </button>
    </div>
  );
};

export default RoomFilter;
