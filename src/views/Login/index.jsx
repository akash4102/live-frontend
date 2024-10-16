import React, { useContext, useState } from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import "./index.css";
import InputField from "../../CoreComponent/InputField";
import Button from "../../CoreComponent/Button";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import { useNavigate, useLocation } from "react-router-dom";
import { useAuthContext } from "../../Context/AuthContext";
import { loginUser } from "../../services/authService";
import { showToast } from "../../utils/toast";
import Joi from "joi";

const userLoginSchema = Joi.object({
  email: Joi.string()
    .email({ tlds: { allow: false } })
    .required()
    .trim()
    .lowercase(),
  password: Joi.string()
    .min(8)
    .required()
    .regex(/^(?=.*[A-Z])(?=.*\d)[A-Za-z\d@$!%*?&]{8,}$/),
});

const Login = () => {
  const { setUser, setRole, setLoggedIn } = useAuthContext();
  const navigate = useNavigate();
  const [formData, setFormData] = useState({
    email: "",
    password: "",
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
    const { error } = userLoginSchema.validate(formData, { abortEarly: false });
    if (error) {
      const errorMessages = {};
      error.details.forEach((detail) => {
        errorMessages[detail.path[0]] = detail.message;
      });
      setErrors(errorMessages);
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
      const response = await loginUser(formData);
      if (response.success) {
        alert(response.message);
        localStorage.setItem("token", response.token);
        localStorage.setItem("role", response.data.user.role);
        localStorage.setItem("user", JSON.stringify(response.data.user));
        setUser(response.data.user);
        setRole(response.data.user.role);
        setLoggedIn(true);
        if (response.data.user.role === "admin") {
          navigate("/admin/dashboard");
        } else if (fullRedirectUrl) {
          navigate(fullRedirectUrl);
        } else {
          navigate("/");
        }
      } else {
        setFormData({
          email: "",
          password: "",
        });
        showToast(response.error.message, "warning");
      }
    } catch (error) {
      setFormData({
        email: "",
        password: "",
      });
      showToast(error.response.data.error.message, "error");
    }
  };

  return (
    <>
      <Navbar />
      <div className="login-page">
        <div className="container login-container">
          <div className="login-card shadow">
            <h2 className="text-center mb-4">Welcome Back</h2>
            <form onSubmit={handleSubmit}>
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
                  label="Login"
                  variant="primary"
                  fullWidth
                />
              </div>
              <div className="text-center mt-3">
                <a href="/Register" className="forgot-password-link">
                  Register?
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

export default Login;
