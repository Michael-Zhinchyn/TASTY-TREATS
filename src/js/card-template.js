// let heartBlock = `
// <div class="heart-block">
//     <input type="checkbox" class="card-checkbox" id="card-checkbox1" />
//     <label for="card-checkbox1" class="card-checkbox-label">
//         <!-- Unchecked icon -->
//         <svg class="icon-unchecked" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
//             viewBox="0 0 22 22" fill="none">
//             <path opacity="0.5" fill-rule="evenodd" clip-rule="evenodd"
//                 d="M10.9944 4.70783C9.16163 2.5652 6.10542 1.98884 3.80912 3.95085C1.51282 5.91285 1.18954 9.19323 2.99283 11.5137C4.49215 13.443 9.02961 17.5121 10.5167 18.8291C10.6831 18.9764 10.7663 19.0501 10.8633 19.0791C10.948 19.1043 11.0407 19.1043 11.1254 19.0791C11.2224 19.0501 11.3056 18.9764 11.472 18.8291C12.9591 17.5121 17.4966 13.443 18.9959 11.5137C20.7992 9.19323 20.4759 5.91285 18.1796 3.95085C15.8439 2.00948 12.8271 2.5652 10.9944 4.70783Z"
//                 stroke="#F8F8F8" stroke-width="2" stroke-linecap="round"
//                 stroke-linejoin="round" />
//         </svg>
//         <!-- Checked icon -->
//         <svg class="icon-checked" xmlns="http://www.w3.org/2000/svg" width="22" height="22"
//             viewBox="0 0 22 22" fill="none">
//             <path fill-rule="evenodd" clip-rule="evenodd"
//                 d="M10.9944 4.70783C9.16163 2.5652 6.10542 1.98884 3.80912 3.95085C1.51282 5.91285 1.18954 9.19323 2.99283 11.5137C4.49215 13.443 9.02961 17.5121 10.5167 18.8291C10.6831 18.9764 10.7663 19.0501 10.8633 19.0791C10.948 19.1043 11.0407 19.1043 11.1254 19.0791C11.2224 19.0501 11.3056 18.9764 11.472 18.8291C12.9591 17.5121 17.4966 13.443 18.9959 11.5137C20.7992 9.19323 20.5154 5.89221 18.1796 3.95085C15.8439 2.00948 12.8271 2.5652 10.9944 4.70783Z"
//                 fill="#F8F8F8" />
//         </svg>
//     </label>
// </div>
// `;

// function generateMarkup(data, heartBlock) {
//   let markup = `
//     <div class="card-block">
//         <li class="card-item">
//             <img class="card-image" src="${data.imgSrc}" alt="${data.imgAlt}">
//             ${heartBlock}
//             <div class="card-content">
//                 <h3 class="card-heading">${data.heading}</h3>
//                 <p class="card-description">${data.description}</p>
//             </div>
//             <div class="card-bottom">
//                 <div class="card-rating">${data.rating}</div>
//                 <button class="card-button">See recipe</button>
//             </div>
//         </li>
//     </div>
//     `;

//   return markup;
// }

// // тепер ви можете використати цю функцію для генерування розмітки
// let data = {
//   imgSrc: 'path/to/image.jpg',
//   imgAlt: 'Image description',
//   heading: 'Heading of the card',
//   description: 'Description of the card',
//   rating: 4.5,
// };

// let markup = generateMarkup(data, heartBlock);
