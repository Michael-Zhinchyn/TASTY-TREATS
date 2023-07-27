import axios from 'axios';

// constants
const BASE_INGREDIENTS_URL =
  'https://tasty-treats-backend.p.goit.global/api/ingredients';
const BASE_AREA_URL = 'https://tasty-treats-backend.p.goit.global/api/areas';
const timeSelect = document.getElementById('select-time');
const areaSelect = document.getElementById('select-area');
const ingredientSelect = document.getElementById('select-Ingredients');

// functions
async function fetchUrl(BASE_URL) {
  try {
    const data = await axios.get(BASE_URL).then(response => response.data);
    return data;
  } catch (err) {
    return err;
  }
}

async function fillIngredientSelect(BASE_URL, selector) {
  if (!selector) return;
  const arrayOptions = await fetchUrl(BASE_URL);
  const options = arrayOptions.flatMap(({ _id, name }) => {
    const option = document.createElement('option');
    option.value = _id;
    option.textContent = name;
    return option;
  });
  return selector.append(...options);
}

async function fillAreaSelect(BASE_URL, selector) {
  if (!selector) return;
  const arrayOptions = await fetchUrl(BASE_URL);
  const options = arrayOptions.flatMap(({ _id, name }) => {
    const option = document.createElement('option');
    option.value = name;
    option.textContent = name;
    return option;
  });
  return selector.append(...options);
}

(function () {
  if (!timeSelect) return;
  let options = [];
  for (let i = 5; i <= 120; i += 5) {
    const option = document.createElement('option');
    option.value = i;
    option.textContent = i;
    options.push(option);
  }
  return timeSelect.append(...options);
})();

if (areaSelect) {
  fillAreaSelect(BASE_AREA_URL, areaSelect);
}

if (ingredientSelect) {
  fillIngredientSelect(BASE_INGREDIENTS_URL, ingredientSelect);
}
