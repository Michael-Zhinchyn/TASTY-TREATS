
import axios, { all } from 'axios';
import {addToFavorite} from './add-to-favorites';
import { filter } from 'lodash';


// URL нашого API
export const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes';

// SVG-коди зірок та сердець
const starIconGrey = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
const starIconOrange = `<svg class="icon-star" width="18" height="18" viewBox="0 0 14 13"><path fill="orange" d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;

// SVG-коди сердець
const heartIconGrey = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd" d="M10.9938 4.70783C9.16102 2.5652 6.10481 1.98884 3.80851 3.95085C1.51221 5.91285 1.18893 9.19323 2.99222 11.5137C4.49154 13.443 9.029 17.5121 10.5161 18.8291C10.6825 18.9764 10.7657 19.0501 10.8627 19.0791C10.9474 19.1043 11.0401 19.1043 11.1248 19.0791C11.2218 19.0501 11.305 18.9764 11.4714 18.8291C12.9585 17.5121 17.496 13.443 18.9953 11.5137C20.7986 9.19323 20.5148 5.89221 18.179 3.95085C15.8432 2.00948 12.8265 2.5652 10.9938 4.70783Z" stroke="#F8F8F8" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"/>
</svg>`;

const heartIconRed = `<svg xmlns="http://www.w3.org/2000/svg" width="22" height="22" viewBox="0 0 22 22" fill="none">
  <path fill-rule="evenodd" clip-rule="evenodd" d="M10.9937 4.70783C9.16096 2.5652 6.10475 1.98884 3.80845 3.95085C1.51215 5.91285 1.18887 9.19323 2.99216 11.5137C4.49148 13.443 9.02894 17.5121 10.5161 18.8291C10.6825 18.9764 10.7656 19.0501 10.8627 19.0791C10.9474 19.1043 11.04 19.1043 11.1247 19.0791C11.2218 19.0501 11.305 18.9764 11.4713 18.8291C12.9585 17.5121 17.4959 13.443 18.9952 11.5137C20.7985 9.19323 20.5147 5.89221 18.179 3.95085C15.8432 2.00948 12.8264 2.5652 10.9937 4.70783Z" fill="#F8F8F8"/>
</svg>`;

export const recipesContainer = document.querySelector('.filter-card-set');

// Функція, що генерує HTML-блок з іконкою серця
function generateHeartBlock(id) {
  return `
    <div class="heart-block">
      <input type="checkbox" class="card-checkbox" id="card-checkbox-${id}" aria-label="card-checkbox-${id}" />
      <label for="card-checkbox-${id}" class="card-checkbox-label">
        <span class="unchecked-heart">${heartIconGrey}</span>
        <span class="checked-heart">${heartIconRed}</span>
      </label>
    </div>`;
}

// Функція, що генерує HTML-код зірок на основі рейтингу рецепту
export function generateStars(rating) {
  let stars = '';
  let roundedRating = Math.round(rating);
  for (let i = 0; i < 5; i++) {
    stars += i < roundedRating ? starIconOrange : starIconGrey;
  }
  return stars;
}

// Функція, що генерує HTML-код для карточки рецепту
export function generateRecipeCard(recipe) {
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
            <p class="card-rating">${recipe.rating.toFixed(1)}</p>
            <div class="eating-stars">${generateStars(recipe.rating)}</div>
          </div>
          <button class="card-button" data-id="${
            recipe._id
          }">See recipe</button>
        </div>
      </div>
    </li>`;
}

// Функція, що отримує рецепти з API та додає їх на сторінку з пагінацією
let cardsPerPage;
let pageNumb = 1;
export async function getAllRecipes() {
  if (window.innerWidth < 768) {
    cardsPerPage = 6;
  } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
    cardsPerPage = 8;
  } else {
    cardsPerPage = 9;
  }

  try {
    const response = await axios.get(`${API_URL}`, {
      params: { limit: cardsPerPage, page: pageNumb },
    });
    const { results } = response.data;

    // Створюємо карточки рецептів та додаємо їх на сторінку
    const recipeCards = results.map(generateRecipeCard).join('');
    if (recipesContainer) {
      recipesContainer.innerHTML = recipeCards;
    }
console.log(cardsPerPage)
    addToFavorite();
  } catch (error) {
    console.log(error);
  }
}

export async function getRecipesByCategory(category) {
  const API_URL = `https://tasty-treats-backend.p.goit.global/api/recipes?category=${category}&limit=${cardsPerPage}&page=${pageNumb}`;
  
  try {
 
    const response = await axios.get(API_URL);
    const { results } = response.data;
    renderRecipes(results);
    const heartCheckBoxEl = document.querySelectorAll('.card-checkbox'); // масив усіх інпутів чекбоксів

    let selectedHeartCheckBox = [];

    // Функція для обробки зміни стану чекбоксів

    function handleCheckboxChange(event) {
      const checkbox = event.target; // елемент на який клікаємо <input>

      const checkboxId = checkbox.id;

      // дістати всю інформацію з картки за запушити її у масив

      if (checkbox.checked) {
        selectedHeartCheckBox.push(checkboxId);
      } else {
        // Перевіряємо, чи елемент міститься у списку вибраних перед тим, як його видалити
        const index = selectedHeartCheckBox.indexOf(checkboxId);
        if (index !== -1) {
          selectedHeartCheckBox.splice(index, 1);
        }
      }

      // console.log(selectedHeartCheckBox); // правильно виводиться масив з даними

      const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeartCheckBox);
      localStorage.setItem('inFavorite', heartCheckBoxElLocalStorage);
    }

    // Додаємо обробник подій для кожного чекбокса
    heartCheckBoxEl.forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });

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
        }
      });
    }
   
  } catch (error) {
    console.log(error);
  }
}


//////Кнопки-перемикачі сторінок/////
const backToFirstPage = document.querySelector('#pag-btn-start');
const pageOneBtn = document.querySelector('#pag-btn-1');
export const pageTwoBtn = document.querySelector('#pag-btn-2');
const pageThreeBtn = document.querySelector('#pag-btn-3');
const lastPageBtn = document.querySelector('#pag-btn-last');
const nextPagePagBtn = document.querySelector('#pag-btn-next');
const buttonNumered = document.querySelectorAll('.pag-btn-number');
const previousPageButton = document.querySelector('#pag-btn-prev');
const allCategoriesButton = document.getElementById('all-categories-button');

function changeButtonColor() {
  buttonNumered.forEach(button => {
    const pageNum = parseInt(button.textContent);
    if (pageNum === pageNumb) {
      button.classList.add('pag-btn-on-hover');
    } else {
      button.classList.remove('pag-btn-on-hover');
    }
  });
}

async function loadPage(page) {
  let category="";   
  let categoryActive = document.querySelectorAll(".category-item")
  categoryActive.forEach(categoryListItem=>{
    if (categoryListItem.classList.contains("active")) {
     category=categoryListItem.firstElementChild.textContent;
      console.log(category)  
          }    
  })
  pageNumb = page
  console.log(pageNumb);
  try {
    const response = await axios.get(`https://tasty-treats-backend.p.goit.global/api/recipes?category=${category}&limit=${cardsPerPage}&page=${pageNumb}`);

    console.log(response.data);
    const { results } = response.data;
    // Створюємо карточки рецептів та додаємо їх на сторінку
    const recipeCards = results.map(generateRecipeCard).join('');
    if (recipesContainer) {
      recipesContainer.innerHTML = recipeCards; }
      changeButtonColor();
      addToFavorite();
  } catch (error) {
      console.log(error);
    }
  }
  window.addEventListener('load', async () => {
    if (window.innerWidth < 768) {
      cardsPerPage = 6;
    } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
      cardsPerPage = 8;
    } else {
      cardsPerPage = 9;
    }
    await loadPage(pageNumb);
  });

export const backToFirst = async () => {
  pageNumb = 1
 try{ await loadPage( pageNumb )
    pageOneBtn.textContent = 1;
    pageTwoBtn.textContent = 2;
    pageThreeBtn.textContent = 3;

  } catch (error) {
    console.log(error);
  }
};

////Функція яка включає першу сторінку рецептів/////
const loadfirstPage = async () => {
  pageNumb = parseInt(pageOneBtn.textContent)
    try{ await loadPage(pageNumb)
      
     } catch (error) {
       console.log(error);
     }
   };
//  
////Функція яка включає 2 сторінку рецептів/////

 export async function loadPageTwo()
  {
    pageNumb = parseInt(pageTwoBtn.textContent)
      try{ await loadPage(pageNumb)
        
       } catch (error) {
         console.log(error);
       }
     };

//  
////Функція яка включає на 3 сторінку рецептів/////
async function loadPageThree(){
    pageNumb = parseInt(pageThreeBtn.textContent)
      try{ await loadPage(pageNumb)
        
       } catch (error) {
         console.log(error);
       }
     };
// 
////Функція яка перемикає на наступну сторінку рецептів/////
const loadNextPage = async () => 
{  
  buttonNumered.forEach(button => {
    button.textContent++
    // pageNumb=button.textContent
  });
  const nextPage = pageNumb + 1;
    try{ await loadPage(nextPage)
      
     } catch (error) {
       console.log(error);
     }
   };
 
////Функція яка повертає на попередню сторінку рецептів/////
async function loadPrevPage(){  
    if (pageOneBtn.textContent!="1") { buttonNumered.forEach(button => {
      button.textContent--
      // pageNumb=button.textContent
    })};
    const prevPage = pageNumb - 1;
      try{await loadPage(prevPage)
      
       } catch (error) {
         console.log(error);
       }
     };
////Функція яка повертає на останню сторінку рецептів/////
const loadLastPage = async () => {
  if (window.innerWidth < 768) {
    pageNumb=48
  } else if (window.innerWidth >= 768 && window.innerWidth < 1200) {
    pageNumb=36
  } else {
    pageNumb=32
  }
  try{ await loadPage(pageNumb)

  pageThreeBtn.textContent=pageNumb

  pageTwoBtn.textContent=pageNumb-1
  pageOneBtn.textContent=pageNumb-2
//    }
   } catch (error) {
     console.log(error);
   }
 };
//   
// ---------------------------------------------------------------------------------------------------------------------------------------

backToFirstPage.addEventListener('click', backToFirst);
pageOneBtn.addEventListener('click', loadfirstPage);
pageTwoBtn.addEventListener('click', loadPageTwo);
pageThreeBtn.addEventListener('click', loadPageThree);
lastPageBtn.addEventListener('click', loadLastPage);
previousPageButton.addEventListener('click', loadPrevPage);
nextPagePagBtn.addEventListener('click', loadNextPage);

function renderRecipes(recipes) {
  const recipeCards = recipes.map(generateRecipeCard).join('');
  recipesContainer.innerHTML = recipeCards;
}

