// Add event listeners to circle cards
document.querySelectorAll(".circle-card").forEach(card => {
    card.addEventListener("click", () => {
        const selectedCategory = card.getAttribute("data-category");
        localStorage.setItem("selectedCategory", selectedCategory); // Store the selected category in localStorage
        window.location.href = "recipe.html"; // Redirect to the recipe page
    });
});