export function addToFavorite () {

    const heartCheckBoxEl = document.querySelectorAll('.card-checkbox'); // масив усіх інпутів чекбоксів

    let selectedHeartCheckBox = [];

    // Функція для обробки зміни стану чекбоксів

    function handleCheckboxChange(event) {
      const checkbox = event.target; // елемент на який клікаємо <input>

      // console.log(checkbox);

      const checkboxId = checkbox.id;

      // дістати всю інформацію з картки за запушити її у масив

      if (checkbox.checked) {
        selectedHeartCheckBox.push(checkboxId);
      } else {
        // Перевіряємо, чи елемент міститься у списку вибраних перед тим, як його видалити
        const index = selectedHeartCheckBox.indexOf(checkboxId);
        if (index !== -1) {
          selectedHeartCheckBox.splice(index, 1);
        }
      }

      // console.log(selectedHeartCheckBox); // правильно виводиться масив з даними

      const heartCheckBoxElLocalStorage = JSON.stringify(selectedHeartCheckBox);
      localStorage.setItem('inFavorite', heartCheckBoxElLocalStorage);
    }

    // Додаємо обробник подій для кожного чекбокса
    heartCheckBoxEl.forEach(checkbox => {
      checkbox.addEventListener('change', handleCheckboxChange);
    });

    // Перевіряємо, чи є збережені дані в локальному сховищі
    const storedData = localStorage.getItem('inFavorite');
    if (storedData) {
      // Розпарсуємо дані з локального сховища назад у масив
      selectedHeartCheckBox = JSON.parse(storedData);

      // Відновлюємо стан чекбоксів на основі збережених значень
      heartCheckBoxEl.forEach(checkbox => {
        const checkboxId = checkbox.id;
        if (selectedHeartCheckBox.includes(checkboxId)) {
          checkbox.checked = true;
        }
      });
    }
  }
  