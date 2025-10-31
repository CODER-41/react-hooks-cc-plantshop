import React from "react";

function Search({ searchTerm, onSearchChange }) {
  // Core Deliverable: I can search for plants by their name.
  const handleSearch = (e) => {
    onSearchChange(e.target.value);
  };

  return (
    <div className="searchbar">
      <label htmlFor="search">Search Plants:</label>
      <input
        type="text"
        id="search"
        placeholder="Type a name to search..."
        value={searchTerm}
        onChange={handleSearch}
      />
    </div>
  );
}

export default Search;