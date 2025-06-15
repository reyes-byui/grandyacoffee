// scripts/heading-slide-in.js
// Adds slide-in-from-left effect to all h1-h6 when they enter the viewport
// Also adds slide-in-from-right effect to all p tags

document.addEventListener('DOMContentLoaded', function() {
  const headings = document.querySelectorAll('h1, h2, h3, h4, h5, h6');
  headings.forEach(h => h.classList.add('slide-in-left'));
  const paragraphs = document.querySelectorAll('p');
  paragraphs.forEach(p => p.classList.add('slide-in-right'));
  if ('IntersectionObserver' in window) {
    const observer = new IntersectionObserver((entries, obs) => {
      entries.forEach(entry => {
        if (entry.isIntersecting) {
          entry.target.classList.add('visible');
          obs.unobserve(entry.target);
        }
      });
    }, { threshold: 0.1 });
    headings.forEach(h => observer.observe(h));
    paragraphs.forEach(p => observer.observe(p));
  } else {
    // Fallback for browsers without IntersectionObserver
    headings.forEach(h => h.classList.add('visible'));
    paragraphs.forEach(p => p.classList.add('visible'));
  }
});
