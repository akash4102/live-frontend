import React, { useState } from "react";
import SearchBox from "../../Component/SearchBox";
import Card from "../../Component/Card";
import { useHotelContext } from "../../Context/HotelContext";
import { fetchHotelsByCity } from "../../services/hotelService";

const AllHotels = () => {
  const [searchOn, setSearchOn] = useState(false);
  const [filteredHotels, setFilteredHotels] = useState([]);
  const [loading, setLoading] = useState(false);
  const { hotels } = useHotelContext();

  const getTopHotels = (hotels) => {
    return hotels
      .sort((a, b) => b.overall_rating - a.overall_rating)
      .slice(0, 6);
  };

  const topHotels = getTopHotels(hotels);

  const handleSearch = async (query) => {
    if (!query.trim()) {
      setSearchOn(false);
      return;
    }

    try {
      setLoading(true);
      const response = await fetchHotelsByCity(query);
      const data = response.data;
      if (Array.isArray(data) && data.length > 0) {
        setFilteredHotels(data);
      } else {
        setFilteredHotels([]);
      }
      setSearchOn(true);
      setLoading(false);
    } catch (error) {
      setFilteredHotels([]);
      setLoading(false);
    }
  };

  const hotelsToDisplay = searchOn ? filteredHotels : topHotels;

  return (
    <div className="home-container">
      <div className="home-content" id="search">
        <SearchBox onSearch={handleSearch} />

        {loading && <div>Loading hotels...</div>}

        <div className="hotel-list hotel-grid">
          {hotelsToDisplay.length > 0
            ? hotelsToDisplay.map((hotel) => (
                <Card key={hotel._id} hotel={hotel} />
              ))
            : !loading && <p>No hotels found.</p>}
        </div>
      </div>
    </div>
  );
};

export default AllHotels;
