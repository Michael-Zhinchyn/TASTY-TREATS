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

  const BASE_URL = 'https://tasty-treats-backend.p.goit.global/api';
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

  const createUser = async newUser => {
    try {
      const response = await axios.post(`${BASE_URL}/orders/add`, newUser);
      return response.data;
    } catch (err) {
      console.log(err);
    }

  };
 

  async function onSubmit(evt){
    evt.preventDefault();

    let name = nameInput.value;
    let phone = phoneInput.value;
    let email = emailInput.value;
    let comments = commentsInput.value;

    if (!(nameInput.checkValidity() && phoneInput.checkValidity() && emailInput.checkValidity())) {
      return; 
    }

    const newUser = {
      name: `${name}`,
      phone: `${phone}`,
      email: `${email}`,
      comment: `${comments}`,
    };

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

    } catch (err) {
      console.log(err);
      Notiflix.Notify.failure('Your order was not sent');
    }
  }
});

// Функція для обробки валідації та кольорів рамок
function handleInputValidation(inputElement) {
  if (inputElement.checkValidity()) {
    inputElement.style.borderColor = '#9BB537';
  } else {
    inputElement.style.borderColor = 'red';

    }
    catch(err){
      console.log(err);
      Notiflix.Notify.failure('Your order was not sent')
    };
  }
}

// Функція для перевірки, чи всі поля вводу заповнені
function areAllFieldsFilled() {
  const formInputs = document.querySelectorAll('.order-form-input');
  let allFilled = true;

  formInputs.forEach(input => {
    if (!input.value.trim()) {
      allFilled = false;
      input.style.borderColor = 'red';
    }
  });

  return allFilled;
}

// Прикладаємо обробник події "input" для перевірки валідації під час введення
document.getElementById('name').addEventListener('input', function () {
  handleInputValidation(this);
});

document.getElementById('phone').addEventListener('input', function () {
  handleInputValidation(this);
});

document.getElementById('email').addEventListener('input', function () {
  handleInputValidation(this);
});

// Прикладаємо обробник події "submit" для перевірки на пусті поля перед надсиланням форми
document
  .querySelector('.order-form')
  .addEventListener('submit', function (event) {
    event.preventDefault();

    // Перевіряємо, чи всі поля вводу заповнені
    const allFieldsFilled = areAllFieldsFilled();

    // Якщо всі поля заповнені, надсилаємо форму
    if (allFieldsFilled) {
      // Тут додаємо код для відправки форми на сервер
      // ...
      console.log('Form submitted successfully!');
    } else {
      // Якщо є порожні поля, виводимо повідомлення або робимо що-небудь інше
      console.log('Please fill in all the fields before submitting.');
    }
  });
