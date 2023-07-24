import { generateRecipeCard, getAllRecipes } from './all-cards-api.js';

const blockForEmpty = document.querySelector('.block-for-empty'); // дів з іконкою
const blockFilterCardSet = document.querySelector('.filter-card'); // блок в який створюються картки

const localStorageData = localStorage.getItem('inFavorite');

const viewFavoriteCard = async () => {
  try {
    if (localStorageData) {
      const favoritesArray = JSON.parse(localStorageData);// масив id в локалстор

      let newFavoriteCards = ''; // накопичення html карток

      favoritesArray.forEach(favoriteId => {
        const favoriteCardId = favoriteId;// id в локалстор

        newFavoriteCards += generateRecipeCard({
          _id: favoriteCardId,
        });

        blockFilterCardSet.innerHTML = newFavoriteCards;
      });



      generateHeartBlock(id);
      generateStars(rating);
      generateRecipeCard(recipe);
      getAllRecipes()


      
    
      if (favoritesArray.length === 0) {
        blockForEmpty.style.display = 'flex';
        blockFilterCardSet.style.display = 'none';
      } else {
        blockForEmpty.style.display = 'none';
      }
    }
  } catch (error) {
    console.log(error);
  }
};

viewFavoriteCard();
