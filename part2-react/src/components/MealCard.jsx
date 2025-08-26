import React from 'react'
import { Link } from 'react-router-dom'

function MealCard({ meal }) {
  return (
    <Link 
      to={`/meal/${meal.idMeal}`}
      style={{ 
        textDecoration: 'none', 
        color: 'inherit',
        display: 'block' 
      }}
    >
      <div className="meal-card">
        <img src={meal.strMealThumb} alt={meal.strMeal} />
        <h3>{meal.strMeal}</h3>
      </div>
    </Link>
  )
}

export default MealCard