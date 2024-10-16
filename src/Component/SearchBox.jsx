import React, { useState } from "react";
import "./index.css";

const SearchBox = ({ onSearch, setSearchOn }) => {
  const [query, setQuery] = useState("");

  const handleInputChange = (e) => {
    setQuery(e.target.value);
    if (e.target.value.trim() == "") {
      setSearchOn(false);
    }
  };
  const handleSearchSubmit = (e) => {
    e.preventDefault();
    onSearch(query);
  };
  return (
    <form className="search-box" onSubmit={handleSearchSubmit}>
      <input
        type="text"
        className="search-input"
        placeholder="Search hotels..."
        value={query}
        onChange={handleInputChange}
      />
      <button type="submit" className="search-btn">
        Search
      </button>
    </form>
  );
};

export default SearchBox;
