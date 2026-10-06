const navToggle = document.querySelector('.nav-toggle');
const navMenu = document.querySelector('.nav-menu');
const navIcon = navToggle?.querySelector('i');
const navLinks = [...document.querySelectorAll('.nav-menu a')];
const header = document.querySelector('.site-header');
const year = document.querySelector('#current-year');

function setMenu(open) {
    if (!navToggle || !navMenu) return;

    navMenu.classList.toggle('open', open);
    navToggle.setAttribute('aria-expanded', String(open));
    navToggle.setAttribute('aria-label', open ? 'Close navigation' : 'Open navigation');
    document.body.classList.toggle('menu-open', open && window.innerWidth <= 760);

    if (navIcon) {
        navIcon.className = open ? 'fa-solid fa-xmark' : 'fa-solid fa-bars';
    }
}

navToggle?.addEventListener('click', () => {
    setMenu(!navMenu.classList.contains('open'));
});

navLinks.forEach((link) => {
    link.addEventListener('click', () => setMenu(false));
});

document.addEventListener('keydown', (event) => {
    if (event.key === 'Escape') setMenu(false);
});

window.addEventListener('resize', () => {
    if (window.innerWidth > 760) setMenu(false);
});

window.addEventListener('scroll', () => {
    header?.classList.toggle('scrolled', window.scrollY > 10);
}, { passive: true });

if (year) {
    year.textContent = new Date().getFullYear();
}

const revealItems = document.querySelectorAll('.reveal');

if ('IntersectionObserver' in window) {
    const revealObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach((entry) => {
            if (entry.isIntersecting) {
                entry.target.classList.add('visible');
                observer.unobserve(entry.target);
            }
        });
    }, { threshold: 0.12 });

    revealItems.forEach((item) => revealObserver.observe(item));
} else {
    revealItems.forEach((item) => item.classList.add('visible'));
}

const sections = [...document.querySelectorAll('main section[id]')];

if ('IntersectionObserver' in window && sections.length) {
    const sectionObserver = new IntersectionObserver((entries) => {
        entries.forEach((entry) => {
            if (!entry.isIntersecting) return;

            navLinks.forEach((link) => {
                link.classList.toggle('active', link.getAttribute('href') === `#${entry.target.id}`);
            });
        });
    }, {
        rootMargin: '-40% 0px -50% 0px',
        threshold: 0
    });

    sections.forEach((section) => sectionObserver.observe(section));
}
