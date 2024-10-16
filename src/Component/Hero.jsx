import React from "react";
import "./index.css";

const Hero = () => {
  const scrollToSearch = () => {
    const searchSection = document.getElementById("search");
    if (searchSection) {
      searchSection.scrollIntoView({ behavior: "smooth" });
    }
  };
  return (
    <section className="hero">
      <div className="hero-content">
        <h1>Welcome to Livo Booking</h1>
        <p>Find the best hotels at affordable prices.</p>
        <button className="hero-btn" onClick={scrollToSearch}>
          Get Started
        </button>
      </div>
    </section>
  );
};

export default Hero;
