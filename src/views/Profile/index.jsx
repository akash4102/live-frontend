import React, { useState } from "react";
import "./index.css";
import EditProfileModal from "./EditProfileModal";
import ChangePasswordModal from "./ChangePasswordModal";
import { useAuthContext } from "../../Context/AuthContext";
import NavBar from "../../Component/Navbar";
import Footer from "../../Component/Footer";

const Profile = () => {
  const { user } = useAuthContext();
  const { name, email, phone, role, status } = user;

  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [isChangePasswordOpen, setIsChangePasswordOpen] = useState(false);

  const handleEditProfile = () => {
    setIsEditProfileOpen(true);
  };

  const handleChangePassword = () => {
    setIsChangePasswordOpen(true);
  };

  return (
    <>
      <NavBar />
      <div className="profile-container">
        <h2 className="profile-heading">Profile</h2>
        <div className="profile-details">
          <div className="profile-row">
            <span className="label">Name:</span>
            <span className="value">{name}</span>
          </div>
          <div className="profile-row">
            <span className="label">Email:</span>
            <span className="value">{email}</span>
          </div>
          <div className="profile-row">
            <span className="label">Phone:</span>
            <span className="value">{phone}</span>
          </div>
          <div className="profile-row">
            <span className="label">Role:</span>
            <span className="value">{role}</span>
          </div>
          <div className="profile-row">
            <span className="label">Status:</span>
            <span className="value">{status}</span>
          </div>
        </div>

        <div className="profile-actions">
          <button className="btn-edit" onClick={handleEditProfile}>
            Edit Profile
          </button>
          <button className="btn-password" onClick={handleChangePassword}>
            Change Password
          </button>
        </div>

        {isEditProfileOpen && (
          <EditProfileModal
            onClose={() => setIsEditProfileOpen(false)}
            user={user}
          />
        )}
        {isChangePasswordOpen && (
          <ChangePasswordModal onClose={() => setIsChangePasswordOpen(false)} />
        )}
      </div>
      <Footer />
    </>
  );
};

export default Profile;
