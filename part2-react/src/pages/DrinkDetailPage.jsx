import React, { useState, useEffect } from 'react';
import { useParams, useNavigate } from 'react-router-dom';

const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1';

function DrinkDetailPage({ isRandom = false }) {
  const { drinkId } = useParams();
  const navigate = useNavigate();
  const [drink, setDrink] = useState(null);
  const [isLoading, setIsLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDrinkData = async () => {
      setIsLoading(true);
      setError(null);
      const url = isRandom
        ? `${API_BASE_URL}/random.php`
        : `${API_BASE_URL}/lookup.php?i=${drinkId}`;
      
      try {
        const response = await fetch(url);
        if (!response.ok) throw new Error('Network response was not ok');
        const data = await response.json();
        const fetchedDrink = data.drinks ? data.drinks[0] : null;
        
        if (!fetchedDrink) throw new Error('Drink not found!');

        if (isRandom) {
          navigate(`/drink/${fetchedDrink.idDrink}`, { replace: true });
        } else {
          setDrink(fetchedDrink);
        }
      } catch (err) {
        setError(err.message);
      } finally {
        setIsLoading(false);
      }
    };
    
    fetchDrinkData();
  }, [drinkId, isRandom, navigate]);

  if (isLoading) return <p className="status-message">Loading...</p>;
  if (error) return <p className="status-message error">{error}</p>;
  if (!drink) return <p className="status-message">Drink not found.</p>;
  
  const ingredients = [];
  for (let i = 1; i <= 15; i++) {
    if (drink[`strIngredient${i}`]) {
      ingredients.push(
        <li key={i}>{drink[`strMeasure${i}`] || ''} {drink[`strIngredient${i}`]}</li>
      );
    }
  }

  return (
    <div id="details-container">
      <div className="details-header">
        <img src={drink.strDrinkThumb} alt={drink.strDrink} />
        <div>
          <h2>{drink.strDrink}</h2>
          <p><strong>Category:</strong> {drink.strCategory}</p>
          <p><strong>Glass:</strong> {drink.strGlass}</p>
          <h3>Ingredients</h3>
          <ul className="ingredients-list">{ingredients}</ul>
        </div>
      </div>
      <h3>Instructions</h3>
      <p className="instructions">{drink.strInstructions}</p>
    </div>
  );
}
export default DrinkDetailPage;