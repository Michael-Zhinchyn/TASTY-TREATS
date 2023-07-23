import Notiflix from 'notiflix';
import { Notify } from 'notiflix/build/notiflix-notify-aio';

const searchInput = document.querySelector('#id-input-search');
const searchIcon = document.querySelector('.search-icon');
const recipesData = []

// import { createCard } from './make_card';

function showRecipeCards() {
    const recipeCardsContainer = document.querySelector('.filter-card-set');
    recipeCardsContainer.innerHTML = createCard(recipesData);
};

// Функция для поиска карточек по заданному тексту
function searchRecipeCards(searchText) {

    const filterCards = recipesData.filter(recipe => {
        const title = recipe.title.toLowerCase();
        const description = recipe.description.toLowerCase();
        searchText = searchText.toLowerCase();

        return title.includes(searchText) 
     description.includes(searchText);
    });


// Если карточка не найдена, очищается инпут и выводиться оповещение
    if(filterCards.length > 0) {
        recipeCardsContainer.innerHTML = createCard(filterCards);
    }else{
        recipeCardsContainer.innerHTML = '';
        Notiflix.Notify.warning('No recipes found!')
    }
}

// Показываем все карточки рецептов при загрузке страницы
showRecipeCards();

// Поиск по клику на клавишу "Enter" или "Escape"
searchInput.addEventListener('keypress', e => {
    if (e.key === 'Enter') {
        const searchText = e.target.value;
        searchRecipeCards(searchText);
    }
});

// Поиск по клику на иконку поиска
searchIcon.addEventListener('click', () => {
    const searchText = searchInput.value;
    searchRecipeCards(searchText);
});