import axios from 'axios';
import Notiflix from 'notiflix';
import { popularRecipList } from './popular-recipes';
import { recipesContainer } from './all-cards-api';
import { favoritesContainer } from './favorites';

// DOM Elements
const recipeBackdrop = document.getElementById('recipe-backdrop');
const recipeCloseBtn = document.getElementById('recipe-close-btn');
const modalRecipeBlock = document.getElementById('full-recipe');
const modalRecipe = document.querySelector('.recipe-modal');
const starIconGrey = `<svg class="icon-star-modal" width="18" height="18" viewBox="0 0 14 13"><path d="M6.049.927c.3-.921 1.603-.921 1.902 0l.845 2.6a1 1 0 0 0 .951.692h2.735c.969 0 1.371 1.24.588 1.809l-2.213 1.607a1 1 0 0 0-.363 1.118l.845 2.601c.3.921-.755 1.688-1.539 1.118l-2.212-1.607a1 1 0 0 0-1.176 0L4.2 12.472c-.784.57-1.838-.197-1.539-1.118l.845-2.6a1 1 0 0 0-.363-1.119L.93 6.028c-.783-.57-.38-1.81.588-1.81h2.735a1 1 0 0 0 .95-.69l.846-2.6Z"/></svg>`;
const backdrop = document.querySelector('.add-rating-backdrop');
const modal = document.querySelector('.add-rating-modal');
const closeModalBtn = document.getElementById('add-rating-close-btn');
const form = document.querySelector('.add-rating-form');
const starChoosed = document.querySelector('.js-rating-choosed');
const starField = document.querySelector('.starability-slot');
const addRatingEmail = document.querySelector('.add-rating-email');

const BASE_RECIPE_URL =
  'https://tasty-treats-backend.p.goit.global/api/recipes/';

let targetId = null;
let stars = null;
let giveRatingBtn = null;
[recipeBackdrop, backdrop].forEach(el => {
  if (el) {
    el.style.display = 'none';
  }
});
// EVENT LISTENERS
if (popularRecipList) {
  popularRecipList.addEventListener('click', handleListClick);
}

if (recipesContainer) {
  recipesContainer.addEventListener('click', handleContainerClick);
}

if (favoritesContainer) {
  favoritesContainer.addEventListener('click', handleFavoritesContainerClick);
}

if (modalRecipe) {
  modalRecipe.addEventListener('click', event => event.stopPropagation());
}
[recipeBackdrop, recipeCloseBtn, closeModalBtn].forEach(el => {
  if (el) {
    el.addEventListener('click', closeRecipe);
  }
});
// Combine all listeners for 'Escape' keydown into one
document.addEventListener('keydown', evt => {
  if (evt.key === 'Escape') {
    closeRecipe();
    onClose();
  }
});
if (starField) {
  starField.addEventListener('click', starRatingChanger);
}
// Combine all listeners for submitRating into one
if (form) {
  form.addEventListener('submit', submitRating);
}
if (closeModalBtn) {
  closeModalBtn.addEventListener('click', onClose);
}
// FUNCTIONS
function handleListClick(event) {
  document.body.style.overflow = 'hidden';
  recipeBackdrop.style.display = 'block';
  modalRecipe.style.display = 'block'
  let targetEl = event.target;
  let listItem = targetEl.closest('li.recip-item');
  if (listItem) {
    let itemId = listItem.id;
    targetId = itemId;
  }
  getRecipe();
}

function handleContainerClick(event) {
  const buttonElement = event.target.closest('.card-button');
  if (!buttonElement) return;
  event.stopPropagation();
  document.body.style.overflow = 'hidden';
  recipeBackdrop.style.display = 'block';
  modalRecipe.style.display = 'block'
  const recipeId = buttonElement.getAttribute('data-id');
  if (recipeId) {
    targetId = recipeId;
  }

  getRecipe();
}

function handleFavoritesContainerClick(event) {
  const buttonElement = event.target.closest('.card-button');
  if (!buttonElement) return;
  event.stopPropagation();
  document.body.style.overflow = 'hidden';
  recipeBackdrop.style.display = 'block';
  modalRecipe.style.display = 'block'

  const recipeId = buttonElement.getAttribute('data-id');
  if (recipeId) {
    targetId = recipeId;
  }
  getRecipe();
}

// Функція для зміни кольору іконок
function changeColorOfStars() {
  let icons = document.querySelectorAll('.icon-star-modal');
  for (let i = 0; i < icons.length; i += 1) {
    if (i < stars) {
      icons[i].style.fill = '#FFA500';
    } else {
      icons[i].style.fill = '#ffffff1a';
    }
  }
}

/// Функція отримання рецепту з API
export async function getRecipe() {
  try {
    const response = await axios.get(`${BASE_RECIPE_URL}${targetId}`);

    const markUp = recipeMarkup(response.data);
    stars = response.data.rating;
    modalRecipeBlock.innerHTML = markUp;
    changeColorOfStars();
    giveRatingBtn = document.getElementById('give-rating');
    if (giveRatingBtn) {
      giveRatingBtn.addEventListener('click', function () {
        backdrop.style.display = 'block';
      });
    }
    return giveRatingBtn;
  } catch (error) {
    console.error(error);
  }
}
// функція створення розмітки
export function recipeMarkup({
  title,
  youtube,
  rating,
  time,
  ingredients,
  tags,
  description,
}) {
  const ingredientsMarkup = `<div class="recipe-ingredients-block">
  ${ingredients
    .map(
      ({ name, measure }) =>
        `<div class="ingredients-wrapper">
      <p class="ingridient-name">${name}</p>
      <p class="ingridient-measure">${measure}</p>
   </div>`
    )
    .join('')}
</div>`;
  const tagsMarkup = tags
    .map(tag => `<div class="recipe-tag">#${tag}</div>`)
    .join('');
  const videoId = youtube.split('=')[1];
  const embedUrl = `https://www.youtube.com/embed/${videoId}`;
  const mq = window.matchMedia('(max-width: 767px)');
  if (mq.matches) {
    return `<div class="recipe-header">
              <iframe class="recipe-video" src="${embedUrl}" frameborder="0"></iframe>
              <h2 class="recipe-heading">${title}</h2>
            </div>
            <div class="rating-block">
              <p class="rating">${rating}</p>
              <div class="eating-stars">${starIconGrey.repeat(5)}</div>
              <p class="time">${time} min</p>
            </div>
            <div class="recipe-ingredients">${ingredientsMarkup}</div>
            <div class="recipe-tags-block">${tagsMarkup}</div>
            <p class="recipe-description">${description}</p>
            <div class="recipe-buttons">
              <button class="add-to-favorite-btn" id="add-to-favorite-btn" type="button"> Add to favorite</button>
              <button class="give-rating-btn" id="give-rating" type="button">Give a rating</button>
            </div>`;
  } else {
    return `<div class="recipe-header">
              <h2 class="recipe-heading">${title}</h2>
            </div>
            <div class="recipe-video">
              <iframe class="recipe-video-frame" src="${embedUrl}" frameborder="0"></iframe>
            </div>
            <div class="recipe-tags-and-rating">
              <div class="recipe-tags-block">${tagsMarkup}</div>
              <div class="rating-block">
                <p class="rating">${rating}</p>
                <div class="eating-stars">${starIconGrey.repeat(5)}</div>
                <p class="time">${time} min</p>
              </div>
            </div>
            <div class="recipe-ingredients">${ingredientsMarkup}</div>
            <p class="recipe-description">${description}</p>
            <div class="recipe-buttons">
              <button class="add-to-favorite-btn" id="add-to-favorite-btn" type="button"> Add to favorite</button>
              <button class="give-rating-btn" id="give-rating" type="button">Give a rating</button>
            </div>`;
  }
}
// MODAL-CLOSING
function closeRecipe() {
  recipeBackdrop.style.display = 'none';
  document.body.style.overflow = 'auto';
}
function starRatingChanger() {
  const selectedRadioButton = starField.querySelector(
    'input[name="rating"]:checked'
  );
  if (selectedRadioButton.value) {
    starChoosed.textContent = `${selectedRadioButton.value}.0`;
  } else {
    starChoosed.textContent = '0.0';
  }
}
function onClose() {
  form.reset();
  backdrop.style.display = 'none';
}
function submitRating(e) {
  const selectedRadioButton = starField.querySelector(
    'input[name="rating"]:checked'
  );
  const mail = addRatingEmail.value;
  // надсилання на бек
  //   axios.post(
  //     `${BASE_URL}/recipes/${id}/${options}`
  //   );
  e.preventDefault();
  Notiflix.Loading.pulse('Sending...');
  setTimeout(() => {
    Notiflix.Loading.remove();
    onClose();
    setTimeout(() => {
      Notiflix.Notify.success(' Thank you for your response ');
    }, 500);
  }, 1500);
}
