import { recipes } from './RecipeData.js';

document.addEventListener('DOMContentLoaded', () => {
    const recipeId = localStorage.getItem('selectedRecipeId');
    const recipe = recipes.find(r => r.id == recipeId);

    if (!recipe) {
        window.location.href = "recipe.html";
        return;
    }

    document.getElementById('recipe-title').textContent = recipe.title;
    document.getElementById('recipe-time').textContent = recipe.time;
    document.getElementById('recipe-rating').textContent = recipe.rating;
    document.getElementById('recipe-category').textContent = recipe.category;
    document.getElementById('recipe-image').src = recipe.image;
    document.getElementById('recipe-desc').textContent = recipe.description;

    const ingredientsList = document.getElementById('ingredients-list');
    recipe.ingredients.forEach(ingredient => {
        const li = document.createElement('li');
        li.textContent = ingredient;
        ingredientsList.appendChild(li);
    });

    const instructionsList = document.getElementById('instructions-list');
    recipe.instructions.forEach(step => {
        const li = document.createElement('li');
        li.textContent = step;
        instructionsList.appendChild(li);
    });

    const tipsList = document.getElementById('tips-list');
    recipe.tips.forEach(tip => {
        const li = document.createElement('li');
        li.textContent = tip;
        tipsList.appendChild(li);
    });

    document.getElementById('printButton').addEventListener('click', () => {
        window.print();
    });
});