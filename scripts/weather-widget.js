// weather-widget.js
// Fetches and displays current temperature and weather info in Siem Reap using Weatherbit API

(async function() {
    const widget = document.getElementById('weather-widget');
    if (!widget) return;

    // For security, the API key should be injected server-side or via a serverless function in production.
    // For static demo, we fetch from .env (not secure for production, but works for local dev)
    // In production, use a serverless function to proxy the request and hide the key.
    const apiKey = window.WEATHERBIT_API_KEY || "285587920f3e47319849dd6f4a47947d";
    const lat = 13.367685988771248;
    const lon = 103.84851522543664;
    const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=M`;

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
