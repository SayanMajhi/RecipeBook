import { recipes } from './RecipeData.js';

let currentPage = 1;
const recipesPerPage = 12;

// ===================== FAVORITE STORAGE HELPERS =====================
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

function isFavorite(recipe) {
    const favorites = getFavorites();
    return favorites.some(fav => fav.title === recipe.title);
}

// ===================== RENDER RECIPES =====================
function renderRecipes(selectedCategory = "all") {
    const recipeGrid = document.querySelector(".recipe-grid");
    recipeGrid.innerHTML = "";

    const filteredRecipes = selectedCategory === "all"
        ? recipes
        : recipes.filter(recipe => recipe.category === selectedCategory);

    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const paginatedRecipes = filteredRecipes.slice(startIndex, endIndex);

    paginatedRecipes.forEach((recipe, index) => {
        const globalIndex = index + startIndex;
        const fav = isFavorite(recipe);
        recipeGrid.innerHTML += `
            <div class="recipe-card" data-id="${recipe.id}">
                <div class="recipe-image" style="background-image: url('${recipe.image}');"></div>
                <div class="recipe-info">
                    <div class="recipe-title">${recipe.title}</div>
                    <div class="recipe-time">${recipe.time}</div>
                    <div class="recipe-actions">
                        <div class="rating">${recipe.rating}</div>
                        <button class="favorite-btn" data-index="${globalIndex}">
                            <img src="${fav ? './Images/heartcolor.png' : './Images/heart.png'}" alt="Favorite" />
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // Add heart toggle click events
    document.querySelectorAll(".favorite-btn").forEach(button => {
        button.addEventListener("click", toggleFavorite);
    });

    document.querySelectorAll(".recipe-card").forEach(card => {
        card.addEventListener("click", (event) => {
            if (!event.target.closest(".favorite-btn")) {
                const recipeId = parseInt(card.getAttribute("data-id"));
                localStorage.setItem('selectedRecipeId', recipeId); // Store the recipe ID in localStorage
                window.location.href = "recipe-detail.html"; // Redirect to the recipe-detail.html page
            }
        });
    });

    renderPagination(filteredRecipes.length);
}

// ===================== TOGGLE FAVORITE =====================
function toggleFavorite(event) {
    event.stopPropagation();
    const button = event.currentTarget;
    const index = parseInt(button.getAttribute("data-index"));
    const recipe = recipes[index];
    const img = button.querySelector("img");

    let favorites = getFavorites();
    const exists = favorites.some(fav => fav.title === recipe.title);

    if (exists) {
        favorites = favorites.filter(fav => fav.title !== recipe.title);
        img.src = "./Images/heart.png";
    } else {
        favorites.push(recipe);
        img.src = "./Images/heartcolor.png";
    }

    saveFavorites(favorites);
    console.log("Favorites:", favorites);
}

// ===================== PAGINATION =====================
function renderPagination(totalRecipes) {
    const paginationContainer = document.querySelector(".pagination");
    paginationContainer.innerHTML = "";

    const totalPages = Math.ceil(totalRecipes / recipesPerPage);

    for (let i = 1; i <= totalPages; i++) {
        const button = document.createElement("button");
        button.textContent = i;
        button.classList.add("pagination-btn"); // Add the class for styling
        if (i === currentPage) button.classList.add("active");

        button.addEventListener("click", () => {
            currentPage = i;
            renderRecipes(document.getElementById("category-dropdown").value);
        });

        paginationContainer.appendChild(button);
    }
}

// ===================== CATEGORY FILTER =====================
document.getElementById("category-dropdown").addEventListener("change", () => {
    currentPage = 1;
    renderRecipes(document.getElementById("category-dropdown").value);
});

// ===================== INITIAL RENDER =====================
renderRecipes();