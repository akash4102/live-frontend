import React, { useState } from "react";
import {
  Form,
  Button,
  Table,
  Modal,
  DropdownButton,
  Dropdown,
  InputGroup,
} from "react-bootstrap";
import { useNavigate, useParams } from "react-router-dom";
import { useHotelContext } from "../../Context/HotelContext";
import {
  updateRoomById,
  deleteRoomById,
  addRoom,
} from "../../services/hotelService";
import { showToast } from "../../utils/toast";
import { toast } from "react-toastify";

const RoomManagement = () => {
  const navigate = useNavigate();
  const { hotelId } = useParams();
  const { rooms, fetchHotels, setRooms } = useHotelContext();
  const [showModal, setShowModal] = useState(false);
  const [roomDetails, setRoomDetails] = useState({
    _id: null,
    type: "",
    description: "",
    pricePerNight: 0,
    status: "",
    features: [],
    images: [],
    totalRooms: 0,
  });
  const [customRoomType, setCustomRoomType] = useState("");
  const [roomTypes, setRoomTypes] = useState([
    "single",
    "double",
    "suite",
    "deluxe",
  ]);

  const statusOptions = ["available", "booked", "maintenance"];

  const handleEditClick = (room) => {
    setRoomDetails(room.room);
    setShowModal(true);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setRoomDetails({
      ...roomDetails,
      [name]: value,
    });
  };

  const handleRoomTypeChange = (selectedType) => {
    setRoomDetails({
      ...roomDetails,
      type: selectedType,
    });
  };

  const handleStatusChange = (selectedStatus) => {
    setRoomDetails({
      ...roomDetails,
      status: selectedStatus,
    });
  };

  const [imageFiles, setImageFiles] = useState([]);

  const handleImageChange = (e) => {
    setImageFiles([...e.target.files]);
  };

  const handleCustomRoomTypeChange = (e) => {
    setCustomRoomType(e.target.value);
  };

  const addCustomRoomType = () => {
    if (customRoomType.trim() !== "") {
      setRoomTypes([...roomTypes, customRoomType]);
      setRoomDetails({
        ...roomDetails,
        type: customRoomType,
      });
      setCustomRoomType("");
    }
  };

  const handleSubmit = async () => {
    const formData = new FormData();

    const filteredFeatures = roomDetails.features.filter(
      (feature) => feature.trim() !== ""
    );
    const filteredImages = roomDetails.images.filter(
      (image) => image.trim() !== ""
    );

    formData.append("description", roomDetails.description);
    formData.append("features", JSON.stringify(filteredFeatures));
    formData.append("pricePerNight", roomDetails.pricePerNight);
    formData.append("status", roomDetails.status);
    formData.append("type", roomDetails.type);
    formData.append("hotel", hotelId);
    formData.append("totalRooms", roomDetails.totalRooms);
    formData.append("images", JSON.stringify(filteredImages));

    imageFiles.forEach((file) => formData.append("images", file));

    if (roomDetails._id) {
      await toast.promise(
        updateRoomById(roomDetails._id, formData),
        {
          pending: "Updating Room details...",
          success: "Room details updated successfully!",
          error: "Failed to update Room details!",
        },
        {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    } else {
      await toast.promise(
        addRoom(hotelId, formData),
        {
          pending: "Adding Room",
          success: "Room details Added successfully!",
          error: "Failed to Add Room details!",
        },
        {
          autoClose: 3000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
        }
      );
    }
    setRooms([]);
    fetchHotels();
    setShowModal(false);
  };

  const handleDeleteRoom = async (roomId) => {
    const response = await deleteRoomById(roomId);
    if (response.success) {
      showToast(response.message, "success");
    } else {
      showToast("error while deleting room", "error");
    }
  };

  const handleAddNewRoom = () => {
    setRoomDetails({
      _id: null,
      type: "",
      description: "",
      pricePerNight: 0,
      status: "",
      features: [],
      images: [],
      totalRooms: 0,
    });
    setShowModal(true);
  };

  const handleAddFeature = () => {
    setRoomDetails({
      ...roomDetails,
      features: [...roomDetails.features, ""],
    });
  };

  const handleAddImage = () => {
    setRoomDetails({
      ...roomDetails,
      images: [...roomDetails.images, ""],
    });
  };

  const handleRemoveFeature = (index) => {
    const newFeatures = [...roomDetails.features];
    newFeatures.splice(index, 1);
    setRoomDetails({ ...roomDetails, features: newFeatures });
  };

  const handleRemoveImage = (index) => {
    const newImages = [...roomDetails.images];
    newImages.splice(index, 1);
    setRoomDetails({ ...roomDetails, images: newImages });
  };

  const handleFeatureChange = (index, value) => {
    const newFeatures = [...roomDetails.features];
    newFeatures[index] = value;
    setRoomDetails({ ...roomDetails, features: newFeatures });
  };

  const handleBack = () => {
    navigate("/admin/hotels");
  };

  const filteredRooms = rooms.filter((room) => room?.room?.hotel === hotelId);

  return (
    <div>
      <Button variant="primary" onClick={handleBack}>
        all hotels
      </Button>
      <h2>Manage Rooms for Hotel {hotelId}</h2>
      <Button variant="primary" onClick={handleAddNewRoom}>
        Add New Room
      </Button>
      <Table striped bordered hover>
        <thead>
          <tr>
            <th>ID</th>
            <th>Type</th>
            <th>Description</th>
            <th>Price/Night</th>
            <th>Status</th>
            <th>Actions</th>
          </tr>
        </thead>
        <tbody>
          {filteredRooms.map((room) => (
            <tr key={room.room._id}>
              <td>{room.room._id}</td>
              <td>{room.room.type}</td>
              <td>{room.room.description}</td>
              <td>{room.room.pricePerNight}</td>
              <td>{room.room.status}</td>
              <td>
                <Button
                  variant="secondary"
                  onClick={() => handleEditClick(room)}
                >
                  Edit
                </Button>{" "}
                <Button
                  variant="danger"
                  onClick={() => handleDeleteRoom(room.room._id)}
                >
                  Delete
                </Button>
              </td>
            </tr>
          ))}
        </tbody>
      </Table>

      <Modal show={showModal} onHide={() => setShowModal(false)}>
        <Modal.Header closeButton>
          <Modal.Title>
            {roomDetails._id ? "Edit Room" : "Add New Room"}
          </Modal.Title>
        </Modal.Header>
        <Modal.Body>
          <Form>
            <Form.Group>
              <Form.Label>Room Type</Form.Label>
              <DropdownButton
                title={roomDetails.type || "Select Room Type"}
                onSelect={handleRoomTypeChange}
                variant="outline-secondary"
              >
                {roomTypes.map((type) => (
                  <Dropdown.Item key={type} eventKey={type}>
                    {type}
                  </Dropdown.Item>
                ))}
              </DropdownButton>

              <InputGroup className="mt-2">
                <Form.Control
                  type="text"
                  value={customRoomType}
                  onChange={handleCustomRoomTypeChange}
                  placeholder="Add custom room type"
                />
                <Button variant="outline-success" onClick={addCustomRoomType}>
                  Add Type
                </Button>
              </InputGroup>
            </Form.Group>

            <Form.Group>
              <Form.Label>Status</Form.Label>
              <DropdownButton
                title={roomDetails.status || "Select Status"}
                onSelect={handleStatusChange}
                variant="outline-secondary"
              >
                {statusOptions.map((status) => (
                  <Dropdown.Item key={status} eventKey={status}>
                    {status}
                  </Dropdown.Item>
                ))}
              </DropdownButton>
            </Form.Group>

            <Form.Group>
              <Form.Label>Description</Form.Label>
              <Form.Control
                type="text"
                name="description"
                value={roomDetails.description}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Price Per Night</Form.Label>
              <Form.Control
                type="number"
                name="pricePerNight"
                value={roomDetails.pricePerNight}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Total Rooms</Form.Label>
              <Form.Control
                type="number"
                name="totalRooms"
                value={roomDetails.totalRooms}
                onChange={handleInputChange}
              />
            </Form.Group>

            <Form.Group>
              <Form.Label>Features</Form.Label>
              {roomDetails.features.map((feature, index) => (
                <InputGroup className="mb-2" key={index}>
                  <Form.Control
                    type="text"
                    value={feature}
                    onChange={(e) => handleFeatureChange(index, e.target.value)}
                  />
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveFeature(index)}
                  >
                    Remove
                  </Button>
                </InputGroup>
              ))}
              <Button variant="outline-primary" onClick={handleAddFeature}>
                Add Feature
              </Button>
            </Form.Group>

            <Form.Group>
              <Form.Label>Images</Form.Label>
              {roomDetails.images.map((image, index) => (
                <InputGroup className="mb-2" key={index}>
                  <Form.Control type="text" value={image} readOnly />
                  <Button
                    variant="danger"
                    onClick={() => handleRemoveImage(index)}
                  >
                    Remove
                  </Button>
                </InputGroup>
              ))}
              <Form.Control
                type="file"
                name="images"
                onChange={handleImageChange}
                multiple
              />
            </Form.Group>
          </Form>
        </Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={() => setShowModal(false)}>
            Close
          </Button>
          <Button variant="primary" onClick={handleSubmit}>
            Save Changes
          </Button>
        </Modal.Footer>
      </Modal>
    </div>
  );
};

export default RoomManagement;
