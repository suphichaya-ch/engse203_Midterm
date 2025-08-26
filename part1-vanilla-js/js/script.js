const form = document.getElementById("search-form");
const searchInput = document.getElementById("search-input");
const resultsGrid = document.getElementById("results-grid");


form.addEventListener("submit", (e) => {
  e.preventDefault();
  const keyword = searchInput.value.trim();
  if (keyword) {
    searchRecipes(keyword);
  }
});


async function searchRecipes(keyword) {
  resultsGrid.innerHTML = "<p class='loading'>Searching for recipes...</p>";

  const url = `https://www.themealdb.com/api/json/v1/1/search.php?s=${keyword}`;

  try {
    const res = await fetch(url);
    const data = await res.json();
    displayRecipes(data.meals);
  } catch (error) {
    console.error("Error fetching data:", error);
    resultsGrid.innerHTML = "<p class='error'>An error occurred. Please try again later.</p>";
  }
}


function displayRecipes(meals) {
  resultsGrid.innerHTML = ""; 

  if (!meals) {
    resultsGrid.innerHTML = "<p class='no-result'>No recipes found.</p>";
    return;
  }

  meals.forEach((meal) => {
    const mealCard = document.createElement("div");
    mealCard.classList.add("meal-card");

    mealCard.innerHTML = `
      <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
      <h3>${meal.strMeal}</h3>
    `;

    resultsGrid.appendChild(mealCard);
  });
}
