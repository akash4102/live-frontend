import React, { useState } from "react";
import { changePassword } from "../../../services/authService";
import { showToast } from "../../../utils/toast";

const ChangePasswordModal = ({ onClose }) => {
  const [formData, setFormData] = useState({
    currentPassword: "",
    newPassword: "",
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
    const response = await changePassword(formData);
    console.log(response);
    if (response.success) {
      showToast(response.message, "success");
    } else {
      showToast(response.message, "error");
    }
    onClose();
  };

  return (
    <div className="modal">
      <div className="modal-content">
        <h2>Change Password</h2>
        <form onSubmit={handleSubmit}>
          <div className="form-group">
            <label>Current Password</label>
            <input
              type="password"
              name="currentPassword"
              value={formData.currentPassword}
              onChange={handleChange}
              required
            />
          </div>
          <div className="form-group">
            <label>New Password</label>
            <input
              type="password"
              name="newPassword"
              value={formData.newPassword}
              onChange={handleChange}
              required
            />
          </div>
          <button type="submit" className="btn-save">
            Change Password
          </button>
          <button type="button" className="btn-cancel" onClick={onClose}>
            Cancel
          </button>
        </form>
      </div>
    </div>
  );
};

export default ChangePasswordModal;
