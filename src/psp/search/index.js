import React, { useState, useEffect } from 'react';
import * as client from "../client";

function Search({ databaseApi }) {
  const [searchTerm, setSearchTerm] = useState('');
  const [items, setItems] = useState([]);
  const [searchResults, setSearchResults] = useState([]);

  // Fetch items from the database on component mount
  useEffect(() => {
    const fetchItems = async () => {
      try {
        // Replace `databaseApi` with your actual API call
        const response = await fetch(databaseApi);
        const data = await response.json();
        setItems(data);
      } catch (error) {
        console.error("Error fetching data: ", error);
      }
    };

    fetchItems();
  }, [databaseApi]);

  const handleSearchChange = (event) => {
    setSearchTerm(event.target.value);
  };

  useEffect(() => {
    if (searchTerm !== '') {
      // Perform search here
      const results = items.filter(item =>
        item.itemName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.description.toLowerCase().includes(searchTerm.toLowerCase())
      );
      setSearchResults(results);
    } else {
      setSearchResults([]);
    }
  }, [searchTerm, items]);
  return (
    <div>
      <input
        type="text"
        placeholder="Search"
        value={searchTerm}
        onChange={handleSearchChange}
      />
      {searchResults.map(item => (
        <div key={item.id}>
          <h3>{item.itemName}</h3>
          <p>{item.description}</p >
        </div>
      ))}
    </div>
  );
}
export default Search;