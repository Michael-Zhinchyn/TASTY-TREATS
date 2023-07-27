document.addEventListener('DOMContentLoaded', function () {
  const mobileMenu = document.querySelector('.mobile-menu');
  const hamburger = document.getElementById('hamburger');
  const closeMenuBtn = document.getElementById('js-close-menu');
  const desktopSwitch = document.querySelector('#desktop-switch');
  const mobileSwitch = document.querySelector('#mobile-switch');
  const body = document.body;

  hamburger.addEventListener('click', toggleMenu);
  closeMenuBtn.addEventListener('click', toggleMenu);
  desktopSwitch.addEventListener('click', () =>
    toggleThemeSwitch(desktopSwitch, mobileSwitch)
  );
  mobileSwitch.addEventListener('click', () =>
    toggleThemeSwitch(desktopSwitch, mobileSwitch)
  );

  let isMenuOpen = false;
  let isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  applyTheme(desktopSwitch, isDarkMode);
  applyTheme(mobileSwitch, isDarkMode);
  applyMobileMenuColor(isDarkMode);
  applyActivePageStyles();

  function openMenuDisplay() {
    mobileMenu.classList.add('visible');
    mobileMenu.style.transform = 'translateX(0%)';
    document.body.classList.add('no-scroll');
    isMenuOpen = true;
  }

  function closeMenuDisplay() {
    mobileMenu.classList.remove('visible');
    mobileMenu.style.transform = 'translateX(100%)';
    setTimeout(() => {
      mobileMenu.style.visibility = 'hidden';
    }, 300);
    document.body.classList.remove('no-scroll');
    isMenuOpen = false;
  }

  function toggleMenu() {
    if (isMenuOpen) {
      closeMenuDisplay();
    } else {
      mobileMenu.style.visibility = 'visible';
      openMenuDisplay();
    }
  }

  function toggleThemeSwitch(desktopSwitch, mobileSwitch) {
    isDarkMode = !isDarkMode;
    localStorage.setItem('isDarkMode', isDarkMode);
    applyTheme(desktopSwitch, isDarkMode);
    applyTheme(mobileSwitch, isDarkMode);
    applyMobileMenuColor(isDarkMode);
    applyActivePageStyles();
  }

  function applyTheme(switchElement, isDarkMode) {
    const circle =
      switchElement.querySelector('#switch-circle-desktop') ||
      switchElement.querySelector('#switch-circle-mobile');
    const rect =
      switchElement.querySelector('#switch-rect-desktop') ||
      switchElement.querySelector('#switch-rect-mobile');

    if (isDarkMode) {
      animate(circle, 'cx', 18, 44, 300);
      rect.setAttribute(
        'fill',
        `url(#paint0_linear_${
          switchElement.id === 'desktop-switch' ? 'desktop' : 'mobile'
        })`
      );
      body.classList.add('dark-mode');
    } else {
      animate(circle, 'cx', 44, 18, 300);
      rect.setAttribute('fill', '#CECDCD');
      body.classList.remove('dark-mode');
    }
  }

  function animate(element, property, from, to, duration) {
    let start = performance.now();
    requestAnimationFrame(function animateFrame(time) {
      let elapsed = time - start;
      let progress = Math.min(elapsed / duration, 1);
      let current = from + (to - from) * progress;
      element.setAttribute(property, current);
      if (progress < 1) {
        requestAnimationFrame(animateFrame);
      }
    });
  }

  function applyMobileMenuColor(isDarkMode) {
    if (isDarkMode) {
      mobileMenu.style.backgroundColor = 'var(--brand-black)';
    } else {
      mobileMenu.style.backgroundColor = 'var(--brand-green)';
    }
  }

  function applyActivePageStyles() {
    const mobileHomeLink = document.getElementById('mobile-home-link');
    const mobileFavoritesLink = document.getElementById(
      'mobile-favorites-link'
    );

    if (document.body.id === 'home-page') {
      mobileHomeLink.classList.add('active-page');
      mobileHomeLink.style.fontWeight = '500';
      mobileHomeLink.style.color = isDarkMode
        ? 'var(--brand-green)'
        : 'var(--clear-white)';
      mobileFavoritesLink.classList.remove('active-page');
      mobileFavoritesLink.style.fontWeight = 'normal';
      mobileFavoritesLink.style.color = '#F8F8F8'; // Set the color to #F8F8F8 (light gray)
    } else if (document.body.id === 'favorites-page') {
      mobileFavoritesLink.classList.add('active-page');
      mobileFavoritesLink.style.fontWeight = '500';
      mobileFavoritesLink.style.color = isDarkMode
        ? 'var(--brand-green)'
        : 'var(--clear-white)';
      mobileHomeLink.classList.remove('active-page');
      mobileHomeLink.style.fontWeight = 'normal';
      mobileHomeLink.style.color = '#F8F8F8'; // Set the color to #F8F8F8 (light gray)
    }
  }

  if (document.body.id === 'home-page') {
    document.getElementById('home-link').classList.add('active-page');
    document.getElementById('mobile-home-link').classList.add('active-page');
  } else if (document.body.id === 'favorites-page') {
    document.getElementById('favorites-link').classList.add('active-page');
    document
      .getElementById('mobile-favorites-link')
      .classList.add('active-page');
  }
});
