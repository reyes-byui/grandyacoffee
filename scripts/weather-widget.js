// weather-widget.js
// Fetches and displays current temperature and weather info in Siem Reap using your server's /api/weather endpoint (API key stays hidden)

(function () {
  const widget = document.getElementById('weather-widget');
  if (!widget) return;

  const location = 'Siem Reap';

  widget.textContent = 'Loading weather...';

  fetch('/.netlify/functions/weather?location=' + encodeURIComponent(location))
    .then(res => res.json())
    .then(data => {
      if (data && data.current) {
        const temp = data.current.temp_c;
        const condition = data.current.condition && data.current.condition.text;
        const icon = data.current.condition && data.current.condition.icon;
        if (typeof temp === 'number' && condition && icon) {
          widget.innerHTML = `
            <span style="font-weight:bold;">${data.location.name} Weather:</span>
            <img src="${icon}" alt="${condition}" style="vertical-align:middle;">
            <span>${temp}&deg;C, ${condition}</span>
          `;
        } else {
          widget.textContent = 'Weather unavailable';
        }
      } else {
        widget.textContent = 'Weather unavailable';
      }
    })
    .catch(() => {
      widget.textContent = 'Weather unavailable';
    });
})();
