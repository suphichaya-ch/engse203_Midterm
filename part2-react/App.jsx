import React from 'react';
import { Routes, Route } from 'react-router-dom';
import HomePage from './pages/HomePage';
import DrinkDetailPage from './pages/DrinkDetailPage';
import FavoritesPage from './pages/FavoritesPage';
import Navbar from './components/Navbar';

function App() {
  return (
    <>
      <Navbar />
      <main className="container">
        <Routes>
          <Route path="/" element={<HomePage />} />
          <Route path="/drink/:drinkId" element={<DrinkDetailPage />} />
          <Route path="/favorites" element={<FavoritesPage />} />
          <Route path="/random" element={<DrinkDetailPage isRandom={true} />} />
        </Routes>
      </main>
    </>
  );
}
export default App;