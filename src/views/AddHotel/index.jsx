import React, { useState } from "react";
import { Button, Form, Container } from "react-bootstrap";
import { addNewHotel } from "../../services/hotelService";
import { showToast } from "../../utils/toast";
import { useNavigate } from "react-router-dom";
import { toast } from "react-toastify";
import { useHotelContext } from "../../Context/HotelContext";
import Sidebar from "../Dashboard/Sidebar";

const AddHotel = () => {
  const { fetchHotels } = useHotelContext();
  const navigate = useNavigate();
  const [hotelData, setHotelData] = useState({
    name: "",
    address_list: {
      city: "",
      country: "",
      state: "",
      zipcode: "",
      locality: "",
      landmark: "",
    },
    contact: { phone: "", email: "" },
    policies: {
      cancellationPolicy: "",
      checkInTime: "",
      checkOutTime: "",
      refundPolicy: "",
    },
    amenities: [],
    images: [],
    map_url: "",
  });

  const [imageFiles, setImageFiles] = useState([]);

  const handleHotelInputChange = (e) => {
    const { name, value } = e.target;
    setHotelData({ ...hotelData, [name]: value });
  };
  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleNestedInputChange = (e, field, nestedField) => {
    const { value } = e.target;
    setHotelData({
      ...hotelData,
      [field]: {
        ...hotelData[field],
        [nestedField]: value,
      },
    });
  };

  const addAmenity = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newAmenity = e.target.value.trim();
      if (newAmenity && !hotelData.amenities.includes(newAmenity)) {
        setHotelData({
          ...hotelData,
          amenities: [...hotelData.amenities, newAmenity],
        });
      }
      e.target.value = "";
    }
  };

  const removeAmenity = (index) => {
    const updatedAmenities = hotelData.amenities.filter((_, i) => i !== index);
    setHotelData({ ...hotelData, amenities: updatedAmenities });
  };

  const addImage = (e) => {
    if (e.key === "Enter") {
      e.preventDefault();
      const newImage = e.target.value.trim();
      if (newImage && !hotelData.images.includes(newImage)) {
        setHotelData({ ...hotelData, images: [...hotelData.images, newImage] });
      }
      e.target.value = "";
    }
  };

  const removeImage = (index) => {
    const updatedImages = hotelData.images.filter((_, i) => i !== index);
    setHotelData({ ...hotelData, images: updatedImages });
  };

  const handleStatusChange = (e) => {
    setHotelData({ ...hotelData, status: e.target.value });
  };

  const handleReset = () => {
    setHotelData({
      name: "",
      address_list: {
        city: "",
        country: "",
        state: "",
        zipcode: "",
        locality: "",
        landmark: "",
      },
      contact: { phone: "", email: "" },
      policies: {
        cancellationPolicy: "",
        checkInTime: "",
        checkOutTime: "",
        refundPolicy: "",
      },
      amenities: [],
      images: [],
      location: { coordinates: [], map_url: "" },
    });
    navigate("/");
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData();
    formData.append("name", hotelData.name);
    formData.append("address_list", JSON.stringify(hotelData.address_list));
    formData.append("contact", JSON.stringify(hotelData.contact));
    formData.append("policies", JSON.stringify(hotelData.policies));
    formData.append("amenities", JSON.stringify(hotelData.amenities));
    formData.append("location", JSON.stringify(hotelData.location));
    formData.append("map_url", hotelData.map_url);

    imageFiles.forEach((file) => formData.append("images", file));

    await toast.promise(
      addNewHotel(formData),
      {
        pending: "Adding hotel ",
        success: "Hotel details Added successfully!",
        error: "Failed to Add hotel!",
      },
      {
        autoClose: 3000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
      }
    );
    fetchHotels();
    navigate("/admin/hotels");
  };
  return (
    <>
      <Sidebar />
      <Container className="hotel-management-container">
        <h1>Add New Hotel {hotelData.name}</h1>
        <Form onSubmit={handleSubmit} onReset={handleReset}>
          <Form.Group controlId="hotelName">
            <Form.Label>Hotel Name</Form.Label>
            <Form.Control
              type="text"
              name="name"
              value={hotelData.name}
              onChange={handleHotelInputChange}
              required
            />
          </Form.Group>

          <h3>Address</h3>
          {["city", "country", "state", "zipcode", "locality", "landmark"].map(
            (field) => (
              <Form.Group key={field}>
                <Form.Label>
                  {field.charAt(0).toUpperCase() + field.slice(1)}
                </Form.Label>
                <Form.Control
                  type="text"
                  name={field}
                  value={hotelData.address_list[field]}
                  onChange={(e) =>
                    handleNestedInputChange(e, "address_list", field)
                  }
                />
              </Form.Group>
            )
          )}

          <h3>Contact</h3>
          <Form.Group>
            <Form.Label>Phone</Form.Label>
            <Form.Control
              type="text"
              value={hotelData.contact.phone}
              onChange={(e) => handleNestedInputChange(e, "contact", "phone")}
            />
          </Form.Group>
          <Form.Group>
            <Form.Label>Email</Form.Label>
            <Form.Control
              type="email"
              value={hotelData.contact.email}
              onChange={(e) => handleNestedInputChange(e, "contact", "email")}
            />
          </Form.Group>

          <h3>Policies</h3>
          {[
            "cancellationPolicy",
            "checkInTime",
            "checkOutTime",
            "refundPolicy",
          ].map((field) => (
            <Form.Group key={field}>
              <Form.Label>
                {field.charAt(0).toUpperCase() + field.slice(1)}
              </Form.Label>
              <Form.Control
                type="text"
                name={field}
                value={hotelData.policies[field]}
                onChange={(e) => handleNestedInputChange(e, "policies", field)}
              />
            </Form.Group>
          ))}

          <Form.Group>
            <Form.Label>Map Url</Form.Label>
            <Form.Control
              type="text"
              name="map_url"
              value={hotelData.map_url}
              onChange={(e) => handleHotelInputChange(e)}
            />
          </Form.Group>

          <Form.Group>
            <Form.Label>Amenities</Form.Label>
            <Form.Control
              type="text"
              placeholder="Add amenity"
              onKeyDown={addAmenity}
            />
            <ul>
              {hotelData.amenities.map((amenity, index) => (
                <li key={index}>
                  {amenity}
                  <Button
                    variant="danger"
                    size="sm"
                    onClick={() => removeAmenity(index)}
                  >
                    Remove
                  </Button>
                </li>
              ))}
            </ul>
          </Form.Group>
          <Form.Group controlId="hotelImages">
            <Form.Label>Hotel Images</Form.Label>
            <Form.Control
              type="file"
              multiple
              onChange={handleImageChange}
              accept="image/*"
            />
          </Form.Group>

          <Form.Group controlId="hotelStatus">
            <Form.Label>Hotel Status</Form.Label>
            <Form.Select value={hotelData.status} onChange={handleStatusChange}>
              <option value="active">Active</option>
              <option value="pending">Pending</option>
              <option value="disabled">Disabled</option>
              <option value="deleted">Deleted</option>
            </Form.Select>
          </Form.Group>

          <div className="form-actions">
            <Button variant="primary" type="submit">
              Add Hotel
            </Button>
            <Button variant="secondary" type="reset">
              Cancel
            </Button>
          </div>
        </Form>
      </Container>
    </>
  );
};

export default AddHotel;
