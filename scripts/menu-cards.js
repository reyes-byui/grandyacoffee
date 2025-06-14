// scripts/menu-cards.js
// Dynamically populate menu sections with cards from JSON files

function createMenuCard(item) {
    // Support both 'image' and 'image-url' keys, and both local and remote images
    const imageUrl = item["image-url"] || item.image || "";
    const src = imageUrl.startsWith("http") ? imageUrl : (imageUrl ? `images/${imageUrl}` : "images/placeholder.jpg");
    return `
        <div class="menu-card">
            <img src="${src}" alt="${item.name}" class="menu-image">
            <h4>${item.name}</h4>
            <p class="menu-desc">${item.description}</p>
            <p class="menu-price">$${item.price}</p>
        </div>
    `;
}

function renderMenuSection(sectionId, jsonFile) {
    const section = document.getElementById(sectionId);
    if (!section) return;
    // Pagination state per section
    if (!renderMenuSection.pageMap) renderMenuSection.pageMap = {};
    const pageMap = renderMenuSection.pageMap;
    if (!pageMap[sectionId]) pageMap[sectionId] = 0;
    const page = pageMap[sectionId];
    const ITEMS_PER_PAGE = 3;

    // Use correct relative path for JSON files
    fetch(`../json/${jsonFile}`)
        .then(res => res.json())
        .then(data => {
            // Clamp page
            const maxPage = Math.max(0, Math.ceil(data.length / ITEMS_PER_PAGE) - 1);
            pageMap[sectionId] = Math.min(page, maxPage);
            const start = pageMap[sectionId] * ITEMS_PER_PAGE;
            const end = start + ITEMS_PER_PAGE;
            const items = data.slice(start, end);
            let html = '<div class="menu-grid">';
            items.forEach(item => {
                html += createMenuCard(item);
            });
            html += '</div>';
            // Pagination controls
            html += `<div class="menu-pagination">
                <button class="menu-prev" ${pageMap[sectionId] === 0 ? 'disabled' : ''}>Previous</button>
                <span class="menu-page"> ${pageMap[sectionId] + 1} / ${maxPage + 1}</span>
                <button class="menu-next" ${pageMap[sectionId] === maxPage ? 'disabled' : ''}>Next</button>
            </div>`;
            section.innerHTML = html;
            // Add event listeners for pagination
            const prevBtn = section.querySelector('.menu-prev');
            const nextBtn = section.querySelector('.menu-next');
            if (prevBtn) prevBtn.onclick = () => {
                pageMap[sectionId] = Math.max(0, pageMap[sectionId] - 1);
                renderMenuSection(sectionId, jsonFile);
            };
            if (nextBtn) nextBtn.onclick = () => {
                pageMap[sectionId] = Math.min(maxPage, pageMap[sectionId] + 1);
                renderMenuSection(sectionId, jsonFile);
            };
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
    renderAllMenus();

    // DRINKS category toggle
    const drinksBtns = document.querySelectorAll('.drinks-cat-btn');
    const drinksSections = document.querySelectorAll('.drinks-section');
    if (drinksBtns.length && drinksSections.length) {
        function showDrinksSection(targetId) {
            drinksSections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.style.display = 'block';
                } else {
                    sec.style.display = 'none';
                }
            });
            drinksBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.target === targetId);
            });
        }
        // Show first by default
        showDrinksSection(drinksBtns[0].dataset.target);
        drinksBtns.forEach(btn => {
            btn.addEventListener('click', () => showDrinksSection(btn.dataset.target));
        });
    }

    // FOOD category toggle
    const foodBtns = document.querySelectorAll('.food-cat-btn');
    const foodSections = document.querySelectorAll('.food-section');
    if (foodBtns.length && foodSections.length) {
        function showFoodSection(targetId) {
            foodSections.forEach(sec => {
                if (sec.id === targetId) {
                    sec.style.display = 'block';
                } else {
                    sec.style.display = 'none';
                }
            });
            foodBtns.forEach(btn => {
                btn.classList.toggle('active', btn.dataset.target === targetId);
            });
        }
        // Show first by default
        showFoodSection(foodBtns[0].dataset.target);
        foodBtns.forEach(btn => {
            btn.addEventListener('click', () => showFoodSection(btn.dataset.target));
        });
    }
});
