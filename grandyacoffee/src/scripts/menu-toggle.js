// scripts/menu.js
// Handles toggling between food and drinks menu on the menu page
function setupMenuToggle() {
    const foodBtn = document.getElementById('food-btn');
    const drinksBtn = document.getElementById('drinks-btn');
    const foodMenu = document.getElementById('food-menu');
    const drinksMenu = document.getElementById('drinks-menu');
    if (!foodBtn || !drinksBtn || !foodMenu || !drinksMenu) return;

    // Set initial state: drinks active by default
    drinksBtn.classList.add('active');
    foodBtn.classList.remove('active');
    drinksMenu.classList.add('active');
    foodMenu.classList.remove('active');

    foodBtn.addEventListener('click', function() {
        foodMenu.classList.add('active');
        drinksMenu.classList.remove('active');
        foodBtn.classList.add('active');
        drinksBtn.classList.remove('active');
        // Scroll to fnb-menu
        document.getElementById('fnb-menu').scrollIntoView({ behavior: 'smooth' });
    });
    drinksBtn.addEventListener('click', function() {
        foodMenu.classList.remove('active');
        drinksMenu.classList.add('active');
        drinksBtn.classList.add('active');
        foodBtn.classList.remove('active');
        // Scroll to fnb-menu
        document.getElementById('fnb-menu').scrollIntoView({ behavior: 'smooth' });
    });
}

// Expose for dynamic page loads
window.setupMenuToggle = setupMenuToggle;

function trySetupMenuToggle() {
    const foodBtn = document.getElementById('food-btn');
    const drinksBtn = document.getElementById('drinks-btn');
    const foodMenu = document.getElementById('food-menu');
    const drinksMenu = document.getElementById('drinks-menu');
    if (foodBtn && drinksBtn && foodMenu && drinksMenu) {
        setupMenuToggle();
    }
}

// Try to run on DOMContentLoaded
if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', trySetupMenuToggle);
} else {
    trySetupMenuToggle();
}

function createCard(item) {
    return `
        <div class="menu-card">
            <h4>${item.name}</h4>
            <p class="menu-desc">${item.description}</p>
            <p class="menu-price">$${item.price}</p>
        </div>
    `;
}

function renderMenuSection(sectionId, jsonFile) {
    fetch(`json/${jsonFile}`)
        .then(res => res.json())
        .then(data => {
            const section = document.getElementById(sectionId);
            if (!section) return;
            let html = '<div class="menu-grid">';
            data.forEach(item => {
                html += createCard(item);
            });
            html += '</div>';
            section.innerHTML = html;
        });
}

function renderAllMenus() {
    renderMenuSection('breakfast', 'breakfast.json');
    renderMenuSection('pastries', 'bakery-menu.json');
    renderMenuSection('lunch', 'lunch.json');
    renderMenuSection('iced-drinks', 'iced-drinks.json');
    renderMenuSection('hot-drinks', 'hot-drinks.json');
    renderMenuSection('smoothies', 'smoothie.json');
    renderMenuSection('frappes', 'frappe.json');
}

window.renderAllMenus = renderAllMenus;

document.addEventListener('DOMContentLoaded', function() {
    if (document.getElementById('fnb-menu')) {
        renderAllMenus();
    }
});

function closeMenu() {
    const header = document.getElementById('header');
    const overlay = document.getElementById('overlay');
    if (!header || !overlay) return;
    header.classList.remove('active');
    header.classList.add('closing');
    overlay.classList.remove('active');
    // Wait for animation to finish, then hide
    setTimeout(() => {
        header.classList.remove('closing');
    }, 500); // match animation duration
}

// scripts/menu-toggle.js
// Handles header mobile menu toggle and debug logging

function getHeaderElements() {
    return {
        menuToggle: document.querySelector('.menu-toggle'),
        header: document.getElementById('header'),
        closeBtn: document.querySelector('.header-close'),
        overlay: document.querySelector('.mobile-menu-overlay'),
        navLinks: document.querySelectorAll('.navbar a')
    };
}

function openHeaderMenu() {
    const { header, overlay } = getHeaderElements();
    if (header && overlay) {
        header.classList.add('active');
        overlay.classList.add('active');
        console.log('Header menu opened');
    }
}

function closeHeaderMenu() {
    const { header, overlay } = getHeaderElements();
    if (header && overlay) {
        header.classList.remove('active');
        overlay.classList.remove('active');
        console.log('Header menu closed');
    }
}

function setupHeaderMenuToggle() {
    const { menuToggle, header, closeBtn, overlay, navLinks } = getHeaderElements();
    if (!menuToggle || !header || !closeBtn || !overlay) {
        console.log('Menu toggle setup: missing element', { menuToggle, header, closeBtn, overlay });
        return;
    }
    menuToggle.addEventListener('click', openHeaderMenu);
    closeBtn.addEventListener('click', closeHeaderMenu);
    overlay.addEventListener('click', closeHeaderMenu);
    document.addEventListener('click', function(e) {
        if (header.classList.contains('active') && !header.contains(e.target) && e.target !== menuToggle && e.target !== overlay) {
            closeHeaderMenu();
        }
    });
    navLinks.forEach(function(link) {
        link.addEventListener('click', closeHeaderMenu);
    });
}

// Expose for loader
window.setupHeaderMenuToggle = setupHeaderMenuToggle;
