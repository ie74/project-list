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

// Mostra l'avviso una volta per visita, anche se si entra da una pagina interna.
let noticeAlreadyShown = false;
try {
    noticeAlreadyShown = sessionStorage.getItem('project-list-site-notice') === 'shown';
} catch {
    // L'avviso resta disponibile anche quando il browser blocca lo storage.
}

if (!noticeAlreadyShown) {
    const notice = document.createElement('dialog');
    notice.className = 'site-notice';
    notice.setAttribute('aria-labelledby', 'site-notice-title');
    notice.setAttribute('aria-describedby', 'site-notice-description');
    notice.innerHTML = `
        <form method="dialog">
            <button class="site-notice__close" type="submit" aria-label="Chiudi l'avviso"><span aria-hidden="true">&times;</span></button>
        </form>
        <p class="caption site-notice__eyebrow">Project List</p>
        <h2 class="title site-notice__title" id="site-notice-title">Ehi, il sito sta prendendo forma!</h2>
        <p class="text text--muted site-notice__text" id="site-notice-description">
            Stiamo preparando nuove pagine e contenuti. Nel frattempo, seguici su Instagram:
            lì trovi tutti gli aggiornamenti!
        </p>
        <form method="dialog" class="site-notice__actions">
            <a class="button button--primary" href="https://instagram.com" target="_blank" rel="noopener noreferrer">Seguici su Instagram</a>
            <button class="button button--secondary" type="submit">Continua sul sito</button>
        </form>
    `;
    notice.addEventListener('close', () => notice.remove());
    document.body.append(notice);
    notice.showModal();

    try {
        sessionStorage.setItem('project-list-site-notice', 'shown');
    } catch {
        // La navigazione funziona anche senza storage.
    }
}
