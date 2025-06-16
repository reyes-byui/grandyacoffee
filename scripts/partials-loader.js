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
            // Load weather widget script after header is injected
            const weatherScript = document.createElement('script');
            weatherScript.src = '/scripts/weather-widget.js';
            weatherScript.defer = true;
            document.body.appendChild(weatherScript);
            // Load navbar active script after header is injected
            const navbarActiveScript = document.createElement('script');
            navbarActiveScript.src = '/scripts/navbar-active.js';
            navbarActiveScript.defer = true;
            document.body.appendChild(navbarActiveScript);
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
            // Load footer active script after footer is injected
            const footerActiveScript = document.createElement('script');
            footerActiveScript.src = '/scripts/footer-active.js';
            footerActiveScript.defer = true;
            document.body.appendChild(footerActiveScript);
        });
});
