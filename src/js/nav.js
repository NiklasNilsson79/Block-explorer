document.addEventListener('DOMContentLoaded', () => {
  const menuToggle = document.querySelector('.menu-toggle');
  const navLinks = document.querySelector('.nav-links');

  if (!menuToggle || !navLinks) {
    console.error(
      'Ett eller flera navigations-element saknas! Kontrollera HTML-strukturen.'
    );
    return;
  }

  menuToggle.addEventListener('click', () => {
    navLinks.classList.toggle('show');
  });
});
