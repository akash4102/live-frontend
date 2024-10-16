import React from "react";
import "bootstrap/dist/css/bootstrap.min.css";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import "./index.css";

const About = () => {
  return (
    <>
      <Navbar />
      <div className="about-container">
        <h2 className="text-center mb-4">About Us</h2>
        <div className="about-content">
          <p>
            Welcome to Hotel Booking, your go-to platform for finding the best
            hotels at affordable prices. We are committed to providing a
            seamless experience for users, whether you're booking a luxury stay
            or a budget-friendly option.
          </p>
          <p>
            Our platform offers a wide selection of hotels across various
            destinations, ensuring that you have plenty of options to choose
            from. With an easy-to-use interface and reliable customer support,
            we aim to make your hotel booking experience as smooth as possible.
          </p>
          <p>
            Founded in 2024, Hotel Booking has quickly grown into a trusted
            service for travelers across the globe. Our mission is to connect
            people with the best hotels for their needs and budget.
          </p>
          <p>We look forward to helping you find your next stay!</p>
        </div>
      </div>
      <Footer />
    </>
  );
};

export default About;
