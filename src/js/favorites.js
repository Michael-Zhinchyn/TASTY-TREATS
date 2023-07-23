const blockForEmpty = document.querySelector('.block-for-empty');
if (blockForEmpty) {
  console.log(blockForEmpty);
}

const localStorageData = localStorage.getItem('inFavorite');
console.log(localStorageData);

const viewFavoriteCard = () => {
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

