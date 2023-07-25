import axios from 'axios';

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
export async function getAllRecipes() {
  try {
    const response = await axios.get(API_URL);
    const { results } = response.data;
    // Створюємо карточки рецептів та додаємо їх на сторінку
    const recipeCards = results.map(generateRecipeCard).join('');
    if (recipesContainer) {
      recipesContainer.innerHTML = recipeCards;
    }

    // ---------------------------------------------------------------------------------------------------------------------------------------
    const heartCheckBoxEl = document.querySelectorAll('.card-checkbox'); // масив усіх інпутів чекбоксів

    let selectedHeartCheckBox = [];

    // Функція для обробки зміни стану чекбоксів

    function handleCheckboxChange(event) {
      const checkbox = event.target; // елемент на який клікаємо <input>

      // console.log(checkbox);

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

export async function getRecipesByCategory(category) {
  const API_URL = `https://tasty-treats-backend.p.goit.global/api/recipes?category=${category}`;
  try {
    const response = await axios.get(API_URL);
    const { results } = response.data;
    renderRecipes(results);
  } catch (error) {
    console.log(error);
  }
}


/////Pagination///////////
let categor
let cardsPerPage;
let pageNumb = 1 ;
export async function getAllRecipesWithOptions() {
categor="Chicken"
  
    if (window.innerWidth < 768) {
      cardsPerPage = 6;
    } else if(window.innerWidth >= 768 && window.innerWidth < 1200 ) {
      cardsPerPage = 8;
    } 
   else {
      cardsPerPage = 9;}
  
    try {
      const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
        page: pageNumb,
        category: categor
      }})
    console.log(response.data)
    const { results } = response.data;
console.log({results})
    
  // Створюємо карточки рецептів та додаємо їх на сторінку
  const recipeCards = results.map(generateRecipeCard).join('');
  const recipesContainer = document.querySelector('.filter-card-set');
  recipesContainer.innerHTML = recipeCards}
    catch (error) {
      console.log(error);
    }
}
getAllRecipesWithOptions()
//////Кнопки-перемикачі сторінок/////
const backToFirstPage = document.querySelector("#pag-btn-start")
const pageOneBtn = document.querySelector("#pag-btn-1")
const pageTwoBtn = document.querySelector("#pag-btn-2")
const pageThreeBtn = document.querySelector("#pag-btn-3")
const lastPageBtn= document.querySelector("#pag-btn-last")
const nextPagePagBtn=document.querySelector("#pag-btn-next")
const buttonNumered= document.querySelectorAll(".pag-btn-number")
const previousPageButton = document.querySelector("#pag-btn-prev")
// buttonNumered.forEach((button, index) => {
//   console.log(`Індекс ${index}, значення ${button.textContent}`);
// })
// console.log(buttonNumered)

////Функція яка повертає на першу сторінку рецептів/////
const  backToFirst = async()=>{
  pageNumb=1;
  console.log(pageNumb)
  try {
    const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
      page: pageNumb,
      // category: `${category}`
    }})
    pageOneBtn.textContent=1;
    pageTwoBtn.textContent=2;
    pageThreeBtn.textContent=3;
  console.log(response.data)
  const { results } = response.data;
  // Створюємо карточки рецептів та додаємо їх на сторінку
  const recipeCards = results.map(generateRecipeCard).join('');
  const recipesContainer = document.querySelector('.filter-card-set');
  recipesContainer.innerHTML = recipeCards}
  catch (error) {
    console.log(error);
  }}


// const loadPageAccordingToBtnNumb = async()=>{
// // pageNumb = pageTwoBtn.textContent;
// ;
// buttonNumered.forEach((button, index) => {
//   console.log(`Індекс ${index}, значення ${button.textContent}`);
//   pageNumb = button.textContent
// })
// console.log(pageNumb)
// try {
//   const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
//     page: pageNumb
//   }})
// console.log(response.data)
// const { results } = response.data;
// // Створюємо карточки рецептів та додаємо їх на сторінку
// const recipeCards = results.map(generateRecipeCard).join('');
// const recipesContainer = document.querySelector('.filter-card-set');
// recipesContainer.innerHTML = recipeCards}
// catch (error) {
//   console.log(error);
// }}

////Функція яка включає першу сторінку рецептів/////
const  loadfirstPage = async()=>{
  pageNumb=pageOneBtn.textContent;
  console.log(pageNumb)
  try {
    const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
      page: pageNumb
    }})
 
  console.log(response.data)
  const { results } = response.data;
  // Створюємо карточки рецептів та додаємо їх на сторінку
  const recipeCards = results.map(generateRecipeCard).join('');
  const recipesContainer = document.querySelector('.filter-card-set');
  recipesContainer.innerHTML = recipeCards}
  catch (error) {
    console.log(error);
  }}

////Функція яка включає 2 сторінку рецептів/////
const loadPageTwo = async()=>{
  pageNumb = pageTwoBtn.textContent;

  console.log(pageNumb)
  try {
    const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
      page: pageNumb
    }})
  console.log(response.data)
  const { results } = response.data;
  // Створюємо карточки рецептів та додаємо їх на сторінку
  const recipeCards = results.map(generateRecipeCard).join('');
  const recipesContainer = document.querySelector('.filter-card-set');
  recipesContainer.innerHTML = recipeCards}
  catch (error) {
    console.log(error);
  }}
////Функція яка включає на 3 сторінку рецептів/////
const loadPageThree = async()=>{
  pageNumb = pageThreeBtn.textContent;
  try {
    const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
      page: pageNumb
    }})
  console.log(response.data)
  const { results } = response.data;
  // Створюємо карточки рецептів та додаємо їх на сторінку
  const recipeCards = results.map(generateRecipeCard).join('');
  const recipesContainer = document.querySelector('.filter-card-set');
  recipesContainer.innerHTML = recipeCards}
  catch (error) {
    console.log(error);
  }}
////Функція яка перемикає на наступну сторінку рецептів/////
const loadNextPage = async()=>{
  buttonNumered.forEach(button => {
button.textContent++
      });
  pageNumb = pageOneBtn.textContent;
  try {
    const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
      page: pageNumb
    }})
  console.log(response.data)
  const { results } = response.data;
  // Створюємо карточки рецептів та додаємо їх на сторінку
  const recipeCards = results.map(generateRecipeCard).join('');
  const recipesContainer = document.querySelector('.filter-card-set');
  recipesContainer.innerHTML = recipeCards}
  catch (error) {
    console.log(error);
  }}



////Функція яка повертає на останню сторінку рецептів/////
  const loadLastPage = async()=>{
let allPages;
console.log(allPages)
const pagesAmount = allPages/Number(cardsPerPage)
pageNumb = pagesAmount;
console.log(pageNumb)
    try {
   
          const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
        page: pageNumb,
     totalPages: allPages,
      }})
    console.log(response.data)
    
        const { results } = response.data;
   
    // Створюємо карточки рецептів та додаємо їх на сторінку
    const recipeCards = results.map(generateRecipeCard).join('');
    const recipesContainer = document.querySelector('.filter-card-set');
    recipesContainer.innerHTML = recipeCards}
    catch (error) {
      console.log(error);
    }}

    ////Функція яка повертає на попередню сторінку рецептів/////
    const loadPrevPage = async()=>{
      buttonNumered.forEach(button => {
    button.textContent--
          });
      pageNumb = pageThreeBtn.textContent;
      console.log(pageNumb)
      try {
        const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
          page: pageNumb
        }})
      console.log(response.data)
      const { results } = response.data;
      // Створюємо карточки рецептів та додаємо їх на сторінку
      const recipeCards = results.map(generateRecipeCard).join('');
      const recipesContainer = document.querySelector('.filter-card-set');
      recipesContainer.innerHTML = recipeCards}
      catch (error) {
        console.log(error);
      }}
    // ---------------------------------------------------------------------------------------------------------------------------------------
    nextPagePagBtn.addEventListener("click", loadNextPage)
    backToFirstPage.addEventListener("click", backToFirst)
    pageOneBtn.addEventListener("click", loadfirstPage )
    pageTwoBtn.addEventListener("click", loadPageTwo)
    pageThreeBtn.addEventListener("click", loadPageThree)
    lastPageBtn.addEventListener("click", loadLastPage)
    previousPageButton.addEventListener("click", loadPrevPage)
// getAllRecipes();
// getAllRecipesWithOptions()
=======
function renderRecipes(recipes) {
  const recipeCards = recipes.map(generateRecipeCard).join('');
  recipesContainer.innerHTML = recipeCards;
}

