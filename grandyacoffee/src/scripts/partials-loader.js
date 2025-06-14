// scripts/partials-loader.js
// Dynamically loads header and footer partials into pages

document.addEventListener('DOMContentLoaded', function() {
    // Load header
    fetch('/partials/header.html')
        .then(response => response.text())
        .then(data => {
            // Load header partial into #header-container (not #header)
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) headerContainer.innerHTML = data;
            // --- Mobile menu toggle logic ---
            const menuToggle = document.querySelector('.menu-toggle');
            const headerElem = document.getElementById('header');
            const closeBtn = document.querySelector('.header-close');
            const overlay = document.querySelector('.mobile-menu-overlay');
            if (menuToggle && headerElem && closeBtn && overlay) {
                menuToggle.addEventListener('click', function() {
                    headerElem.classList.add('active');
                    overlay.classList.add('active');
                });
                closeBtn.addEventListener('click', function() {
                    headerElem.classList.remove('active');
                    overlay.classList.remove('active');
                });
                overlay.addEventListener('click', function() {
                    headerElem.classList.remove('active');
                    overlay.classList.remove('active');
                });
                // Optionally close menu when a navbar link is clicked
                const navLinks = document.querySelectorAll('.navbar a');
                navLinks.forEach(function(link) {
                    link.addEventListener('click', function() {
                        headerElem.classList.remove('active');
                        overlay.classList.remove('active');
                    });
                });
            }
        });

    // Load footer
    fetch('/partials/footer.html')
        .then(response => response.text())
        .then(data => {
            const footer = document.getElementById('footer');
            if (footer) footer.innerHTML = data;
        });
});
