import axios from 'axios';
import { generateRecipeCard } from './all-cards-api';
import { remove } from 'lodash';

let storedData = localStorage.getItem('inFavorite');
let actualIDs = [];
if (storedData) {
  let fullIDs = JSON.parse(storedData);
  actualIDs = fullIDs.map(id => id.replace('card-checkbox-', ''));
}

const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

export const favoritesContainer = document.querySelector('.favorite-card-list');

async function addFavoriteRecipe(id) {
  try {
    const response = await axios.get(`${API_URL}/${id}`);
    const recipe = response.data;

    const recipeCard = generateRecipeCard(recipe);

    if (favoritesContainer) {
      const messageBlock = document.querySelector('.block-for-empty');
      messageBlock.style.display = 'none';
      favoritesContainer.innerHTML += recipeCard;

      // -----------------------------------------------------------------------------
      // // Зміна стилів для Favorite для планшетки
      // const allLiEl = favoritesContainer.querySelectorAll('li');
      // console.log(allLiEl);
      // allLiEl.forEach(liEl => {
      //   liEl.style.width = '224px';
      //   liEl.style.height = '224px';
      // })

      // const cardImgsEl = document.querySelectorAll('.card-image');
      // console.log(cardImgsEl);
      // cardImgsEl.forEach(cardImg => {

      //   cardImg.style.setProperty('width', '224px', 'important');
      //   cardImg.style.setProperty('height', '224px', 'important');
      // })

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

      // -----------------------------------------------------------------------------
    }
  } catch (error) {
    console.log(error);
  }
}

function loadFavoriteRecipes() {
  if (actualIDs) {
    actualIDs.forEach(id => {
      addFavoriteRecipe(id);
    });
  }
}

loadFavoriteRecipes();

// import axios from 'axios';
// // Якщо функції `generateHeartBlock` та `generateStars` визначені в іншому файлі:
// import { generateHeartBlock, generateStars } from './all-cards-api';

// let storedData = localStorage.getItem('inFavorite');
// let actualIDs = [];
// if (storedData) {
//   let fullIDs = JSON.parse(storedData);
//   actualIDs = fullIDs.map(id => id.replace('card-checkbox-', ''));
//   console.log(actualIDs);
// }

// const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

// const favoritesContainer = document.querySelector('.favorite-card-list');

// async function addFavoriteRecipe(id) {
//   try {
//     const response = await axios.get(`${API_URL}/${id}`);
//     const recipe = response.data;

//     console.log(recipe);

//     const recipeCard = generateFavoriteRecipeCard(recipe);

//     if (favoritesContainer) {
//       const messageBlock = document.querySelector('.block-for-empty');
//       messageBlock.style.display = 'none';
//       favoritesContainer.innerHTML += recipeCard;
//     }
//   } catch (error) {
//     console.log(error);
//   }
// }

// // Тут ми створюємо нову функцію, що генерує HTML для карточки рецепту в розділі "Улюблені"
// function generateFavoriteRecipeCard(recipe) {
//   // Перевіряємо, чи є рецепт в списку улюблених
//   const isFavorite = actualIDs.includes(recipe._id) ? 'checked' : '';

//   // модифікований HTML-код карточки
//   return `
//     <li class="favorite-card-item card-item">
//       <div class="card-block">
//         <img class="card-image" src="${recipe.preview}" alt="${
//     recipe.title
//   }" width="335px">
//         ${generateHeartBlock(recipe._id)}
//         <div class="card-content">
//           <h3 class="card-heading">${recipe.title}</h3>
//           <p class="card-description">${recipe.description}</p>
//         </div>
//         <div class="card-bottom">
//           <div class="card-rating-block">
//             <p class="card-rating">${recipe.rating}</p>
//             <div class="eating-stars">${generateStars(recipe.rating)}</div>
//           </div>
//           <button class="card-button" data-id="${
//             recipe._id
//           }">See recipe</button>
//         </div>
//       </div>
//       <input type="checkbox" id="card-checkbox-${recipe._id}" ${isFavorite}>
//     </li>`;
// }

// function loadFavoriteRecipes() {
//   if (actualIDs) {
//     actualIDs.forEach(id => {
//       addFavoriteRecipe(id);
//     });
//   }
// }

// loadFavoriteRecipes();
