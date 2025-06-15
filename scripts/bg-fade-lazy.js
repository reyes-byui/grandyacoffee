// scripts/bg-fade-lazy.js
// Lazy load and fade-in background images using Intersection Observer

document.addEventListener('DOMContentLoaded', function() {
  const bgEls = document.querySelectorAll('.bg-fade[data-bg]');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          const el = entry.target;
          el.style.backgroundImage = `url('${el.dataset.bg}')`;
          el.classList.add('visible');
          obs.unobserve(el);
        }
      });
    }, { threshold: 0.1 });
    bgEls.forEach(el => observer.observe(el));
  } else {
    // Fallback: load all backgrounds immediately
    bgEls.forEach(el => {
      el.style.backgroundImage = `url('${el.dataset.bg}')`;
      el.classList.add('visible');
    });
  }
});
