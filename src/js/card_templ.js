export function createCard(data) {
     changeColorOfStars();
    return data
        .map(({
            title, preview, description, rating,
        }) => `<div class="card">

    <img src="${preview}"  alt="${title}"  class="card-img">

    <p class="card-title">
        ${title}
    </p>

    <p class="card-description">${description}</</p>

    <div class="card-starbtn">

        <p class="card-raiting">"${rating}</</p>

        <div class="card-raitingstars">
            <svg width="18" height="18">
                <use href="/src/img/symbol-defs.svg#icon-Star" class="card-star"></use>
            </svg>
            <svg width="18" height="18">
                <use href="/src/img/symbol-defs.svg#icon-Star" class="card-star"></use>
            </svg>
            <svg width="18" height="18">
                <use href="/src/img/symbol-defs.svg#icon-Star" class="card-star"></use>
            </svg>
            <svg width="18" height="18">
                <use href="/src/img/symbol-defs.svg#icon-Star" class="card-star"></use>
            </svg>
            <svg width="18" height="18">
                <use href="/src/img/symbol-defs.svg#icon-Star" class="card-star"></use>
            </svg>
        </div>

        <button type="button" class="card-button">See recipe</button>

    </div>

    <div class="heard">
        <label for="police-checkbox" class="heard-label">
            <input name="accept" type="checkbox" class="heard-acc" id="police-checkbox" />
            <svg class="card-heard" width="18" height="18">
                <use href="/src/img/symbol-defs.svg#icon-heart"></use>
            </svg>

    </div>

</div>`).join('');
}

function changeColorOfStars() {
  let icons = document.querySelectorAll('.card-star');
    let stars = document.querySelector('.card-raiting');
  for (let i = 0; i < icons.length; i += 1) {
    if (i < stars) {
      icons[i].style.fill = '#ffa500';
    } else {
      icons[i].style.fill = '#ffffff1a';
    }
  }
}

