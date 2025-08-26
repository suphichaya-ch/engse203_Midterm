import React, { useState, useEffect } from 'react'
import SearchBar from '../components/SearchBar'
import MealCard from '../components/MealCard'

function HomePage() {
  // State variables (คัดลอกจาก V1)
  const [meals, setMeals] = useState([])
  const [searchTerm, setSearchTerm] = useState('')
  const [isLoading, setIsLoading] = useState(false)
  const [error, setError] = useState(null)

  // useEffect สำหรับ fetch ข้อมูล (คัดลอกจาก V1)
  useEffect(() => {
    if (searchTerm.trim() === '') {
      setMeals([])
      return
    }

    const fetchMeals = async () => {
      setIsLoading(true)
      setError(null)

      try {
        console.log('ค้นหาคำว่า:', searchTerm)
        
        const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${searchTerm}`)
        const data = await response.json()

        console.log('ผลการค้นหา:', data)

        if (data.meals) {
          setMeals(data.meals)
        } else {
          setMeals([])
        }
      } catch (err) {
        console.error('เกิดข้อผิดพลาดในการค้นหา:', err)
        setError('เกิดข้อผิดพลาดในการค้นหา กรุณาลองใหม่อีกครั้ง')
        setMeals([])
      } finally {
        setIsLoading(false)
      }
    }

    fetchMeals()
  }, [searchTerm])

  // Handler function
  const handleSearch = (term) => {
    console.log('รับคำค้นหา:', term)
    setSearchTerm(term)
  }

  return (
    <>
      <header>
        <h1>🍳 Recipe Finder (React V2)</h1>
        <SearchBar onSearch={handleSearch} />
      </header>
      
      <main>
        <div className="results-grid">
          {/* Loading State */}
          {isLoading && (
            <p className="status-message">กำลังค้นหาอาหาร...</p>
          )}

          {/* Error State */}
          {error && (
            <p className="status-message" style={{color: 'red'}}>{error}</p>
          )}

          {/* No Results */}
          {!isLoading && !error && meals.length === 0 && searchTerm && (
            <p className="status-message">ไม่พบอาหารที่ตรงกับคำค้นหา</p>
          )}

          {/* Welcome Message */}
          {!isLoading && !error && meals.length === 0 && !searchTerm && (
            <p className="placeholder">พิมพ์ชื่ออาหารในช่องค้นหาเพื่อเริ่มต้น!</p>
          )}

          {/* Meal Cards */}
          {!isLoading && !error && meals.length > 0 && (
            meals.map(meal => (
              <MealCard key={meal.idMeal} meal={meal} />
            ))
          )}
        </div>
      </main>
    </>
  )
}

export default HomePage