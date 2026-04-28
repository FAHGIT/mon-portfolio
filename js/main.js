// main.js — MonPortfolio · Adamfa Coulibaly

// ── Skeleton screen ──
const skeletonScreen = document.getElementById('skeleton-screen');

if (skeletonScreen) {
  if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) {
    skeletonScreen.remove();
  } else {
    setTimeout(() => {
      skeletonScreen.classList.add('is-hidden');
      skeletonScreen.addEventListener('transitionend', () => {
        skeletonScreen.remove();
      }, { once: true });
    }, 1000);
  }
}

// ── Thème clair/sombre ──
const toggle     = document.getElementById('theme-toggle');
const body       = document.body;
const root       = document.documentElement;

const LIGHT      = 'light';
const DARK       = 'dark';
const STORAGE_KEY = 'theme';

function applyTheme(isLight) {
  root.dataset.theme    = isLight ? LIGHT : DARK;
  toggle.textContent    = isLight ? '☽' : '☀';
}

const saved = localStorage.getItem(STORAGE_KEY);
if (saved) {
  applyTheme(saved === LIGHT);
} else {
  applyTheme(window.matchMedia('(prefers-color-scheme: light)').matches);
}

toggle.addEventListener('click', () => {
  const isLight = root.dataset.theme !== LIGHT;
  applyTheme(isLight);
  localStorage.setItem(STORAGE_KEY, isLight ? LIGHT : DARK);
});

// ── Menu hamburger ──
const hamburger = document.getElementById('nav-hamburger');
const navLinks  = document.getElementById('nav-links');

function closeMenu() {
  navLinks.classList.remove('is-open');
  hamburger.classList.remove('is-open');
  hamburger.setAttribute('aria-expanded', 'false');
  hamburger.setAttribute('aria-label', 'Ouvrir le menu');
  body.style.overflow = '';
}

hamburger.addEventListener('click', () => {
  const isOpen = navLinks.classList.contains('is-open');
  if (isOpen) {
    closeMenu();
  } else {
    navLinks.classList.add('is-open');
    hamburger.classList.add('is-open');
    hamburger.setAttribute('aria-expanded', 'true');
    hamburger.setAttribute('aria-label', 'Fermer le menu');
    body.style.overflow = 'hidden';
  }
});

navLinks.querySelectorAll('a').forEach(link => {
  link.addEventListener('click', closeMenu);
});

// ── Retour en haut ──
const backToTop = document.getElementById('back-to-top');

window.addEventListener('scroll', () => {
  backToTop.classList.toggle('is-visible', window.scrollY > 400);
}, { passive: true });

backToTop.addEventListener('click', () => {
  window.scrollTo({ top: 0, behavior: 'smooth' });
});

// ── Fade-in sections au scroll ──
const fadeObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('is-visible');
      fadeObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('section').forEach(section => {
  section.classList.add('js-fade');
  fadeObserver.observe(section);
});
