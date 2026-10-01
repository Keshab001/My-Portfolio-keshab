/* ============================================================
   matrix.js — Digital rain canvas, boot sequence,
               text "decode" scramble + glitch text sync
   ============================================================ */
const matrixFx = (() => {
  const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

  // Half-width katakana + digits, like the film's rain
  const RAIN_GLYPHS = 'ｱｲｳｴｵｶｷｸｹｺｻｼｽｾｿﾀﾁﾂﾃﾄﾅﾆﾇﾈﾉﾊﾋﾌﾍﾎﾏﾐﾑﾒﾓﾔﾕﾖﾗﾘﾙﾚﾛﾜﾝ0123456789Z:.=*+-<>¦|';
  // ASCII only for scrambling, so monospace text width never jumps
  const SCRAMBLE_GLYPHS = '!<>-_\\/[]{}=+*^?#01ｱｸﾐ';

  const randomFrom = str => str[Math.floor(Math.random() * str.length)];

  /* ── Digital rain ───────────────────────────────────────── */
  function initRain() {
    const canvas = document.getElementById('matrixRain');
    if (!canvas || !canvas.getContext) return;

    const ctx       = canvas.getContext('2d');
    const FONT_SIZE = 16;
    const FRAME_MS  = 50; // ~20 fps: smooth enough, cheap on laptops/phones
    let width = 0, height = 0, drops = [], colors = {};

    function readColors() {
      const cs = getComputedStyle(document.documentElement);
      colors = {
        head: cs.getPropertyValue('--rain-head').trim() || '#d6ffe0',
        tail: cs.getPropertyValue('--rain-tail').trim() || '#00ff41',
        fade: cs.getPropertyValue('--rain-fade').trim() || 'rgba(0,0,0,0.08)',
        bg:   cs.getPropertyValue('--clr-bg').trim()    || '#000',
      };
    }

    function clear() {
      ctx.fillStyle = colors.bg;
      ctx.fillRect(0, 0, width, height);
    }

    function resize() {
      const dpr = Math.min(window.devicePixelRatio || 1, 2);
      width  = window.innerWidth;
      height = window.innerHeight;
      canvas.width  = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.font = `${FONT_SIZE}px "JetBrains Mono", monospace`;

      const cols = Math.ceil(width / FONT_SIZE);
      // Keep existing columns where possible; new ones start above the screen
      drops = Array.from({ length: cols }, (_, i) =>
        drops[i] !== undefined ? drops[i] : -Math.random() * (height / FONT_SIZE)
      );
      clear();
    }

    function step() {
      ctx.fillStyle = colors.fade; // translucent wash leaves fading trails
      ctx.fillRect(0, 0, width, height);

      for (let i = 0; i < drops.length; i++) {
        const x = i * FONT_SIZE;
        const y = drops[i] * FONT_SIZE;
        if (y > 0) {
          // Repaint the previous head in green so only the tip is bright
          ctx.fillStyle = colors.tail;
          ctx.fillText(randomFrom(RAIN_GLYPHS), x, y - FONT_SIZE);
          ctx.fillStyle = colors.head;
          ctx.fillText(randomFrom(RAIN_GLYPHS), x, y);
        }
        if (y > height && Math.random() > 0.975) drops[i] = 0;
        drops[i] += 1;
      }
    }

    readColors();
    resize();

    // Mobile browsers resize the viewport when the URL bar hides; ignore small height changes
    let lastWidth = width;
    window.addEventListener('resize', () => {
      if (window.innerWidth !== lastWidth || Math.abs(window.innerHeight - height) > 120) {
        lastWidth = window.innerWidth;
        resize();
        if (reduceMotion) drawStill();
      }
    });

    // Re-colour when the theme toggle changes data-theme
    new MutationObserver(() => {
      readColors();
      clear();
      if (reduceMotion) drawStill();
    }).observe(document.documentElement, { attributes: true, attributeFilter: ['data-theme'] });

    // Reduced motion: paint one frozen frame instead of animating
    function drawStill() {
      drops = drops.map(() => Math.random() * (height / FONT_SIZE));
      for (let n = 0; n < 40; n++) step();
    }
    if (reduceMotion) {
      drawStill();
      return;
    }

    let last = 0;
    function loop(now) {
      if (now - last >= FRAME_MS) {
        last = now;
        step();
      }
      requestAnimationFrame(loop);
    }
    requestAnimationFrame(loop);
  }

  /* ── Text decode / scramble ─────────────────────────────── */
  /**
   * Scrambles an element's text into random glyphs, then "decodes"
   * it back left-to-right. Only for elements containing plain text.
   */
  function scramble(el, duration = 900) {
    if (!el || reduceMotion) return;
    const finalText = el.textContent;
    const token = Symbol('scramble');
    el._scrambleToken = token; // a newer call cancels an older one

    const revealAt = [...finalText].map((_, i, arr) =>
      (i / arr.length) * duration * 0.7 + Math.random() * duration * 0.3
    );
    // Screen readers should hear the real text, not the noise
    el.setAttribute('aria-label', finalText);

    const start = performance.now();
    let written = finalText;
    function frame(now) {
      if (el._scrambleToken !== token) return;
      // Someone else (e.g. the i18n engine) replaced the text: stop here
      if (el.textContent !== written) {
        el.removeAttribute('aria-label');
        el._scrambleToken = null;
        return;
      }
      const t = now - start;
      let out = '';
      let done = true;
      [...finalText].forEach((ch, i) => {
        if (t >= revealAt[i] || ch === ' ') {
          out += ch;
        } else {
          out += randomFrom(SCRAMBLE_GLYPHS);
          done = false;
        }
      });
      el.textContent = written = out;
      if (done) {
        el.textContent = finalText;
        el.removeAttribute('aria-label');
        el._scrambleToken = null;
      } else {
        requestAnimationFrame(frame);
      }
    }
    requestAnimationFrame(frame);
  }

  /** Scramble section titles the first time they scroll into view */
  function initTitleScramble() {
    const titles = document.querySelectorAll('.section__title');
    const observer = new IntersectionObserver(entries => {
      entries.forEach(entry => {
        if (!entry.isIntersecting) return;
        entry.target.dataset.decoded = 'true';
        scramble(entry.target);
        observer.unobserve(entry.target);
      });
    }, { threshold: 0.6 });
    titles.forEach(t => observer.observe(t));

    // Nav links decode on hover
    document.querySelectorAll('.nav__links a').forEach(a => {
      a.addEventListener('mouseenter', () => {
        if (!a._scrambleToken) scramble(a, 400);
      });
    });

    // After a language switch, replay the effect on titles already seen
    document.addEventListener('langchange', () => {
      document.querySelectorAll('.section__title[data-decoded]').forEach(t => scramble(t, 600));
      syncGlitchText();
      scramble(document.querySelector('.hero__name'), 700);
    });
  }

  /** The glitch layers (CSS ::before/::after) copy the name via data-text */
  function syncGlitchText() {
    const name = document.querySelector('.hero__name');
    if (name) name.dataset.text = name.textContent;
  }

  /* ── Boot sequence ──────────────────────────────────────── */
  const BOOT_LINES = [
    'Wake up, Neo...',
    'The Matrix has you...',
    'Follow the white rabbit.',
  ];

  /** Returns a Promise that resolves once the boot screen is gone */
  function runBoot() {
    const root = document.documentElement;
    const boot = document.getElementById('boot');
    const text = document.getElementById('bootText');

    // The inline script in <head> decides whether to boot (once per tab session)
    if (!boot || !text || !root.classList.contains('booting')) {
      if (boot) boot.remove();
      return Promise.resolve();
    }
    try { sessionStorage.setItem('matrix-booted', '1'); } catch (e) { /* storage blocked */ }

    return new Promise(resolve => {
      let finished = false;
      const timers = [];
      const later = (fn, ms) => timers.push(setTimeout(fn, ms));

      function onKey(e) {
        e.preventDefault(); // stop Space/arrows from also scrolling the page
        finish();
      }

      function finish() {
        if (finished) return;
        finished = true;
        timers.forEach(clearTimeout);
        boot.classList.add('boot--done');
        document.removeEventListener('keydown', onKey);
        setTimeout(() => {
          root.classList.remove('booting');
          boot.remove();
        }, 650);
        resolve();
      }

      boot.addEventListener('click', finish);
      document.addEventListener('keydown', onKey);

      // Type each line character by character, clear, then the next line
      let delay = 400;
      BOOT_LINES.forEach(line => {
        later(() => { text.textContent = ''; }, delay);
        [...line].forEach((ch, i) => {
          later(() => { text.textContent += ch; }, delay + 30 + i * 45);
        });
        delay += 30 + line.length * 45 + 750;
      });
      later(finish, delay);
    });
  }

  /* ── Public API ─────────────────────────────────────────── */
  let bootDone = Promise.resolve();

  function init() {
    syncGlitchText();
    initRain();
    initTitleScramble();
    bootDone = runBoot();
  }

  return {
    init,
    scramble,
    whenBooted: () => bootDone,
  };
})();
