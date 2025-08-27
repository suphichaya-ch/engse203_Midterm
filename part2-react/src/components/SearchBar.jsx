import React, { useState } from 'react';

function SearchBar({ onSearch }) {
  const [term, setTerm] = useState('');

  const handleSubmit = (e) => {
    e.preventDefault();
    if (term.trim()) {
      onSearch(term.trim());
    }
  };

  return (
    <form id="search-form" onSubmit={handleSubmit}>
      <input
        type="text"
        id="search-input"
        value={term}
        onChange={(e) => setTerm(e.target.value)}
        placeholder="..."
      />
      <button type="submit">Search</button>
    </form>
  );
}

export default SearchBar;
