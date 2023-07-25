import Notiflix from 'notiflix';
import axios from 'axios';
import _ from 'lodash';

const searchInput = document.querySelector('#id-input-search');
const recipeList = document.querySelector('.filter-card-set');
const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

// Функция для выполнения поиска рецептов
async function searchRecipes() {
  // Получаем значение поискового поля с удаленными пробелами в начале и конце
  const searchTerm = searchInput.value.trim();

  // Выполняем поиск рецептов только если есть поисковый запрос
  if (searchTerm !== "") {
    try {
      const response = await axios.get(API_URL, {
        params: { search: searchTerm.toLowerCase() },
      });

      const recipes = response.data;

      // Очищаем список рецептов перед отрисовкой новых
      recipeList.innerHTML = '';

      if (recipes.length > 0) {
        recipes.forEach((recipe) => {
          // Генерируем и добавляем карточку рецепта в список
          const recipeCard = generateRecipeCard(recipe);
          recipeList.appendChild(recipeCard);
        });
      } else {
        // Если рецепты не найдены, выводим сообщение об этом с помощью Notiflix
        Notiflix.Report.failure("Нет рецептов, соответствующих поисковому запросу!");
      }
    } catch (error) {
      // Обработка ошибок при запросе к серверу
      console.error("Ошибка при получении рецептов:", error);
      Notiflix.Report.failure("Ошибка при получении рецептов!");
    }
  } else {
    // Если поисковый запрос пустой, очищаем список рецептов
    recipeList.innerHTML = '';
  }
}

// Обработчик события ввода для поискового поля с задержкой в 300 мс
searchInput.addEventListener("input", _.debounce(async () => {
  await searchRecipes();
}, 300));

// Обработчик события клавиши "Escape" и "Enter"
searchInput.addEventListener('keydown', (event) => {
  if (event.key === 'Escape' || event.key === 'Enter') {
    // Останавливаем действие по умолчанию, чтобы избежать перезагрузки страницы при нажатии Enter
    event.preventDefault();
    
    // Выполняем поиск рецептов
    searchRecipes();
  }
});