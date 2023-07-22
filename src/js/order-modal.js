import Notiflix from 'notiflix';
import axios from 'axios';
document.addEventListener('DOMContentLoaded', function () {
  // Весь ваш код JS тут
  const modalOpenBtn = document.getElementById('hero-order-btn');
  const modalCloseBtn = document.getElementById('order-form-close-btn');
  const headerCartIcon = document.getElementById('header-cart-icon');
  const headerCartIconDesktop = document.getElementById('cart-icon-desktop');
  const modalBackdrop = document.getElementById('backdrop');
  const modal = document.getElementById('modal');
  const form = document.querySelector('.order-form');
  const BASE_URL =  "https://tasty-treats-backend.p.goit.global/api"

  if (modalBackdrop) modalBackdrop.style.display = 'none';

  if (headerCartIcon) headerCartIcon.addEventListener('click', modalOpen);
  if (headerCartIconDesktop)
    headerCartIconDesktop.addEventListener('click', modalOpen);
  if (modalOpenBtn) modalOpenBtn.addEventListener('click', modalOpen);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', modalClose);
  if (modalBackdrop) modalBackdrop.addEventListener('click', modalClose);
  if (modal) modal.addEventListener('click', event => event.stopPropagation());
  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      modalClose();
    }
  });

  function modalOpen() {
    if (modalBackdrop) {
      modalBackdrop.style.display = 'block';
      document.body.style.overflow = 'hidden';
    }
  }

  function modalClose() {
    if (form) form.reset();
    if (modalBackdrop) {
      modalBackdrop.style.display = 'none';
      document.body.style.overflow = 'auto';
    }
  }
  

  if (form) form.addEventListener('submit', onSubmit);

  function onSubmit(evt) {
    evt.preventDefault();

    let name = document.getElementById('name').value;
    let phone = document.getElementById('phone').value;
    let email = document.getElementById('email').value;
    let comments = document.getElementById('comments').value;
    const createUser = newUser => axios.post(`${BASE_URL}/orders/add`, newUser)
    createUser({
      name: `${name}`,
      phone: `${phone}`,
      email: `${email}`,
      comment: `${comments}`
    })
    .then(response => {
      console.log(response.data);
    })
    .catch(err => {
      console.log(err);
    });


    Notiflix.Loading.pulse('Sending...');

    setTimeout(() => {
      Notiflix.Loading.remove();
      modalClose();

      setTimeout(() => {
        Notiflix.Notify.success('Your order successfully sent ');
      }, 500);
    }, 1500);
  }
});
