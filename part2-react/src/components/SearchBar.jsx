import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term);
    }
  };

  return (
    <form onSubmit={handleSubmit} className="search-bar">
      <input 
        type="text" 
        placeholder="Search for a meal..." 
        value={term} 
        onChange={(e) => setTerm(e.target.value)} 
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
