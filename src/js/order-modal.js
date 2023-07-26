import Notiflix from 'notiflix';
import axios from 'axios';

document.addEventListener('DOMContentLoaded', function () {
  const modalOpenBtn = document.getElementById('hero-order-btn');
  const modalCloseBtn = document.getElementById('order-form-close-btn');
  const headerCartIcon = document.getElementById('header-cart-icon');
  const headerCartIconDesktop = document.getElementById('cart-icon-desktop');
  const modalBackdrop = document.getElementById('backdrop');
  const modal = document.getElementById('modal');
  const form = document.querySelector('.order-form');
  const nameInput = document.getElementById('name');
  const phoneInput = document.getElementById('phone');
  const emailInput = document.getElementById('email');
  const commentsInput = document.getElementById('comments');
  const BASE_URL =  "https://tasty-treats-backend.p.goit.global/api"

  if (modalBackdrop) modalBackdrop.style.display = 'none';

  if (headerCartIcon) headerCartIcon.addEventListener('click', modalOpen);
  if (headerCartIconDesktop)
    headerCartIconDesktop.addEventListener('click', modalOpen);
  if (modalOpenBtn) modalOpenBtn.addEventListener('click', modalOpen);
  if (modalCloseBtn) modalCloseBtn.addEventListener('click', modalClose);
  if (modalBackdrop) modalBackdrop.addEventListener('click', modalClose);
  if (modal) modal.addEventListener('click', event => event.stopPropagation());
  
  nameInput.addEventListener('input', validateInput);
  phoneInput.addEventListener('input', validateInput);
  emailInput.addEventListener('input', validateInput);
  commentsInput.addEventListener('input', validateInput);

  document.addEventListener('keydown', function (evt) {
    if (evt.key === 'Escape') {
      modalClose();
    }
  });

  function validateInput(event) {
    const inputElement = event.target;
    const isValid = inputElement.checkValidity();

    inputElement.classList.remove('input-valid', 'input-invalid');
    inputElement.classList.add(isValid ? 'input-valid' : 'input-invalid');
  }

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

  const createUser = async (newUser) => {
    try {
      const response = await axios.post(`${BASE_URL}/orders/add`, newUser);
      return response.data;
    } catch (err) {
      console.log(err);
    }
  }

  async function onSubmit(evt){
    evt.preventDefault();

    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;
    let comments = commentsInput.value;

    if (!(nameInput.checkValidity() && phoneInput.checkValidity() && emailInput.checkValidity())) {
      return; // Don't proceed with the submission if the inputs are not valid
    }

    const newUser = {
      name: `${name}`,
      phone: `${phone}`,
      email: `${email}`,
      comment: `${comments}`
    }

    Notiflix.Loading.pulse('Sending...');
    try{
      const response = await createUser(newUser)
      console.log(response)
      setTimeout(() => {
        Notiflix.Loading.remove();
        modalClose();

        setTimeout(() => {
          Notiflix.Notify.success('Your order successfully sent');
        }, 500);
      }, 1500);
    }
    catch(err){
      console.log(err);
      Notiflix.Notify.failure('Your order was not sent')
    };
  }
});
