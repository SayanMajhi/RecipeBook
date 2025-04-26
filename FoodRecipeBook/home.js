// ========================================Add event listeners to circle cards=================================================================
document.querySelectorAll(".circle-card").forEach(card => {
    card.addEventListener("click", () => {
        const selectedCategory = card.getAttribute("data-category");
        localStorage.setItem("selectedCategory", selectedCategory);
        window.location.href = "recipe.html";
    });
});
//===================
document.addEventListener("DOMContentLoaded", () => {
    const signupModal = document.getElementById("signupModal");
    const signupLink = document.querySelector(".top-bar a");
    const closeModal = document.querySelector(".modal .close");
    const topBar = document.querySelector(".top-bar");
    const signupForm = document.getElementById("signupForm");

    // Open the modal when clicking "SIGN UP"
    signupLink.addEventListener("click", (e) => {
        e.preventDefault();
        signupModal.style.display = "block";
    });

    // Close the modal when clicking the close button
    closeModal.addEventListener("click", () => {
        signupModal.style.display = "none";
    });

    // Close the modal when clicking outside the modal content
    window.addEventListener("click", (e) => {
        if (e.target === signupModal) {
            signupModal.style.display = "none";
        }
    });

    // Hide the top bar after signing up
    signupForm.addEventListener("submit", (e) => {
        e.preventDefault();
        alert("Thank you for signing up!");
        signupModal.style.display = "none";
        topBar.style.display = "none";
    });
});