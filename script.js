const scriptUrl = document.currentScript?.src || window.location.href;
const year = document.getElementById('year');
if (year) year.textContent = new Date().getFullYear();

// Navigazione mobile.
const navToggle = document.querySelector('.site-header__toggle');
const nav = document.getElementById('site-nav');
if (navToggle && nav) {
    navToggle.addEventListener('click', () => {
        const isOpen = nav.classList.toggle('is-open');
        navToggle.setAttribute('aria-expanded', String(isOpen));
        navToggle.innerHTML = isOpen ? '&#10005;' : '&#9776;';
    });

    document.addEventListener('keydown', (event) => {
        if (event.key === 'Escape' && nav.classList.contains('is-open')) {
            nav.classList.remove('is-open');
            navToggle.setAttribute('aria-expanded', 'false');
            navToggle.innerHTML = '&#9776;';
        }
    });
}

// Galleria merch: ogni selettore cambia foto, testo alternativo e stato premuto.
document.querySelectorAll('[data-merch-product]').forEach((product) => {
    const image = product.querySelector('.merch-product__media img');
    const colorName = product.querySelector('.merch-product__color-name');
    const variants = product.querySelectorAll('.merch-product__variant');
    if (!image || !colorName) return;

    variants.forEach((variant) => {
        variant.addEventListener('click', () => {
            image.src = variant.dataset.src;
            image.alt = variant.dataset.alt;
            colorName.textContent = variant.dataset.color;
            variants.forEach((button) => {
                button.setAttribute('aria-pressed', String(button === variant));
            });
        });
    });
});

// Intro di campagna: una volta per sessione, anche entrando da una pagina interna.
const introStorageKey = 'project-list-intro-v1';
let introAlreadyShown = false;
try {
    introAlreadyShown = sessionStorage.getItem(introStorageKey) === 'shown';
} catch {
    // Il sito resta utilizzabile anche se il browser blocca lo storage.
}

if (!introAlreadyShown) {
    const logoUrl = new URL('assets/logo/full.svg', scriptUrl).href;
    const iconUrl = new URL('assets/logo/icon.svg', scriptUrl).href;
    const intro = document.createElement('dialog');
    intro.className = 'campaign-intro';
    intro.setAttribute('aria-labelledby', 'campaign-intro-title');
    intro.setAttribute('aria-describedby', 'campaign-intro-description');
    intro.innerHTML = `
        <div class="campaign-intro__scene">
            <div class="campaign-intro__orb campaign-intro__orb--one" aria-hidden="true"></div>
            <div class="campaign-intro__orb campaign-intro__orb--two" aria-hidden="true"></div>
            <img class="campaign-intro__mark" src="${iconUrl}" alt="" aria-hidden="true">
            <button class="campaign-intro__skip" type="button" aria-label="Chiudi introduzione">Chiudi <span aria-hidden="true">&times;</span></button>
            <div class="campaign-intro__content">
                <p class="caption campaign-intro__eyebrow">Due persone. Un progetto.</p>
                <h2 class="campaign-intro__names" id="campaign-intro-title">
                    <span class="campaign-intro__name campaign-intro__name--denise">Denise <em>Chesini</em></span>
                    <span class="campaign-intro__name campaign-intro__name--andrea">Andrea <em>Parrinello</em></span>
                </h2>
                <svg class="campaign-intro__line" viewBox="0 0 1000 80" preserveAspectRatio="none" aria-hidden="true"><path d="M0 47 C220 -12 285 94 505 39 S820 -3 1000 44" pathLength="1"></path></svg>
                <div class="campaign-intro__final">
                    <img class="campaign-intro__logo" src="${logoUrl}" alt="Project List">
                    <p class="campaign-intro__tagline" id="campaign-intro-description">Il prossimo progetto lo scriviamo insieme.</p>
                    <button class="campaign-intro__enter" type="button">Continua sul sito <span aria-hidden="true">&rarr;</span></button>
                </div>
            </div>
            <p class="campaign-intro__index" aria-hidden="true">PROJECT LIST / 01</p>
        </div>
    `;

    const closeIntro = () => {
        if (intro.open) intro.close();
    };
    intro.querySelector('.campaign-intro__skip').addEventListener('click', closeIntro);
    intro.querySelector('.campaign-intro__enter').addEventListener('click', closeIntro);
    intro.addEventListener('close', () => {
        try {
            sessionStorage.setItem(introStorageKey, 'shown');
        } catch {
            // La navigazione funziona anche senza storage.
        }
        intro.remove();
    });

    document.body.append(intro);
    intro.showModal();
}
