// Highlight the active navbar link based on the current page
(function() {
    const navLinks = document.querySelectorAll('.navbar a');
    const currentPath = window.location.pathname.replace(/\/+/g, '/');
    navLinks.forEach(link => {
        // Normalize both paths for comparison
        const linkPath = link.getAttribute('href').replace(/\/+/g, '/');
        if (linkPath === currentPath || (linkPath.endsWith('index.html') && (currentPath === '/' || currentPath === '/index.html'))) {
            link.classList.add('active');
        }
    });
})();
