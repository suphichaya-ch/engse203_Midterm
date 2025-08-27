import React from 'react';
import { Link } from 'react-router-dom';
import { useFavorites } from '../hooks/useFavorites';

function DrinkCard({ drink }) {
  const { favorites, toggleFavorite } = useFavorites();
  const isFavorite = favorites.includes(drink.idDrink);

  const handleFavoriteClick = (e) => {
    e.preventDefault();
    e.stopPropagation();
    toggleFavorite(drink.idDrink);
  };

  return (
    <Link to={`/drink/${drink.idDrink}`} className="drink-card-link">
      <div className="drink-card">
        <button onClick={handleFavoriteClick} className={`favorite-btn ${isFavorite ? 'is-favorite' : ''}`} data-drink-id={drink.idDrink}>⭐</button>
        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        <h3>{drink.strDrink}</h3>
      </div>
    </Link>
  );
}
export default DrinkCard;