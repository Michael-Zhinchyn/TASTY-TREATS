// import axios from 'axios'
// import { generateRecipeCard, getAllRecipes, generateHeartBlock, generateStars} from './all-cards-api';
// const API_URL = 'https://tasty-treats-backend.p.goit.global/api/recipes'
//     // const seeRecipeButtons = recipesContainer.querySelectorAll('.card-button');
//     // seeRecipeButtons.forEach(button => {
//     //   button.addEventListener('click', event => {
//     //     const buttonElement = event.target.closest('.card-button');
//     //     const recipeId = buttonElement.getAttribute('data-id');

//     //     console.log('Recipe ID:', recipeId);
//     //     console.log(results);

//     //     getRecipe(recipeId);
//     //   });
//     // });
    
//     console.log(`${API_URL}`)
//     let cardsPerPage;
// let pageNumb = 1 ;
//  async function getAllRecipesWithOptions() {

  
//     if (window.innerWidth < 768) {
//       cardsPerPage = 6;
//     } else if(window.innerWidth >= 768 && window.innerWidth < 1200 ) {
//       cardsPerPage = 8;
//     } 
//    else {
//       cardsPerPage = 9;}
  
//     try {
//       const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
//         page: pageNumb
//       }})
//     console.log(response.data)
//     const { results } = response.data;
//   // Створюємо карточки рецептів та додаємо їх на сторінку
//   const recipeCards = results.map(generateRecipeCard).join('');
//   const recipesContainer = document.querySelector('.filter-card-set');
//   recipesContainer.innerHTML = recipeCards}
//     catch (error) {
//       console.log(error);
//     }

// }

// getAllRecipesWithOptions()
// const pageOneBtn = document.querySelector("#pag-btn-1")
// const pageTwoBtn = document.querySelector("#pag-btn-2")
// const pageThreeBtn = document.querySelector("#pag-btn-3")

// // const loadfirstPages = async()=>{
// //   pageNumb = 1;
// //   try {
// //     const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
// //       page: pageNumb
// //     }})
// //   console.log(response.data)
// //   const { results } = response.data;
// //   // Створюємо карточки рецептів та додаємо їх на сторінку
// //   const recipeCards = results.map(generateRecipeCard).join('');
// //   const recipesContainer = document.querySelector('.filter-card-set');
// //   recipesContainer.innerHTML = recipeCards}
// //   catch (error) {
// //     console.log(error);
// //   }}
// const loadPageAccordingToBtnNumb = async()=>{
//     pageNumb = pageTwoBtn.textContent;
//     try {
//       const response = await axios.get(`${API_URL}`, {params:{ limit: cardsPerPage,
//         page: pageNumb
//       }})
//     console.log(response.data)
//     const { results } = response.data;
//     // Створюємо карточки рецептів та додаємо їх на сторінку
//     const recipeCards = results.map(generateRecipeCard).join('');
//     const recipesContainer = document.querySelector('.filter-card-set');
//     recipesContainer.innerHTML = recipeCards}
//     catch (error) {
//       console.log(error);
//     }}
//         // ---------------------------------------------------------------------------------------------------------------------------------------
//         pageTwoBtn.addEventListener("click", getAllRecipesWithOptions)
//         pageTwoBtn.addEventListener("click", loadPageAccordingToBtnNumb)
//         pageThreeBtn.addEventListener("click", loadPageAccordingToBtnNumb)
//     // getAllRecipes();
  
//     getAllRecipes()