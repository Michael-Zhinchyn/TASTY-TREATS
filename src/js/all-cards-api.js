import axios from 'axios';
import { getRecipe } from './recipe-modal';

// URL нашого API
const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

// SVG-коди зірок та сердець
const starIconGrey = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
const starIconOrange = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path fill="orange" d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;

// Функція, що генерує HTML-блок з іконкою серця
function generateHeartBlock(id) {
  return `
    <div class="heart-block">
      <input type="checkbox" class="card-checkbox" id="card-checkbox-${id}" />
      <label for="card-checkbox-${id}" class="card-checkbox-label">
        <!-- SVG-коди для невідміченого та відміченого серця -->
      </label>
    </div>`;
}

// Функція, що генерує HTML-код зірок на основі рейтингу рецепту
function generateStars(rating) {
  let stars = '';
  let roundedRating = Math.round(rating);
  for (let i = 0; i < 5; i++) {
    stars += i < roundedRating ? starIconOrange : starIconGrey;
  }
  return stars;
}

// Функція, що генерує HTML-код для карточки рецепту
function generateRecipeCard(recipe) {
  return `
    <li class="card-item">
      <div class="card-block">
        <img class="card-image" src="${recipe.preview}" alt="${
    recipe.title
  }" width="335px">
        ${generateHeartBlock(recipe._id)}
        <div class="card-content">
          <h3 class="card-heading">${recipe.title}</h3>
          <p class="card-description">${recipe.description}</p>
        </div>
        <div class="card-bottom">
          <div class="card-rating-block">
            <p class="card-rating">${recipe.rating}</p>
            <div class="eating-stars">${generateStars(recipe.rating)}</div>
          </div>
          <button class="card-button" data-id="${
            recipe._id
          }">See recipe</button>
        </div>
      </div>
    </li>`;
}

// Функція, що отримує рецепти з API та додає їх на сторінку
async function getAllRecipes() {
  try {
    const response = await axios.get(API_URL);
    const { results } = response.data;

    // Створюємо карточки рецептів та додаємо їх на сторінку
    const recipeCards = results.map(generateRecipeCard).join('');
    const recipesContainer = document.querySelector('.filter-card-set');
    recipesContainer.innerHTML = recipeCards;

    const seeRecipeButtons = recipesContainer.querySelectorAll('.card-button');
    seeRecipeButtons.forEach(button => {
      button.addEventListener('click', event => {
        const buttonElement = event.target.closest('.card-button');
        const recipeId = buttonElement.getAttribute('data-id');

        console.log('Recipe ID:', recipeId);
        console.log(results);

        getRecipe(recipeId);
      });
    });
  } catch (error) {
    console.log(error);
  }
}

// Викликаємо функцію, щоб вивести всі рецепти при завантаженні сторінки
getAllRecipes();
