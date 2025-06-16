// Highlight the active footer link based on the current page
(function() {
    const footerLinks = document.querySelectorAll('.footer-links a');
    const currentPath = window.location.pathname.replace(/\/+/g, '/');
    footerLinks.forEach(link => {
        const linkPath = link.getAttribute('href').replace(/\/+/g, '/');
        if (linkPath === currentPath) {
            link.classList.add('active');
        }
    });
})();
