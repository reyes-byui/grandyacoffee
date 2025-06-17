document.addEventListener('DOMContentLoaded', function() {
    fetch('/partials/header.html')
        .then(response => response.text())
        .then(data => {
            const headerContainer = document.getElementById('header-container');
            if (headerContainer) headerContainer.innerHTML = data;
            const weatherScript = document.createElement('script');
            weatherScript.src = '/scripts/weather-widget.js';
            weatherScript.defer = true;
            document.body.appendChild(weatherScript);
            const navbarActiveScript = document.createElement('script');
            navbarActiveScript.src = '/scripts/navbar-active.js';
            navbarActiveScript.defer = true;
            document.body.appendChild(navbarActiveScript);
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
                const navLinks = document.querySelectorAll('.navbar a');
                navLinks.forEach(function(link) {
                    link.addEventListener('click', function() {
                        headerElem.classList.remove('active');
                        overlay.classList.remove('active');
                    });
                });
            }
        });

    fetch('/partials/footer.html')
        .then(response => response.text())
        .then(data => {
            const footer = document.getElementById('footer');
            if (footer) footer.innerHTML = data;
            // Set current year in footer
            var yearSpan = document.getElementById('year');
            if (yearSpan) {
                yearSpan.textContent = new Date().getFullYear();
            }
            const footerActiveScript = document.createElement('script');
            footerActiveScript.src = '/scripts/footer-active.js';
            footerActiveScript.defer = true;
            document.body.appendChild(footerActiveScript);
        });
});
