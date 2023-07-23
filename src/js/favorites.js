import { getAllRecipes } from './all-cards-api';
import { generateRecipeCard } from './all-cards-api';

const blockForEmpty = document.querySelector('.block-for-empty'); // дів у який будемо вставляти картки

const localStorageData = localStorage.getItem('inFavorite');
// console.log(localStorageData);

const viewFavoriteCard = async () => {
  try {
    if (localStorageData) {
      const favoritesArray = JSON.parse(localStorageData);


      if (favoritesArray.length === 0) {
        blockForEmpty.style.display = 'flex';
      } else {
        blockForEmpty.style.display = 'none';
      }
    }
  } catch (error) {
    console.log(error);
  }
};

viewFavoriteCard();




