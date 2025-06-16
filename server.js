// server.js
// Express server to proxy weather requests and keep API key secret
require('dotenv').config();
const express = require('express');
const fetch = require('node-fetch');
const path = require('path');

const app = express();
const PORT = process.env.PORT || 3000;

// Serve static files
app.use(express.static(path.join(__dirname)));

app.get('/api/weather', async (req, res) => {
  const apiKey = process.env.WEATHERBIT_API_KEY;
  if (!apiKey) {
    return res.status(500).json({ error: 'API key not set' });
  }
  const lat = req.query.lat || '13.367685988771248';
  const lon = req.query.lon || '103.84851522543664';
  const url = `https://api.weatherbit.io/v2.0/current?lat=${lat}&lon=${lon}&key=${apiKey}&units=M`;
  try {
    const response = await fetch(url);
    if (!response.ok) throw new Error('Weather API error');
    const data = await response.json();
    res.json(data);
  } catch (e) {
    res.status(500).json({ error: 'Weather unavailable' });
  }
});

app.listen(PORT, () => {
  console.log(`Server running on http://localhost:${PORT}`);
});
