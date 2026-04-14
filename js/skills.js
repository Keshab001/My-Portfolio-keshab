/* ============================================================
   skills.js — Skill data + bar rendering + IntersectionObserver
   ============================================================ */
const skillsManager = (() => {
  // Edit these to match your actual skills
  const skills = {
    languages: [
      { name: 'JavaScript',  level: 90 },
      { name: 'TypeScript',  level: 80 },
      { name: 'Python',      level: 75 },
      { name: 'HTML / CSS',  level: 95 },
      { name: 'SQL',         level: 70 },
    ],
    frameworks: [
      { name: 'React',       level: 85 },
      { name: 'Node.js',     level: 80 },
      { name: 'Express',     level: 78 },
      { name: 'Vue.js',      level: 65 },
    ],
    tools: [
      'Git', 'Docker', 'AWS', 'Linux',
      'Figma', 'PostgreSQL', 'MongoDB',
      'REST APIs', 'GraphQL', 'CI/CD',
      'Jest', 'Webpack',
    ]
  };

  /** Build the skill bar HTML for one category */
  function buildBars(containerId, skillList) {
    const el = document.getElementById(containerId);
    if (!el) return;

    el.innerHTML = skillList.map(s => `
      <div class="skill-bar reveal" style="--skill-level: ${s.level}%">
        <div class="skill-bar__header">
          <span class="skill-bar__name">${s.name}</span>
          <span class="skill-bar__percent">${s.level}%</span>
        </div>
        <div class="skill-bar__track">
          <div class="skill-bar__fill"></div>
        </div>
      </div>
    `).join('');
  }

  /** Build tool chip cloud */
  function buildChips(containerId, items) {
    const el = document.getElementById(containerId);
    if (!el) return;
    el.innerHTML = items.map(tool =>
      `<span class="skill-chip reveal">${tool}</span>`
    ).join('');
  }

  /**
   * Observe .skill-bar elements.
   * On entry: add .animate (triggers CSS width transition) and .visible (fade-up).
   */
  function setupObserver() {
    const observer = new IntersectionObserver((entries) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          // Small delay so fade-up and bar-fill start together
          requestAnimationFrame(() => {
            el.classList.add('visible');
            el.classList.add('animate');
          });
          observer.unobserve(el);
        }
      });
    }, { threshold: 0.25 });

    document.querySelectorAll('.skill-bar').forEach(el => observer.observe(el));
  }

  function init() {
    buildBars('skillsLang',      skills.languages);
    buildBars('skillsFrameworks', skills.frameworks);
    buildChips('skillsTools',    skills.tools);
    // Observer setup is called after build so the newly created elements are observed
    setupObserver();
  }

  return { init, skills };
})();
