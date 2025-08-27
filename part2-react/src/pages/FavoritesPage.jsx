import React, { useState, useEffect } from 'react';
import { useFavorites } from '../hooks/useFavorites';
import DrinkCard from '../components/DrinkCard';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function FavoritesPage() {
  const { favorites } = useFavorites();
  const [favoriteDrinks, setFavoriteDrinks] = useState([]);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    if (favorites.length === 0) {
      setIsLoading(false);
      setFavoriteDrinks([]);
      return;
    }

    const fetchFavorites = async () => {
      setIsLoading(true);
      setError(null);
      try {
        const promises = favorites.map(id =>
          fetch(`${API_BASE_URL}/lookup.php?i=${id}`).then(res => {
            if (!res.ok) throw new Error('Failed to fetch a favorite drink.');
            return res.json();
          })
        );
        const results = await Promise.all(promises);
        const drinks = results.map(result => result.drinks[0]);
        setFavoriteDrinks(drinks);
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };

    fetchFavorites();
  }, [favorites]);

  return (
    <div>
      <h2>⭐ My Favorite Drinks</h2>
      <div className="results-grid">
        {isLoading && <p className="status-message">Loading favorites...</p>}
        {error && <p className="status-message error">{error}</p>}
        {!isLoading && !error && favoriteDrinks.length > 0 && (
          favoriteDrinks.map(drink => <DrinkCard key={drink.idDrink} drink={drink} />)
        )}
        {!isLoading && !error && favoriteDrinks.length === 0 && (
          <p className="status-message">You have no favorite drinks yet. Go find some!</p>
        )}
      </div>
    </div>
  );
}
export default FavoritesPage;