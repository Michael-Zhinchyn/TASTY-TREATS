import axios from 'axios';
import { generateRecipeCard } from './all-cards-api';
import { remove } from 'lodash';

let storedData = localStorage.getItem('inFavorite');
let actualIDs = [];
let addedCategories = [];
if (storedData) {
  let fullIDs = JSON.parse(storedData);
  actualIDs = fullIDs.map((id) => id.replace('card-checkbox-', ''));
}

const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';
const categoryBlock = document.getElementById('category-filter-div');
const resetCategoryBtn = document.querySelector('.fav-category-fltr-btn');
export const favoritesContainer = document.querySelector('.favorite-card-list');

async function addFavoriteRecipe(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const recipe = response.data;

    const category = recipe.category;
    if (!addedCategories.includes(category)) {
      addedCategories.push(category);
      const categoryMarkup = generateCategoryMarkup(category);
      if (categoryBlock) {
        categoryBlock.innerHTML += categoryMarkup;
      }
    }

    const recipeCard = generateRecipeCard(recipe);

    if (favoritesContainer) {
      const messageBlock = document.querySelector('.block-for-empty');

      messageBlock.style.display = 'none';
      resetCategoryBtn.style.display = 'flex';
      favoritesContainer.innerHTML += recipeCard;

      const heartCheckBoxEl = document.querySelectorAll('.card-checkbox');
      let selectedHeartCheckBox = [];

      heartCheckBoxEl.forEach((heart) => {
        if (heart) {
          heart.checked = true;

          function handleCheckboxChange(event) {
            const checkbox = event.target;
            const checkboxId = checkbox.id;
            const cardBlock = checkbox.closest('.card-block');

            if (checkbox.checked) {
              selectedHeartCheckBox.push(checkboxId);
            } else {
              const index = selectedHeartCheckBox.indexOf(checkboxId);
              if (index !== -1) {
                selectedHeartCheckBox.splice(index, 1);
                const cardItemEl = cardBlock.closest('.card-item');
                cardItemEl.remove();

                const category = checkboxId.replace('card-checkbox-', '');
                const categoryToDelete = addedCategories.find(
                  (categoryItem) => !favoritesContainer.querySelector(`[id^="card-checkbox-${categoryItem}"]`)
                );

                if (categoryToDelete) {
                  const categoryButton = document.querySelector(`.fav-category-btn[data-category="${categoryToDelete}"]`);
                  if (categoryButton) {
                    categoryButton.remove();
                  }
                  addedCategories = addedCategories.filter((categoryItem) => categoryItem !== categoryToDelete);
                }

                if (!favoritesContainer.querySelector('.card-item')) {
                  favoritesContainer.remove();
                  messageBlock.style.display = 'flex';
                }

                const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeartCheckBox);
                localStorage.setItem('inFavorite', heartCheckBoxElLocalStorage);

                // Оновлюємо видимість кнопки "All categories" після кожного змінного checkbox
                updateAllCategoriesButtonVisibility();
              }
            }
          }

          heart.addEventListener('change', handleCheckboxChange);

          const storedData = localStorage.getItem('inFavorite');
          if (storedData) {
            selectedHeartCheckBox = JSON.parse(storedData);

            heartCheckBoxEl.forEach((checkbox) => {
              const checkboxId = checkbox.id;
              if (selectedHeartCheckBox.includes(checkboxId)) {
                checkbox.checked = true;
              } else {
                messageBlock.style.display = 'flex';
              }
            });
          }
        }
      });
    }
  } catch (error) {
    console.log(error);
  }
}

function updateAllCategoriesButtonVisibility() {
  const allCategoriesButton = document.getElementById('all-categories-button');

  if (allCategoriesButton) {
    if (favoritesContainer && favoritesContainer.children.length === 0) {
      allCategoriesButton.style.display = 'none';
    } else {
      allCategoriesButton.style.display = 'block';
    }
  }
}

function loadFavoriteRecipes() {
  if (actualIDs) {
    actualIDs.forEach((id) => {
      addFavoriteRecipe(id);
    });
  }

  // Оновлюємо видимість кнопки "All categories" при завантаженні списку обраних рецептів
  updateAllCategoriesButtonVisibility();
}

function generateCategoryMarkup(category) {
  return `<button class="fav-category-btn" type="button" data-category="${category}">${category}</button>`;
}

function initializePage() {
  loadFavoriteRecipes();
}

// Викликаємо ініціалізацію сторінки, коли DOM повністю завантажений
window.addEventListener('load', initializePage);
