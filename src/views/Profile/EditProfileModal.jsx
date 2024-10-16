import React, { useState } from "react";
import { updateUserProfile } from "../../services/authService";
import { showToast } from "../../utils/toast";

const EditProfileModal = ({ user, onClose }) => {
  const [formData, setFormData] = useState({
    name: user.name,
    email: user.email,
    phone: user.phone,
  });

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prevState) => ({
      ...prevState,
      [name]: value,
    }));
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    console.log("Updated Profile Data: ", formData);
    const response = await updateUserProfile(formData);
    console.log("resposne ", response);
    if (response.success) {
      showToast(response.message, "success");
    } else {
      showToast(response.error.message, "error");
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Edit Profile</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Name</label>
            <input
              type="text"
              name="name"
              value={formData.name}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Email</label>
            <input
              type="email"
              name="email"
              value={formData.email}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>Phone</label>
            <input
              type="text"
              name="phone"
              value={formData.phone}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-save">
            Save Changes
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default EditProfileModal;
