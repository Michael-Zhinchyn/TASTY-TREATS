import axios from 'axios';
import { getRecipesByCategory, getAllRecipes, recipesContainer } from './all-cards-api.js';


const categoriesList = document.querySelector('.categories-list');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/categories';

export async function getCategories() {
  try {
    const response = await axios.get(BASE_URL);
    const markUp = createMarkUp(response.data);
    if (categoriesList) {
      categoriesList.innerHTML = markUp;
      addClickListenersToCategories();
      getAllRecipes(); // Відображаємо всі рецепти при завантаженні сторінки
    }
  } catch (error) {
    console.error(error);
  }
}

function addClickListenersToCategories() {
  const categoryItems = categoriesList.querySelectorAll('.category-item');
  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      // Отримуємо текст назви категорії з дата-атрибуту
      const category = item.dataset.category;
      // Отримуємо рецепти за вибраною категорією та відображаємо їх
      getRecipesByCategory(category);
    });
  });
}

function createMarkUp(data) {
  return data
    .map(
      ({ name }) => `<li class="category-item" data-category="${name}">
              <p class="category-name">${name}</p>
            </li>`
    )
    .join('');
}

getCategories();
