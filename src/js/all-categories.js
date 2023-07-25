import axios from 'axios';
import {
  getRecipesByCategory,
  getAllRecipes,
  recipesContainer,
} from './all-cards-api.js';

const categoriesList = document.querySelector('.categories-list');
const allCategoriesButton = document.getElementById('all-categories-button');

const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api/categories';

export async function getCategories() {
  try {
    const response = await axios.get(BASE_URL);
    const markUp = createMarkUp(response.data);
    if (categoriesList) {
      categoriesList.innerHTML = markUp;
      addClickListenersToCategories();
      allCategoriesButton.classList.add('active-category'); // Додаємо клас active-category для кнопки "All categories" при завантаженні сторінки
    }
  } catch (error) {
    console.error(error);
  }
  getAllRecipes(); // Відображаємо всі рецепти після того, як вже відобразили всі категорії
}

function addClickListenersToCategories() {
  const categoryItems = categoriesList.querySelectorAll('.category-item');
  categoryItems.forEach(item => {
    item.addEventListener('click', () => {
      const category = item.dataset.category;
      getRecipesByCategory(category);

      // Знімаємо активний клас з усіх категорій
      categoryItems.forEach(categoryItem => {
        categoryItem.classList.remove('active');
        categoryItem.classList.remove('active-category');
      });

      // Додаємо активний клас до обраної категорії
      item.classList.add('active');

      // Знімаємо активний клас з кнопки "All categories"
      allCategoriesButton.classList.remove('active-category');
    });
  });

  // Додаємо обробник події для кнопки "All categories"
  allCategoriesButton.addEventListener('click', () => {
    // Знімаємо активний клас з усіх категорій
    categoryItems.forEach(categoryItem => {
      categoryItem.classList.remove('active');
      categoryItem.classList.remove('active-category');
    });

    // Додаємо активний клас до кнопки "All categories"
    allCategoriesButton.classList.add('active-category');

    getAllRecipes(); // Відображаємо всі рецепти, коли натискаємо на "All categories"
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

// Функція, яка відміняє активність кнопки "All categories"
function resetAllCategoriesButton() {
  allCategoriesButton.classList.remove('active-category');
}

// Отримуємо посилання на всі фільтри окрім "All categories"
const otherFilters = document.querySelectorAll(
  '.category-item:not(#all-categories-button)'
);

// Обробник події для інших фільтрів
otherFilters.forEach(filter => {
  filter.addEventListener('click', () => {
    resetAllCategoriesButton();

    // Знімаємо активний клас з усіх категорій
    otherFilters.forEach(categoryItem => {
      categoryItem.classList.remove('active');
    });

    // Додаємо активний клас до обраної категорії
    filter.classList.add('active');

    const category = filter.dataset.category;
    getRecipesByCategory(category);
  });

  // Додаємо обробник події для активного стану при натисканні на категорію
  filter.addEventListener('click', () => {
    filter.classList.add('active-category');
  });
});

// Отримуємо посилання на кнопку "All categories" і додаємо обробник події для активного стану при ховері
if (allCategoriesButton) {
  allCategoriesButton.addEventListener('mouseover', () => {
    allCategoriesButton.classList.add('active-category');
  });

  allCategoriesButton.addEventListener('mouseout', () => {
    if (!allCategoriesButton.classList.contains('active-category')) {
      allCategoriesButton.classList.remove('active-category');
    }
  });
}

getCategories();
