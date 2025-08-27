import { useState, useEffect } from 'react';

const FAVORITES_KEY = 'cocktailFavoritesReact';

export function useFavorites() {
  const [favorites, setFavorites] = useState(() => {
    return JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
  });

  useEffect(() => {
    localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));
  }, [favorites]);

  const toggleFavorite = (drinkId) => {
    setFavorites((prevFavorites) => {
      if (prevFavorites.includes(drinkId)) {
        return prevFavorites.filter((id) => id !== drinkId);
      } else {
        return [...prevFavorites, drinkId];
      }
    });
  };

  return { favorites, toggleFavorite };
}