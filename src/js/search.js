import Notiflix from 'notiflix';
import axios from 'axios';
import _ from 'lodash';

const searchInput = document.querySelector('#id-input-search');
const timeSelect = document.querySelector('#select-time');
const areaSelect = document.querySelector('#select-area');
const ingredientsSelect = document.querySelector('#select-Ingredients');
const recipeList = document.querySelector('.filter-card-set');

async function fetchRecipes() {
  try {
    const response = await axios.get(`${API_URL}`);
    const data = response.data;
    return data.recipes;
  } catch (error) {
    console.error("Нажаль по даному запиту рецепт не знайденний");
    return [];
  }
}

// Функція для відображення рецептів з урахуванням обраних фільтрів
const recipesRender = async () => {
  const keyword = searchInput.value.trim().toLowerCase();
  const selectTime = timeSelect.value;
  const selectArea = areaSelect.value;
  const selectIngredients = ingredientsSelect.value;

  const allRecipe = await fetchRecipes();

  const filtered = allRecipe.filter((recipe) => {
    const isKeywordMatch = recipe.title.toLowerCase().includes(keyword);
    const isTimeMatch = selectTime === "" || recipe.time <= parseInt(selectTime);
    const isAreaMatch = selectArea === "" || recipe.area === selectArea;
    const isIngredientsMatch = selectIngredients === "" || recipe.ingredients.includes(selectIngredients);
    return isKeywordMatch && isTimeMatch && isAreaMatch && isIngredientsMatch;
  });

  recipeList.innerHTML = "";

  if (filtered.length > 0) {
    // Відображення рецептів, якщо є результати пошуку
    filtered.forEach((recipe) => {
      const recipeItem = document.createElement("div");
      recipeItem.textContent = recipe.title;
      recipeList.appendChild(recipeItem);
    });
  } else {
    // Виведення сповіщення про відсутність результатів пошуку
    Notiflix.Report.failure("No recipes found matching the selected filters!");
  }
};

// Обробник події для поля пошуку з використанням Debounce
searchInput.addEventListener("input", _.debounce(async () => {
  await recipesRender();
}, 300));

// Обробники подій для селекторів часу, країни походження та інгредієнтів
timeSelect.addEventListener("change", async () => {
  await recipesRender();
});

areaSelect.addEventListener("change", async () => {
  await recipesRender();
});

ingredientsSelect.addEventListener("change", async () => {
  await recipesRender();
});

// Виклик функції для відображення рецептів при завантаженні сторінки
recipesRender();