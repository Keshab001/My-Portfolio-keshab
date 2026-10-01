/* ============================================================
   main.js — Entry point: init all modules + global effects
   ============================================================ */

/** Global scroll-reveal for all .reveal elements */
function initReveal() {
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  }, { threshold: 0.1, rootMargin: '0px 0px -40px 0px' });

  // Observe all reveal variants
  document.querySelectorAll('.reveal, .reveal-left, .reveal-scale, .reveal-stagger').forEach(el => {
    observer.observe(el);
  });
}

/** Typewriter effect for the hero tagline */
function initTypewriter() {
  const el = document.querySelector('.hero__tagline');
  if (!el) return;

  // Get the current text from the element (already translated)
  const text = el.dataset.fullText || el.textContent;
  el.dataset.fullText = text; // cache for re-runs

  el.textContent = '';
  el.classList.add('typing');

  let i = 0;
  const interval = setInterval(() => {
    el.textContent += text[i++];
    if (i >= text.length) {
      clearInterval(interval);
      el.classList.remove('typing');
    }
  }, 38);
}

/** Update typewriter text after language switch */
document.addEventListener('langchange', () => {
  const el = document.querySelector('.hero__tagline');
  if (el) {
    el.dataset.fullText = i18n.t('hero.tagline');
    setTimeout(initTypewriter, 80);
  }
});

/** Animate stat counter numbers */
function initCounters() {
  const counters = document.querySelectorAll('.stat-card__number[data-target]');
  if (!counters.length) return;

  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (!entry.isIntersecting) return;
      const el     = entry.target;
      const target = parseInt(el.getAttribute('data-target'), 10);
      const suffix = el.getAttribute('data-suffix') || '';
      let current  = 0;
      const step   = Math.ceil(target / 50);
      const timer  = setInterval(() => {
        current = Math.min(current + step, target);
        el.textContent = current + suffix;
        if (current >= target) clearInterval(timer);
      }, 30);
      observer.unobserve(el);
    });
  }, { threshold: 0.5 });

  counters.forEach(el => observer.observe(el));
}

/** Highlight nav link based on current hash on load */
function initNavHighlightOnLoad() {
  const hash = window.location.hash;
  if (hash) {
    const link = document.querySelector(`.nav__links a[href="${hash}"]`);
    if (link) link.classList.add('active');
  }
}

document.addEventListener('DOMContentLoaded', () => {
  // Init all modules (scripts loaded via defer, so all are available)
  i18n.init();
  photoManager.init();
  navManager.init();
  skillsManager.init(); // must run before initReveal so .skill-bar elements exist
  contactManager.init();
  matrixFx.init();      // rain + boot screen; runs after i18n so text is translated

  // Global visual effects
  initReveal();
  initCounters();
  initNavHighlightOnLoad();

  // Hero text animates only once the boot screen has cleared
  matrixFx.whenBooted().then(() => {
    initTypewriter();
    matrixFx.scramble(document.querySelector('.hero__name'), 1100);
  });
});
