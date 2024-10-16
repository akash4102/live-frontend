import React, { useState, useEffect } from "react";
import "./index.css";
import { addRoom, updateRoomById } from "../../services/hotelService";

const RoomForm = ({ hotelId, room, formMode, setHotels }) => {
  const [formData, setFormData] = useState({
    type: "",
    description: "",
    pricePerNight: "",
    status: "available",
    features: [],
    images: [],
  });

  useEffect(() => {
    if (formMode === "edit" && room) {
      setFormData({
        type: room.type || "",
        description: room.description || "",
        pricePerNight: room.pricePerNight || "",
        status: room.status || "available",
        features: room.features || [],
        images: room.images || [],
      });
    } else {
      setFormData({
        type: "",
        description: "",
        pricePerNight: "",
        status: "available",
        features: [],
        images: [],
      });
    }
  }, [room, formMode]);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      if (formMode === "add") {
        const response = await addRoom(hotelId, formData);
        setHotels((prevHotels) => {
          return prevHotels.map((hotel) =>
            hotel._id === hotelId
              ? { ...hotel, rooms: [...hotel.rooms, response.data.room] }
              : hotel
          );
        });
        alert("Room added successfully.");
      } else if (formMode === "edit") {
        const response = await updateRoomById(room._id, formData);
        setHotels((prevHotels) => {
          return prevHotels.map((hotel) => {
            if (hotel._id === hotelId) {
              hotel.rooms = hotel.rooms.map((r) =>
                r._id === room._id ? response.data.room : r
              );
            }
            return hotel;
          });
        });
        alert("Room updated successfully.");
      }
    } catch (error) {
      console.error("Error submitting room form:", error);
      alert("Failed to submit the form.");
    }
  };

  const handleInputChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  return (
    <form onSubmit={handleSubmit} className="room-form">
      <h3>{formMode === "add" ? "Add Room" : "Edit Room"}</h3>
      <label>
        Type:
        <input
          type="text"
          name="type"
          value={formData.type}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Description:
        <textarea
          name="description"
          value={formData.description}
          onChange={handleInputChange}
        />
      </label>
      <label>
        Price per Night:
        <input
          type="number"
          name="pricePerNight"
          value={formData.pricePerNight}
          onChange={handleInputChange}
          required
        />
      </label>
      <label>
        Status:
        <select
          name="status"
          value={formData.status}
          onChange={handleInputChange}
        >
          <option value="available">Available</option>
          <option value="unavailable">Unavailable</option>
        </select>
      </label>
      <button type="submit">Submit</button>
    </form>
  );
};

export default RoomForm;
