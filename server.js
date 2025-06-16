// server.js
// Express server to proxy weather requests and keep API key secret
require('dotenv').config();
const express = require('express');
const fetch = (...args) => import('node-fetch').then(({default: fetch}) => fetch(...args));
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

app.get('/api/weather', async (req, res) => {
  const apiKey = process.env.WEATHERAPI_KEY;
  console.log('API KEY:', apiKey); // Debug
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not set' });
  }
  const location = req.query.location || 'Siem Reap';
  const url = `https://api.weatherapi.com/v1/current.json?key=${apiKey}&q=${encodeURIComponent(location)}&aqi=no`;
  console.log('Requesting:', url); // Debug
  try {
    const response = await fetch(url);
    console.log('WeatherAPI status:', response.status); // Debug
    const text = await response.text();
    console.log('WeatherAPI raw response:', text); // Debug
    if (!response.ok) throw new Error('Weather API error');
    const data = JSON.parse(text);
    res.json(data);
  } catch (e) {
    console.error('WeatherAPI fetch error:', e); // Debug
    res.status(500).json({ error: 'Weather unavailable' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
