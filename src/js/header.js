document.addEventListener('DOMContentLoaded', function () {
  const mobileMenu = document.querySelector('.mobile-menu');
  mobileMenu.style.display = 'none';

  const hamburger = document.getElementById('hamburger');
  const closeMenuBtn = document.getElementById('js-close-menu');
  const desktopSwitch = document.querySelector('#desktop-switch');
  const mobileSwitch = document.querySelector('#mobile-switch');
  const body = document.body;

  hamburger.addEventListener('click', openMenuDisplay);
  closeMenuBtn.addEventListener('click', closeMenuDisplay);
  desktopSwitch.addEventListener('click', () =>
    toggleThemeSwitch(desktopSwitch, mobileSwitch)
  );
  mobileSwitch.addEventListener('click', () =>
    toggleThemeSwitch(desktopSwitch, mobileSwitch)
  );

  let isDarkMode = localStorage.getItem('isDarkMode') === 'true';
  applyTheme(desktopSwitch, isDarkMode);
  applyTheme(mobileSwitch, isDarkMode);

  function openMenuDisplay() {
    mobileMenu.style.display = 'block';
    document.body.classList.add('no-scroll');
  }

  function closeMenuDisplay() {
    mobileMenu.style.display = 'none';
    document.body.classList.remove('no-scroll');
  }

  function toggleThemeSwitch(desktopSwitch, mobileSwitch) {
    isDarkMode = !isDarkMode;
    localStorage.setItem('isDarkMode', isDarkMode);
    applyTheme(desktopSwitch, isDarkMode);
    applyTheme(mobileSwitch, isDarkMode);
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
});

if (document.body.id === 'home-page') {
  document.getElementById('home-link').classList.add('active-page');
  document.getElementById('mobile-home-link').classList.add('active-page');
} else if (document.body.id === 'favorites-page') {
  document.getElementById('favorites-link').classList.add('active-page');
  document.getElementById('mobile-favorites-link').classList.add('active-page');
}
