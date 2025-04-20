// ===================== FAVORITE STORAGE HELPERS =====================
function getFavorites() {
    return JSON.parse(localStorage.getItem("favorites")) || [];
}

function saveFavorites(favorites) {
    localStorage.setItem("favorites", JSON.stringify(favorites));
}

let currentPage = 1;
const recipesPerPage = 12;

// ===================== RENDER FAVORITES =====================
function renderFavoriteRecipes() {
    const recipeGrid = document.querySelector(".recipe-grid");
    const favorites = getFavorites();

    if (favorites.length === 0) {
        recipeGrid.innerHTML = `<p>No favorite recipes yet.</p>`;
        document.querySelector(".pagination").innerHTML = ""; // Clear pagination if no favorites
        return;
    }

    recipeGrid.innerHTML = "";

    const startIndex = (currentPage - 1) * recipesPerPage;
    const endIndex = startIndex + recipesPerPage;
    const paginatedFavorites = favorites.slice(startIndex, endIndex);

    paginatedFavorites.forEach((recipe, index) => {
        recipeGrid.innerHTML += `
            <div class="recipe-card" data-id="${recipe.id}">
                <div class="recipe-image" style="background-image: url('${recipe.image}');"></div>
                <div class="recipe-info">
                    <div class="recipe-title">${recipe.title}</div>
                    <div class="recipe-time">${recipe.time}</div>
                    <div class="recipe-actions">
                        <div class="rating">${recipe.rating}</div>
                        <button class="favorite-btn" data-index="${index + startIndex}">
                            <img src="./Images/heartcolor.png" alt="Unfavorite" />
                        </button>
                    </div>
                </div>
            </div>
        `;
    });

    // Add unfavorite button click events
    document.querySelectorAll(".favorite-btn").forEach(button => {
        button.addEventListener("click", toggleUnfavorite);
    });

    // Add click event to open recipe in a new tab
    document.querySelectorAll(".recipe-card").forEach(card => {
        card.addEventListener("click", (event) => {
            if (!event.target.closest(".favorite-btn")) {
                const recipeId = parseInt(card.getAttribute("data-id"));
                localStorage.setItem('selectedRecipeId', recipeId); // Store the recipe ID in localStorage
                window.open("recipe-detail.html", "_blank"); // Open in a new tab
            }
        });
    });

    renderPagination(favorites.length); // Render pagination
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
            renderFavoriteRecipes(); // Corrected function call
        });

        paginationContainer.appendChild(button);
    }
}

// ===================== UNFAVORITE FUNCTION =====================
function toggleUnfavorite(event) {
    const button = event.currentTarget;
    const index = parseInt(button.getAttribute("data-index"));
    let favorites = getFavorites();

    favorites.splice(index, 1); // Remove the selected favorite
    saveFavorites(favorites);

    renderFavoriteRecipes(); // Re-render
}

// ===================== INIT =====================
document.addEventListener("DOMContentLoaded", () => {
    renderFavoriteRecipes();
});