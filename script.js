const toggle = document.querySelector('.menu-toggle');
const menu = document.getElementById('mobile-menu');
const header = document.querySelector('.site-header');

if (toggle && menu) {
  toggle.addEventListener('click', () => {
    const isOpen = toggle.getAttribute('aria-expanded') === 'true';
    toggle.setAttribute('aria-expanded', String(!isOpen));
    menu.hidden = isOpen;
  });

  menu.addEventListener('click', (event) => {
    if (event.target.tagName === 'A') {
      toggle.setAttribute('aria-expanded', 'false');
      menu.hidden = true;
    }
  });
}

const updateHeader = () => {
  if (header) header.classList.toggle('is-scrolled', window.scrollY > 12);
};

updateHeader();
window.addEventListener('scroll', updateHeader, { passive: true });

const year = document.getElementById('year');
if (year) year.textContent = String(new Date().getFullYear());

const revealTargets = document.querySelectorAll('.section-heading, .work-card, .steps li, .contact-card');

if ('IntersectionObserver' in window) {
  const revealObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      entry.target.classList.add('is-visible');
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.15 });

  revealTargets.forEach((element) => {
    element.classList.add('reveal');
    revealObserver.observe(element);
  });
} else {
  revealTargets.forEach((element) => element.classList.add('is-visible'));
}

const counters = document.querySelectorAll('[data-count]');

const runCounter = (element) => {
  const target = Number(element.dataset.count);
  const duration = 1100;
  const start = performance.now();

  const tick = (now) => {
    const progress = Math.min((now - start) / duration, 1);
    const eased = 1 - Math.pow(1 - progress, 3);
    element.textContent = String(Math.round(target * eased));
    if (progress < 1) requestAnimationFrame(tick);
  };

  requestAnimationFrame(tick);
};

if ('IntersectionObserver' in window) {
  const counterObserver = new IntersectionObserver((entries, observer) => {
    entries.forEach((entry) => {
      if (!entry.isIntersecting) return;
      runCounter(entry.target);
      observer.unobserve(entry.target);
    });
  }, { threshold: 0.6 });

  counters.forEach((element) => counterObserver.observe(element));
} else {
  counters.forEach((element) => { element.textContent = element.dataset.count; });
}
