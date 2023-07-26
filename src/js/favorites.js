import axios from 'axios';
import { generateRecipeCard } from './all-cards-api';
import { remove } from 'lodash';

// Отримуємо дані з локального сховища
let storedData = localStorage.getItem('inFavorite');

// Ініціалізуємо масиви для ідентифікаторів рецептів та категорій
let actualIDs = [];
let addedCategories = [];

// Якщо в локальному сховищі є дані, оброблюємо їх
if (storedData) {
  let fullIDs = JSON.parse(storedData);
  actualIDs = fullIDs.map(id => id.replace('card-checkbox-', ''));
}

const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

// Отримуємо елементи DOM
const categoryBlock = document.getElementById('category-filter-div');
const resetCategoryBtn = document.querySelector('.fav-category-fltr-btn')
const paginationBar = document.querySelector('.pagination-bar')

// Якщо існує панель навігації, ховаємо її
if(paginationBar) {
  paginationBar.style.display = 'none'
}

// Отримуємо контейнер для обраних рецептів
export const favoritesContainer = document.querySelector('.favorite-card-list');

async function addFavoriteRecipe(id) {
  try {
    // Отримуємо рецепт з бекенду
    const response = await axios.get(`${API_URL}/${id}`);
    const recipe = response.data;

    const category = recipe.category;

    // Перевіряємо, чи вже додана ця категорія
    if (!addedCategories.includes(category)) {
      // Якщо ні, додаємо її до масиву та створюємо розмітку
      addedCategories.push(category);
      const categoryMarkup = generateCategoryMarkup(category);
      if (categoryBlock) {
        categoryBlock.innerHTML += categoryMarkup;
      }
    }

    // Генеруємо картку рецепту
    const recipeCard = generateRecipeCard(recipe);

    if (favoritesContainer) {
      const messageBlock = document.querySelector('.block-for-empty');

      // Ховаємо повідомлення та показуємо кнопку та панель навігації
      messageBlock.style.display = 'none';
      resetCategoryBtn.style.display = 'flex'
      paginationBar.style.display = 'flex'

      // Додаємо нову картку рецепту
      favoritesContainer.innerHTML += recipeCard;

      // Ініціалізуємо масив для вибраних чекбоксів
      const heartCheckBoxEl = document.querySelectorAll('.card-checkbox');
      let selectedHeartCheckBox = [];

      heartCheckBoxEl.forEach(heart => {
        heart.checked = true;

        // Функція для обробки зміни стану чекбоксів
        function handleCheckboxChange(event) {
          const checkbox = event.target; // елемент на який клікаємо <input>
          const checkboxId = checkbox.id;

          // Отримання батьківського елемента `.card-block`
          const cardBlock = checkbox.closest('.card-block');

          if (checkbox.checked) {
            selectedHeartCheckBox.push(checkboxId);
          } else {
            // Перевіряємо, чи елемент міститься у списку вибраних перед тим, як його видалити
            const index = selectedHeartCheckBox.indexOf(checkboxId);
            if (index !== -1) {
              selectedHeartCheckBox.splice(index, 1);
              const cardItemEl = cardBlock.closest('.card-item');
              cardItemEl.remove();
              if (
                favoritesContainer &&
                favoritesContainer.children.length === 0
              ) {
                favoritesContainer.remove();
                messageBlock.style.display = 'flex';
              }
            }
          }

          const heartCheckBoxElLocalStorage = JSON.stringify(
            selectedHeartCheckBox
          );
          localStorage.setItem('inFavorite', heartCheckBoxElLocalStorage);
        }

        heart.addEventListener('change', handleCheckboxChange);

        // Перевіряємо, чи є збережені дані в локальному сховищі
        const storedData = localStorage.getItem('inFavorite');
        if (storedData) {
          // Розпарсуємо дані з локального сховища назад у масив
          selectedHeartCheckBox = JSON.parse(storedData);

          // Відновлюємо стан чекбоксів на основі збережених значень
          heartCheckBoxEl.forEach(checkbox => {
            const checkboxId = checkbox.id;
            if (selectedHeartCheckBox.includes(checkboxId)) {
              checkbox.checked = true;
            } else {
              messageBlock.style.display = 'flex';
            }
          });
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

// Завантажуємо обрані рецепти при завантаженні сторінки
function loadFavoriteRecipes() {
  if (actualIDs) {
    actualIDs.forEach(id => {
      addFavoriteRecipe(id);
    });
  }
}

// Функція для генерування розмітки для категорії
function generateCategoryMarkup(category) {
  return `<button type="button" class="fav-category-btn">${category}</button>`;
}

// Завантажуємо рецепти при завантаженні сторінки
loadFavoriteRecipes();
