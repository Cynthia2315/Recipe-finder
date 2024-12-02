document.getElementById('searchButton').addEventListener('click', function() {
    const query = document.getElementById('searchInput').value;
    fetchRecipes(query);
});
  
async function fetchRecipes(query) {
    const recipeResults = document.getElementById('recipeResults');
    recipeResults.innerHTML = ''; // Clear previous results

    if (!query) {
      return;
    }

    try {
      const response = await fetch(`https://www.themealdb.com/api/json/v1/1/search.php?s=${query}`);
      const data = await response.json();

      if (data.meals) {
        displayRecipes(data.meals);
      } else {
        recipeResults.innerHTML = '<p>No recipes found. Try another search.</p>';
      }
    } catch (error) {
      recipeResults.innerHTML = '<p>There was an error fetching the data. Please try again later.</p>';
    }
}
  
function displayRecipes(meals) {
    const recipeResults = document.getElementById('recipeResults');

    meals.forEach(meal => {
        const card = document.createElement('div');
        card.classList.add('recipe-card');
        card.innerHTML = `
          <img src="${meal.strMealThumb}" alt="${meal.strMeal}">
          <h3>${meal.strMeal}</h3>
          <p>${meal.strArea}</p>
          <button class="view-recipe" onclick="openRecipeModal('${meal.idMeal}')">View Recipe</button>
        `;
        recipeResults.appendChild(card);
    });
}
  
function openRecipeModal(mealId) {
    const modal = document.getElementById('recipeModal');
    const recipeTitle = document.getElementById('recipeTitle');
    const recipeImage = document.getElementById('recipeImage');
    const recipeInstructions = document.getElementById('recipeInstructions');

    // Fetch meal details
    fetch(`https://www.themealdb.com/api/json/v1/1/lookup.php?i=${mealId}`)
      .then(response => response.json())
      .then(data => {
        const meal = data.meals[0];
        recipeTitle.textContent = meal.strMeal;
        recipeImage.src = meal.strMealThumb;
        recipeInstructions.textContent = meal.strInstructions;
      });

    modal.style.display = 'block';
}

// Close modal functionality
document.querySelector('.close-btn').addEventListener('click', function() {
    document.getElementById('recipeModal').style.display = 'none';
});

// Go back to recipe list
document.getElementById('goBackButton').addEventListener('click', function() {
    document.getElementById('recipeModal').style.display = 'none';
});

// Close modal if clicked outside of it
window.onclick = function(event) {
    if (event.target == document.getElementById('recipeModal')) {
      document.getElementById('recipeModal').style.display = 'none';
    }
};
