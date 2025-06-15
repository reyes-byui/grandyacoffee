// scripts/fade-in-images.js
// Adds fade-in effect to images when they enter the viewport

document.addEventListener('DOMContentLoaded', function() {
  const images = document.querySelectorAll('img.fade-in');
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    images.forEach(img => observer.observe(img));
  } else {
    // Fallback for browsers without IntersectionObserver
    images.forEach(img => img.classList.add('visible'));
  }
});
