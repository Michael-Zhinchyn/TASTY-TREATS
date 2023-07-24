import Notiflix from 'notiflix';
import axios from 'axios';

const searchInput = document.querySelector('#id-input-search');
const timeSelect = document.querySelector('#select-time');
const areaSelect = document.querySelector('#select-area');
const ingredientsSelect = document.querySelector('#select-Ingredients');
const resipeList = document.querySelector('.filter-card-set');

async function fetchRecipes() {
    try {

        const response = await axios(`${BASE_URL}, ${API_URL}`);
        const data = await response.json();
        return data.recipes;
    } catch {
        console.error("Нажаль по даному запиту рецепт не знайденний:", error);
        return [];
    }
};

const recipesRender = async() => {
    const keyword = searchInput.value.trim().toLowerCase();
    const selectTime = timeSelect.value;
    const selectArea = areaSelect.value;
    const selectIngredients = ingredientsSelect.value;
}

const allRecipe = await fetchRecipes();

const filtered = allRecipe.filter((recipe) => {
    const isKeywordMath = recipe.title.toLowerCase().includes(keyword);
    const isTimeMath = selectTime === "" || recipe.time <= parseInt(selectTime);
    const isAreaMath = selectArea === "" || recipe.area === selectArea;
    const isIngredientsMath = selectIngredients === "" || recipe.ingredients.includes(selectIngredients);
    return isKeywordMath && isTimeMath && isAreaMath && isIngredientsMath;
});

recipe.innerHTML = "";

if(filtered.length > 0) {
    
}