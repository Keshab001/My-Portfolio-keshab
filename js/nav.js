/* ============================================================
   nav.js — Sticky nav, active section, smooth scroll,
            hamburger menu, dark/light theme toggle
   ============================================================ */
const navManager = (() => {
  /** Sticky nav: add/remove .nav--scrolled class on scroll */
  function initSticky() {
    const nav = document.getElementById('mainNav');
    if (!nav) return;
    const update = () => nav.classList.toggle('nav--scrolled', window.scrollY > 50);
    window.addEventListener('scroll', update, { passive: true });
    update(); // apply on load in case page is already scrolled
  }

  /**
   * Highlight the nav link whose section is currently in view.
   * rootMargin pulls the trigger zone to the middle of the viewport.
   */
  function initActiveHighlight() {
    const sections = document.querySelectorAll('section[id]');
    const navLinks = document.querySelectorAll('.nav__links a[href^="#"]');
    if (!sections.length || !navLinks.length) return;

    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          navLinks.forEach(link => link.classList.remove('active'));
          const active = document.querySelector(`.nav__links a[href="#${entry.target.id}"]`);
          if (active) active.classList.add('active');
        }
      });
    }, { rootMargin: '-35% 0px -60% 0px' });

    sections.forEach(s => observer.observe(s));
  }

  /** Smooth scroll with nav-height offset for all in-page anchor links */
  function initSmoothScroll() {
    document.addEventListener('click', e => {
      const anchor = e.target.closest('a[href^="#"]');
      if (!anchor) return;
      const targetId = anchor.getAttribute('href');
      if (targetId === '#') return;
      const target = document.querySelector(targetId);
      if (!target) return;

      e.preventDefault();
      const navHeight = parseInt(
        getComputedStyle(document.documentElement).getPropertyValue('--nav-height') || '72',
        10
      );
      const top = target.getBoundingClientRect().top + window.scrollY - navHeight;
      window.scrollTo({ top, behavior: 'smooth' });

      // Close mobile menu after clicking a link
      const nav = document.getElementById('mainNav');
      if (nav) nav.classList.remove('nav--open');
    });
  }

  /** Hamburger toggle for mobile */
  function initHamburger() {
    const btn = document.getElementById('hamburger');
    const nav = document.getElementById('mainNav');
    if (!btn || !nav) return;

    btn.addEventListener('click', () => nav.classList.toggle('nav--open'));

    // Close when clicking outside
    document.addEventListener('click', e => {
      if (!nav.contains(e.target) && nav.classList.contains('nav--open')) {
        nav.classList.remove('nav--open');
      }
    });
  }

  /** Dark / light theme toggle with localStorage persistence */
  function initThemeToggle() {
    const btn  = document.getElementById('themeToggle');
    const html = document.documentElement;

    // Apply saved theme on load
    const saved = localStorage.getItem('portfolio-theme') || 'dark';
    html.setAttribute('data-theme', saved);
    updateThemeIcon(saved);

    if (!btn) return;
    btn.addEventListener('click', () => {
      const next = html.getAttribute('data-theme') === 'dark' ? 'light' : 'dark';
      html.setAttribute('data-theme', next);
      localStorage.setItem('portfolio-theme', next);
      updateThemeIcon(next);
    });
  }

  function updateThemeIcon(theme) {
    const btn = document.getElementById('themeToggle');
    if (!btn) return;
    // Sun icon for dark mode (click = switch to light), moon for light mode
    btn.innerHTML = theme === 'dark'
      ? `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" d="M12 3v2.25m6.364.386-1.591 1.591M21 12h-2.25m-.386 6.364-1.591-1.591M12 18.75V21m-4.773-4.227-1.591 1.591M5.25 12H3m4.227-4.773L5.636 5.636M15.75 12a3.75 3.75 0 1 1-7.5 0 3.75 3.75 0 0 1 7.5 0Z" />
         </svg>`
      : `<svg xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24" stroke-width="1.5" stroke="currentColor">
           <path stroke-linecap="round" stroke-linejoin="round" d="M21.752 15.002A9.72 9.72 0 0 1 18 15.75c-5.385 0-9.75-4.365-9.75-9.75 0-1.33.266-2.597.748-3.752A9.753 9.753 0 0 0 3 11.25C3 16.635 7.365 21 12.75 21a9.753 9.753 0 0 0 9.002-5.998Z" />
         </svg>`;
    btn.setAttribute('aria-label', theme === 'dark' ? 'Switch to light mode' : 'Switch to dark mode');
  }

  function init() {
    initSticky();
    initActiveHighlight();
    initSmoothScroll();
    initHamburger();
    initThemeToggle();
  }

  return { init };
})();
