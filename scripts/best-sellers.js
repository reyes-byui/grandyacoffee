// scripts/best-sellers.js
// Renders best sellers cards from json/best-sellers.json into #best-sellers
document.addEventListener('DOMContentLoaded', function() {
    var bestSellersDiv = document.getElementById('best-sellers');
    if (!bestSellersDiv) return;
    fetch('json/best-sellers.json')
        .then(response => response.json())
        .then(items => {
            bestSellersDiv.innerHTML = items.map(item => `
                <div class="best-seller-card" data-id="${item['data-id']}">
                    <img src="${item.image}" alt="${item.name}" class="best-seller-image">
                    <h3 class="best-seller-name">${item.name}</h3>
                    <p class="best-seller-description">${item.description}</p>
                </div>
            `).join('');
        });
});
