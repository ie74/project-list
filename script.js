document.getElementById('year').textContent = new Date().getFullYear();

// Toggle menu mobile (hamburger)
const navToggle = document.querySelector('.site-header__toggle');
const nav = document.getElementById('site-nav');

navToggle.addEventListener('click', () => {
    const isOpen = nav.classList.toggle('is-open');
    navToggle.setAttribute('aria-expanded', String(isOpen));
    navToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;'; // X quando aperto
});

// Chiudi il menu con Esc
document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && nav.classList.contains('is-open')) {
        nav.classList.remove('is-open');
        navToggle.setAttribute('aria-expanded', 'false');
        navToggle.innerHTML = '&#9776;';
    }
});
