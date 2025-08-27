document.addEventListener('DOMContentLoaded', () => {
    // --- DOM Elements ---
    const searchForm = document.getElementById('search-form');
    const searchInput = document.getElementById('search-input');
    const resultsContainer = document.getElementById('results-container');
    const resultsGrid = document.getElementById('results-grid');
    const detailsContainer = document.getElementById('details-container');
    const favoritesContainer = document.getElementById('favorites-container');
    const favoritesGrid = document.getElementById('favorites-grid');
    const randomBtn = document.getElementById('random-btn');
    const favoritesBtn = document.getElementById('favorites-btn');

    // --- API & LocalStorage Constants ---
    const API_BASE_URL = 'https://www.thecocktaildb.com/api/json/v1/1/search.php?s=KEYWORD';
    const FAVORITES_KEY = 'cocktailFavorites';

    // --- LocalStorage Helper Functions ---
    const getFavorites = () => JSON.parse(localStorage.getItem(FAVORITES_KEY)) || [];
    const saveFavorites = (favorites) => localStorage.setItem(FAVORITES_KEY, JSON.stringify(favorites));

    // --- Event Listeners ---
    searchForm.addEventListener('submit', handleSearch);
    randomBtn.addEventListener('click', fetchRandomDrink);
    favoritesBtn.addEventListener('click', showFavorites);
    resultsGrid.addEventListener('click', handleGridClick);
    favoritesGrid.addEventListener('click', handleGridClick);

    // --- Event Handlers ---
    function handleSearch(e) {
        e.preventDefault();
        const searchTerm = searchInput.value.trim();
        if (searchTerm) {
            searchDrinks(searchTerm);
        }
    }

    function handleGridClick(event) {
        const favoriteBtn = event.target.closest('.favorite-btn');
        const drinkCard = event.target.closest('.drink-card');
        
        if (favoriteBtn) {
            const drinkId = favoriteBtn.dataset.drinkId;
            toggleFavorite(drinkId);
        } else if (drinkCard) {
            const drinkId = drinkCard.dataset.drinkId;
            loadDrinkDetails(drinkId);
        }
    }
    
    // --- API Functions ---
    async function searchDrinks(keyword) {
        showView(resultsContainer);
        resultsGrid.innerHTML = '<p class="status-message">Searching for cocktails...</p>';
        try {
            const response = await fetch(`${API_BASE_URL}/search.php?s=${keyword}`);
            const data = await response.json();
            displayResults(data.drinks, resultsGrid);
        } catch (error) {
            resultsGrid.innerHTML = '<p class="status-message">An error occurred. Please try again.</p>';
        }
    }

    async function loadDrinkDetails(drinkId) {
        showView(detailsContainer);
        detailsContainer.innerHTML = '<p class="status-message">Loading details...</p>';
        try {
            const response = await fetch(`${API_BASE_URL}/lookup.php?i=${drinkId}`);
            const data = await response.json();
            displayDrinkDetails(data.drinks[0]);
        } catch (error) {
            detailsContainer.innerHTML = '<p class="status-message">Could not load details.</p>';
        }
    }
    
    async function fetchRandomDrink() {
        showView(detailsContainer);
        detailsContainer.innerHTML = '<p class="status-message">Fetching a random drink...</p>';
        try {
            const response = await fetch(`${API_BASE_URL}/random.php`);
            const data = await response.json();
            displayDrinkDetails(data.drinks[0]);
        } catch (error) {
            detailsContainer.innerHTML = '<p class="status-message">Could not fetch a random drink.</p>';
        }
    }

    // --- Display Functions ---
    function displayResults(drinks, gridElement) {
        gridElement.innerHTML = '';
        if (!drinks) {
            gridElement.innerHTML = '<p class="status-message">No cocktails found. Try another keyword!</p>';
            return;
        }

        const favorites = getFavorites();
        drinks.forEach(drink => {
            const isFavorite = favorites.some(favId => favId === drink.idDrink);
            const drinkCard = document.createElement('div');
            drinkCard.className = 'drink-card';
            drinkCard.dataset.drinkId = drink.idDrink;
            drinkCard.innerHTML = `
                <button class="favorite-btn ${isFavorite ? 'is-favorite' : ''}" data-drink-id="${drink.idDrink}">⭐</button>
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <h3>${drink.strDrink}</h3>
            `;
            gridElement.appendChild(drinkCard);
        });
    }

    function displayDrinkDetails(drink) {
        const ingredients = [];
        for (let i = 1; i <= 15; i++) {
            const ingredient = drink[`strIngredient${i}`];
            const measure = drink[`strMeasure${i}`];
            if (ingredient) {
                ingredients.push(`<li>${measure || ''} ${ingredient}</li>`);
            }
        }
        detailsContainer.innerHTML = `
            <div class="details-header">
                <img src="${drink.strDrinkThumb}" alt="${drink.strDrink}">
                <div>
                    <h2>${drink.strDrink}</h2>
                    <p><strong>Category:</strong> ${drink.strCategory}</p>
                    <p><strong>Glass:</strong> ${drink.strGlass}</p>
                    <h3>Ingredients</h3>
                    <ul class="ingredients-list">${ingredients.join('')}</ul>
                </div>
            </div>
            <h3>Instructions</h3>
            <p class="instructions">${drink.strInstructions}</p>
        `;
    }

    function showFavorites() {
        showView(favoritesContainer);
        const favoriteIds = getFavorites();
        if (favoriteIds.length === 0) {
            favoritesGrid.innerHTML = '<p class="status-message">You have no favorite drinks yet.</p>';
            return;
        }

        favoritesGrid.innerHTML = '<p class="status-message">Loading favorites...</p>';
        const favoritePromises = favoriteIds.map(id => 
            fetch(`${API_BASE_URL}/lookup.php?i=${id}`).then(res => res.json())
        );

        Promise.all(favoritePromises)
            .then(results => {
                const favoriteDrinks = results.map(result => result.drinks[0]);
                displayResults(favoriteDrinks, favoritesGrid);
            })
            .catch(error => {
                favoritesGrid.innerHTML = '<p class="status-message">Could not load favorites.</p>';
            });
    }
    
    // --- Utility Functions ---
    function toggleFavorite(drinkId) {
        let favorites = getFavorites();
        if (favorites.includes(drinkId)) {
            favorites = favorites.filter(id => id !== drinkId);
        } else {
            favorites.push(drinkId);
        }
        saveFavorites(favorites);
        
        document.querySelectorAll(`.favorite-btn[data-drink-id="${drinkId}"]`).forEach(btn => {
            btn.classList.toggle('is-favorite');
        });
    }

    function showView(viewToShow) {
        [resultsContainer, detailsContainer, favoritesContainer].forEach(view => {
            view.classList.add('hidden');
        });
        viewToShow.classList.remove('hidden');
    }
});