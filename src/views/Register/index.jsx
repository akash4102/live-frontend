import React, { useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import InputField from "../../CoreComponent/InputField";
import Button from "../../CoreComponent/Button";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import { useLocation, useNavigate } from "react-router-dom";
import { registerUser } from "../../services/authService";
import { showToast } from "../../utils/toast";
import Joi from "joi";

const userRegisterSchema = Joi.object({
  name: Joi.string().min(1).max(50).required().trim(),
  email: Joi.string()
    .email({ tlds: { allow: false } }) 
    .required()
    .trim()
    .lowercase(),
  phone: Joi.string()
    .pattern(/^[0-9]{10}$/)
    .required()
    .messages({ "string.pattern.base": "Phone number must be 10 digits long" }),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/)
    .messages({
      "string.pattern.base":
        "Password must contain at least one uppercase letter and one number",
    }),
  role: Joi.string().optional().default("user"),
});

const Register = () => {
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    name: "",
    email: "",
    phone: "",
    password: "",
    role: "user",
  });

  const [errors, setErrors] = useState({});

  const location = useLocation();
  const searchParams = new URLSearchParams(location.search);
  const redirectUrl = searchParams.get("redirect");
  const fullRedirectUrl = redirectUrl
    ? `${redirectUrl}${location.search.replace(`?redirect=${redirectUrl}`, "")}`
    : null;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value,
    });
  };

  const validateForm = () => {
    const { error } = userRegisterSchema.validate(formData, {
      abortEarly: false,
    });
    if (error) {
      const validationErrors = {};
      error.details.forEach((detail) => {
        validationErrors[detail.path[0]] = detail.message;
      });
      setErrors(validationErrors);
      return false;
    }
    setErrors({});
    return true;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isValid = validateForm();
    if (!isValid) return;

    try {
      const response = await registerUser(formData);
      if (response.success) {
        showToast(response.message, "success");
        if (fullRedirectUrl) {
          navigate(`/login?redirect=${encodeURIComponent(fullRedirectUrl)}`);
        } else {
          navigate("/login");
        }
      } else {
        setFormData({
          name: "",
          email: "",
          phone: "",
          password: "",
          role: "user",
        });
        showToast(response.error.message, "warning");
      }
    } catch (error) {
      setFormData({
        name: "",
        email: "",
        phone: "",
        password: "",
        role: "user",
      });
      showToast(error.response.data.error.message, "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="register-page">
        <div className="container register-container">
          <div className="register-card shadow">
            <h2 className="text-center mb-4">Create Your Account</h2>
            <form onSubmit={handleSubmit}>
              <InputField
                label="Name"
                type="text"
                name="name"
                value={formData.name}
                onChange={handleChange}
                placeholder="Enter your name"
                required
              />
              {errors.name && <div className="text-danger">{errors.name}</div>}{" "}
              <InputField
                label="Email"
                type="email"
                name="email"
                value={formData.email}
                onChange={handleChange}
                placeholder="Enter your email"
                required
              />
              {errors.email && (
                <div className="text-danger">{errors.email}</div>
              )}{" "}
              <InputField
                label="Phone"
                type="text"
                name="phone"
                value={formData.phone}
                onChange={handleChange}
                placeholder="Enter your phone number"
                required
              />
              {errors.phone && (
                <div className="text-danger">{errors.phone}</div>
              )}{" "}
              <InputField
                label="Password"
                type="password"
                name="password"
                value={formData.password}
                onChange={handleChange}
                placeholder="Enter your password"
                required
              />
              {errors.password && (
                <div className="text-danger">{errors.password}</div>
              )}{" "}
              <div className="text-center">
                <Button
                  type="submit"
                  label="Register"
                  variant="primary"
                  fullWidth
                />
              </div>
              <div className="text-center mt-3">
                <a href="/login" className="forgot-password-link">
                  Login?
                </a>
              </div>
            </form>
          </div>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default Register;
