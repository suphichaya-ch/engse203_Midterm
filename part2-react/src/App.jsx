import React from 'react'
import { Routes, Route } from 'react-router-dom'
import HomePage from './pages/HomePage'
import MealDetailPage from './pages/MealDetailPage'

function App() {
  return (
    <div className="container">
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/meal/:mealId" element={<MealDetailPage />} />
      </Routes>
    </div>
  )
}

export default App