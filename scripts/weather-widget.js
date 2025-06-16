// weather-widget.js
// Fetches and displays current temperature and weather info in Siem Reap using Weatherbit API

(async function() {
    const widget = document.getElementById('weather-widget');
    if (!widget) return;

    // Get API key from injected environment variable only (do not hardcode fallback)
    const apiKey = window.WEATHERBIT_API_KEY;
    if (!apiKey) {
        widget.innerHTML = 'Weather unavailable';
        return;
    }

    // Fetch from local Express server to keep API key hidden
    const lat = 13.367685988771248;
    const lon = 103.84851522543664;
    const url = `/api/weather?lat=${lat}&lon=${lon}`;

    try {
        const res = await fetch(url);
        if (!res.ok) throw new Error('Weather API error');
        const data = await res.json();
        const weatherData = data.data && data.data[0];
        const weather = weatherData && weatherData.weather;
        const temp = weatherData && weatherData.temp;
        const country = weatherData && weatherData.country_code;
        if (typeof temp === 'number' && weather && country) {
            const iconUrl = `https://www.weatherbit.io/static/img/icons/${weather.icon}.png`;
            widget.innerHTML = `
                <img src="${iconUrl}" alt="${weather.description}" style="vertical-align:middle;width:32px;height:32px;"> 
                <span><strong>${temp}&deg;C</strong></span><br>
                <span>${weather.description} (${country})</span>
            `;
        } else {
            widget.innerHTML = 'Weather unavailable';
        }
    } catch (e) {
        widget.innerHTML = 'Weather unavailable';
    }
})();
