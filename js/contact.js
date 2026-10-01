/* ============================================================
   contact.js — Form validation + mailto fallback
   ============================================================ */
const contactManager = (() => {
  const EMAIL_RE = /^[^\s@]+@[^\s@]+\.[^\s@]{2,}$/;

  /** Validate a single field; show/hide its error span */
  function validateField(field) {
    const errorEl = field.parentElement.querySelector('.form-error');
    let valid = true;

    if (!field.value.trim()) {
      valid = false;
    } else if (field.type === 'email' && !EMAIL_RE.test(field.value.trim())) {
      valid = false;
    }

    field.classList.toggle('invalid', !valid);
    if (errorEl) errorEl.style.display = valid ? 'none' : 'block';
    return valid;
  }

  /** Validate all required fields in the form */
  function validateForm(form) {
    let allValid = true;
    form.querySelectorAll('[required]').forEach(field => {
      if (!validateField(field)) allValid = false;
    });
    return allValid;
  }

  function init() {
    const form = document.getElementById('contactForm');
    if (!form) return;

    // Real-time: clear error on input, re-validate on blur
    form.querySelectorAll('[required]').forEach(field => {
      field.addEventListener('input', () => {
        field.classList.remove('invalid');
        const err = field.parentElement.querySelector('.form-error');
        if (err) err.style.display = 'none';
      });
      field.addEventListener('blur', () => validateField(field));
    });

    form.addEventListener('submit', e => {
      e.preventDefault();
      if (!validateForm(form)) return;

      const name    = form.querySelector('#contactName').value.trim();
      const email   = form.querySelector('#contactEmail').value.trim();
      const message = form.querySelector('#contactMessage').value.trim();

      // mailto: fallback — no backend needed
      const subject = encodeURIComponent(`Portfolio Contact from ${name}`);
      const body    = encodeURIComponent(`Name: ${name}\nEmail: ${email}\n\nMessage:\n${message}`);
      window.location.href = `mailto:keshab.nagato@gmail.com?subject=${subject}&body=${body}`;

      // Show success state
      const successMsg = typeof i18n !== 'undefined' ? i18n.t('contact.success') : "Message sent! I'll get back to you soon.";
      form.innerHTML = `
        <div class="contact__success">
          <p>${successMsg}</p>
        </div>
      `;
    });
  }

  return { init };
})();
