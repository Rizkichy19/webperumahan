/* =============================================
   GREEN SAKANTI – JavaScript
   script.js
   ============================================= */

'use strict';

/* ---- Navbar: scroll effect + active link ---- */
const navbar = document.getElementById('navbar');
const navLinks = document.querySelectorAll('.nav-link');
const sections = document.querySelectorAll('section[id]');

function onScroll() {
  // Scrolled style
  if (window.scrollY > 60) {
    navbar.classList.add('scrolled');
  } else {
    navbar.classList.remove('scrolled');
  }

  // Active nav link based on scroll position
  let currentId = '';
  sections.forEach(sec => {
    const top = sec.offsetTop - 100;
    if (window.scrollY >= top) currentId = sec.id;
  });
  navLinks.forEach(link => {
    link.classList.remove('active');
    if (link.getAttribute('href') === '#' + currentId) {
      link.classList.add('active');
    }
  });
}
window.addEventListener('scroll', onScroll, { passive: true });
onScroll();

/* ---- Hamburger menu ---- */
const hamburger = document.getElementById('hamburger-btn');
const navLinksContainer = document.getElementById('nav-links');

hamburger.addEventListener('click', () => {
  hamburger.classList.toggle('open');
  navLinksContainer.classList.toggle('open');
});

// Close menu on link click
navLinksContainer.querySelectorAll('.nav-link').forEach(link => {
  link.addEventListener('click', () => {
    hamburger.classList.remove('open');
    navLinksContainer.classList.remove('open');
  });
});

/* ---- Intersection Observer: reveal animations ---- */
const revealTargets = [
  { selector: '.section-header', delay: 0 },
  { selector: '.produk-card',    delay: 100 },
  { selector: '.bayar-cards',    delay: 0 },
  { selector: '.fas-item',       delay: 80 },
  { selector: '.cta-content',    delay: 0 },
];

const revealObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const el = entry.target;
      const delay = parseInt(el.dataset.delay || 0);
      setTimeout(() => {
        el.classList.add('visible');
      }, delay);
      revealObserver.unobserve(el);
    }
  });
}, { threshold: 0.1, rootMargin: '0px 0px -50px 0px' });

// Apply staggered delays to cards and items
document.querySelectorAll('.produk-card').forEach((el, i) => {
  el.dataset.delay = i * 150;
  revealObserver.observe(el);
});

document.querySelectorAll('.fas-item').forEach((el, i) => {
  el.dataset.delay = i * 80;
  revealObserver.observe(el);
});

document.querySelectorAll('.section-header, .bayar-cards, .cta-content').forEach(el => {
  revealObserver.observe(el);
});

/* ---- Smooth scroll for anchor links ---- */
document.querySelectorAll('a[href^="#"]').forEach(anchor => {
  anchor.addEventListener('click', function (e) {
    e.preventDefault();
    const targetId = this.getAttribute('href').slice(1);
    const target = document.getElementById(targetId);
    if (target) {
      const offset = 80;
      const top = target.getBoundingClientRect().top + window.scrollY - offset;
      window.scrollTo({ top, behavior: 'smooth' });
    }
  });
});

/* ---- Parallax hero (subtle) ---- */
const heroBg = document.querySelector('.hero-bg');
window.addEventListener('scroll', () => {
  if (heroBg) {
    const scrolled = window.scrollY;
    heroBg.style.transform = `translateY(${scrolled * 0.3}px)`;
  }
}, { passive: true });

/* ---- Stats counter animation ---- */
function animateCounter(el, target, duration = 1500) {
  let start = 0;
  const step = target / (duration / 16);
  const timer = setInterval(() => {
    start += step;
    if (start >= target) { el.textContent = target; clearInterval(timer); return; }
    el.textContent = Math.floor(start);
  }, 16);
}

const statsObserver = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      const counters = entry.target.querySelectorAll('.stat-number');
      counters.forEach(el => {
        const val = parseInt(el.textContent);
        if (!isNaN(val)) animateCounter(el, val);
      });
      statsObserver.unobserve(entry.target);
    }
  });
}, { threshold: 0.5 });

const statsEl = document.querySelector('.hero-stats');
if (statsEl) statsObserver.observe(statsEl);

/* ---- Floating WA: show/hide on scroll ---- */
const floatingWa = document.getElementById('floating-wa-btn');
window.addEventListener('scroll', () => {
  if (window.scrollY > 300) {
    floatingWa.style.opacity = '1';
    floatingWa.style.transform = 'scale(1)';
  } else {
    floatingWa.style.opacity = '0';
    floatingWa.style.transform = 'scale(0.8)';
  }
}, { passive: true });

// Initial state
floatingWa.style.transition = 'opacity 0.4s ease, transform 0.4s ease';
floatingWa.style.opacity = '0';
floatingWa.style.transform = 'scale(0.8)';

/* ---- Produk Card: tilt effect on hover ---- */
document.querySelectorAll('.produk-card').forEach(card => {
  card.addEventListener('mousemove', e => {
    const rect = card.getBoundingClientRect();
    const x = (e.clientX - rect.left) / rect.width - 0.5;
    const y = (e.clientY - rect.top) / rect.height - 0.5;
    card.style.transform = `translateY(-8px) perspective(600px) rotateY(${x * 6}deg) rotateX(${-y * 4}deg)`;
  });
  card.addEventListener('mouseleave', () => {
    card.style.transform = '';
  });
});

/* ---- Page load: add 'loaded' class ---- */
window.addEventListener('load', () => {
  document.body.classList.add('loaded');
});
