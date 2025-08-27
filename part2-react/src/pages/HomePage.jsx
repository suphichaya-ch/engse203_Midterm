import React, { useState, useEffect } from 'react';
import SearchBar from '../components/SearchBar';
import DrinkCard from '../components/DrinkCard';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function HomePage() {
  const [drinks, setDrinks] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (!searchTerm) {
      setDrinks([]);
      return;
    }

    const fetchDrinks = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const response = await fetch(`${API_BASE_URL}/search.php?s=${searchTerm}`);
        if (!response.ok) throw new Error('Something went wrong!');
        const data = await response.json();
        setDrinks(data.drinks || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDrinks();
  }, [searchTerm]);

  return (
    <div>
      <header>
        <h1>Find Your Perfect Cocktail</h1>
        <SearchBar onSearch={setSearchTerm} />
      </header>
      <div className="results-grid">
        {isLoading && <p className="status-message">Searching for cocktails...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!isLoading && !error && drinks.length === 0 && searchTerm && (
          <p className="status-message">No cocktails found for "{searchTerm}".</p>
        )}
        {!isLoading && !error && drinks.length > 0 && (
          drinks.map(drink => <DrinkCard key={drink.idDrink} drink={drink} />)
        )}
      </div>
    </div>
  );
}
export default HomePage;