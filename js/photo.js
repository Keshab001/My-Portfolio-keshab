/* ============================================================
   photo.js — Client-side profile photo upload
   FileReader API + Canvas resize + localStorage persistence
   ============================================================ */
const photoManager = (() => {
  const STORAGE_KEY = 'portfolio-profile-photo';
  const MAX_SIZE    = 5 * 1024 * 1024; // 5 MB
  const MAX_DIM     = 400;             // max canvas dimension

  /** Set the <img> src and trigger fade-in */
  function setPhotoSrc(dataUrl) {
    const img = document.getElementById('profilePhoto');
    if (!img) return;
    img.style.opacity = '0';
    img.style.transition = 'opacity 0.4s ease';
    img.onload = () => { img.style.opacity = '1'; };
    img.src = dataUrl;
  }

  /** Load photo saved in localStorage */
  function loadSaved() {
    try {
      const saved = localStorage.getItem(STORAGE_KEY);
      if (saved) setPhotoSrc(saved);
    } catch (e) {
      // localStorage may be unavailable in some contexts
    }
  }

  /**
   * Resize image data URL to maxW × maxH using Canvas,
   * apply a circular clip, and return a smaller JPEG.
   */
  function resizeImage(dataUrl, maxW, maxH, callback) {
    const img = new Image();
    img.onload = function () {
      let { width, height } = img;

      // Maintain aspect ratio
      if (width > maxW || height > maxH) {
        const ratio = Math.min(maxW / width, maxH / height);
        width  = Math.round(width  * ratio);
        height = Math.round(height * ratio);
      }

      const canvas = document.createElement('canvas');
      canvas.width  = width;
      canvas.height = height;
      const ctx = canvas.getContext('2d');

      // Circular clip
      const cx = width / 2, cy = height / 2;
      const r  = Math.min(width, height) / 2;
      ctx.beginPath();
      ctx.arc(cx, cy, r, 0, Math.PI * 2);
      ctx.clip();
      ctx.drawImage(img, 0, 0, width, height);

      callback(canvas.toDataURL('image/jpeg', 0.88));
    };
    img.src = dataUrl;
  }

  /** Handle file input change or drop event */
  function processFile(file) {
    if (!file) return;

    if (!file.type.startsWith('image/')) {
      showToast('Please select an image file (JPEG, PNG, WebP, etc.)', 'error');
      return;
    }
    if (file.size > MAX_SIZE) {
      showToast('Image must be smaller than 5 MB.', 'error');
      return;
    }

    const reader = new FileReader();
    reader.onload = e => {
      resizeImage(e.target.result, MAX_DIM, MAX_DIM, resized => {
        try {
          localStorage.setItem(STORAGE_KEY, resized);
        } catch (storageErr) {
          // Quota exceeded — show without persisting
        }
        setPhotoSrc(resized);
      });
    };
    reader.readAsDataURL(file);
  }

  /** Simple toast helper */
  function showToast(message, type = 'info') {
    const existing = document.querySelector('.toast');
    if (existing) existing.remove();

    const toast = document.createElement('div');
    toast.className = `toast toast--${type}`;
    toast.textContent = message;
    document.body.appendChild(toast);
    setTimeout(() => toast.remove(), 3500);
  }

  function init() {
    loadSaved();

    // Click-to-upload via file input
    const input = document.getElementById('photoInput');
    if (input) {
      input.addEventListener('change', e => processFile(e.target.files[0]));
    }

    // Drag-and-drop onto the photo wrapper
    const wrapper = document.querySelector('.hero__photo-wrapper');
    if (wrapper) {
      wrapper.addEventListener('dragover', e => {
        e.preventDefault();
        wrapper.classList.add('drag-over');
      });
      wrapper.addEventListener('dragleave', e => {
        if (!wrapper.contains(e.relatedTarget)) {
          wrapper.classList.remove('drag-over');
        }
      });
      wrapper.addEventListener('drop', e => {
        e.preventDefault();
        wrapper.classList.remove('drag-over');
        const file = e.dataTransfer.files[0];
        if (file) processFile(file);
      });
    }
  }

  return { init };
})();
