import React, { useState, useEffect } from 'react'
import { Link, useParams } from 'react-router-dom'

function processMealIngredients(meal) {
  const ingredients = []

  for (let i = 1; i <= 20; i++) {
    const ingredient = meal[`strIngredient${i}`]
    const measure = meal[`strMeasure${i}`]

    if (ingredient && ingredient.trim() !== '') {
      if (measure && measure.trim() !== '') {
        ingredients.push(`${measure.trim()} ${ingredient.trim()}`)
      } else {
        ingredients.push(ingredient.trim())
      }
    }
  }

  return ingredients
}

function MealDetailPage() {
  const { mealId } = useParams()
  const [meal, setMeal] = useState(null)
  const [isLoading, setIsLoading] = useState(true)
  const [error, setError] = useState(null)

  useEffect(() => {
    async function fetchMealDetails() {
      try {
        setIsLoading(true)
        const res = await fetch(
          `https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`
        )
        const data = await res.json()
        if (data.meals && data.meals.length > 0) {
          setMeal(data.meals[0])
        } else {
          setError('ไม่พบข้อมูลอาหาร')
        }
      } catch (err) {
        setError('เกิดข้อผิดพลาดในการโหลดข้อมูล')
      } finally {
        setIsLoading(false)
      }
    }

    fetchMealDetails()
  }, [mealId])

  // 🔄 Loading state
  if (isLoading) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'block', marginBottom: '2rem' }}>
          ← กลับไปหน้าค้นหา
        </Link>
        <div className="loading-spinner"></div>
        <div className="status-message">กำลังโหลดรายละเอียดอาหาร...</div>
      </div>
    )
  }

  // ❌ Error state
  if (error) {
    return (
      <div style={{ padding: '2rem', textAlign: 'center' }}>
        <Link to="/" style={{ display: 'block', marginBottom: '2rem' }}>
          ← กลับไปหน้าค้นหา
        </Link>
        <p style={{ color: 'red' }}>{error}</p>
      </div>
    )
  }

  // ✅ แสดงรายละเอียดอาหาร
  return (
    <div style={{ padding: '2rem' }}>
      <Link to="/">← กลับไปหน้าค้นหา</Link>

      <h1>{meal.strMeal}</h1>
      <img
        src={meal.strMealThumb}
        alt={meal.strMeal}
        style={{ maxWidth: '400px', borderRadius: '10px', margin: '1rem 0' }}
      />
      <p>
        <strong>หมวดหมู่:</strong> {meal.strCategory || 'ไม่ระบุ'}
      </p>
      <p>
        <strong>ประเทศ:</strong> {meal.strArea || 'ไม่ระบุ'}
      </p>

      {/* ส่วนผสม */}
      <div style={{ margin: '2rem 0' }}>
        <h2>🥘 ส่วนผสม</h2>
        <div className="ingredients-section">
          <ul className="ingredients-list">
            {processMealIngredients(meal).map((ingredient, index) => (
              <li key={index}>{ingredient}</li>
            ))}
          </ul>
        </div>
      </div>

      {/* วิธีทำ */}
      <div style={{ margin: '2rem 0' }}>
        <h2>👨‍🍳 วิธีทำ</h2>
        <div className="instructions-section">
          <div className="instructions-text">
            {meal.strInstructions || 'ไม่มีข้อมูลวิธีทำ'}
          </div>
        </div>
      </div>

      {/* วิดีโอ (ถ้ามี) */}
      {meal.strYoutube && (
        <div style={{ margin: '2rem 0' }}>
          <h2>📺 วิดีโอการทำ</h2>
          <a
            href={meal.strYoutube}
            target="_blank"
            rel="noopener noreferrer"
            className="video-link"
            style={{
              display: 'inline-block',
              backgroundColor: '#dc3545',
              color: 'white',
              padding: '0.75rem 1.5rem',
              textDecoration: 'none',
              borderRadius: '5px',
              marginTop: '1rem',
            }}
          >
            ดูวิดีโอใน YouTube
          </a>
        </div>
      )}
    </div>
  )
}

export default MealDetailPage