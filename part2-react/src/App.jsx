import React, { useState, useEffect } from 'react';
import SearchBar from './components/SearchBar';
import MealCard from './components/MealCard';
import './index.css';

function App() {
  const [meals, setMeals] = useState([]);
  const [searchTerm, setSearchTerm] = useState('');
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    if (!searchTerm) return;

    const fetchMeals = async () => {
      setIsLoading(true);
      setError('');
      try {
        const res = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`);
        const data = await res.json();
        if (data.meals) {
          setMeals(data.meals);
        } else {
          setMeals([]);
        }
      } catch (err) {
        setError('Failed to fetch meals');
      } finally {
        setIsLoading(false);
      }
    };

    fetchMeals();
  }, [searchTerm]);

  const handleSearch = (term) => {
    setSearchTerm(term);
  };

  return (
    <div className="container">
      <header>
        <h1>🍳 Recipe Finder (React)</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      <main>
        <div className="results-grid">
          {isLoading && <p>Loading...</p>}
          {error && <p className="error">{error}</p>}
          {!isLoading && !error && meals.length > 0 && (
            meals.map((meal) => <MealCard key={meal.idMeal} meal={meal} />)
          )}
          {!isLoading && !error && meals.length === 0 && searchTerm && (
            <p>No recipes found.</p>
          )}
        </div>
      </main>
    </div>
  );
}

export default App;
