import React from "react";
import Navbar from "../../Component/Navbar";
import Footer from "../../Component/Footer";
import "./index.css";
import RoomCarousel from "../../Component/RoomCarousel";
import HotelService from "../../Component/HotelService";
import { useHotelContext } from "../../Context/HotelContext";
import Header from "../../Component/Header";
import AllHotels from "../AllHotel";

const Home = () => {
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-content" id="search">
        <Header title={"Book"} />
        <hr />
        <AllHotels />
        <Header title={"Our Top Rooms"} />
        <hr />
        <RoomCarousel />
        <HotelService />
      </div>
      <Footer />
    </div>
  );
};

export default Home;
