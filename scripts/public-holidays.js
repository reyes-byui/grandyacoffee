// Fetch and display upcoming public holidays for Cambodia using Calendarific API
// Injects holidays into #public-holidays-list in contact.html

const apiKey = (window.PUBLIC_HOLIDAY_API_KEY) || 'nTL5mMKHxQmHTNOdKuPABrC74Hy1oxtu';
const country = 'KH'; // Cambodia
const year = new Date().getFullYear();

async function fetchPublicHolidays() {
    const url = `https://calendarific.com/api/v2/holidays?api_key=${apiKey}&country=${country}&year=${year}`;
    try {
        const res = await fetch(url);
        const data = await res.json();
        if (data && data.response && data.response.holidays) {
            renderHolidays(data.response.holidays);
        } else {
            document.getElementById('public-holidays-list').innerHTML = '<li>No data available.</li>';
        }
    } catch (err) {
        document.getElementById('public-holidays-list').innerHTML = '<li>Error loading holidays.</li>';
    }
}

function renderHolidays(holidays) {
    // Show only next 3 upcoming holidays
    const today = new Date();
    const upcoming = holidays.filter(h => new Date(h.date.iso) >= today)
        .sort((a, b) => new Date(a.date.iso) - new Date(b.date.iso))
        .slice(0, 3);
    if (upcoming.length === 0) {
        document.getElementById('public-holidays-list').innerHTML = '<li>No upcoming holidays.</li>';
        return;
    }
    document.getElementById('public-holidays-list').innerHTML = upcoming.map(h => `
        <li>
            <strong>${h.name}</strong> (${h.date.iso})<br>
            <em>${h.type.join(', ')}</em><br>
            <span>${h.description}</span>
        </li>
    `).join('');
}

document.addEventListener('DOMContentLoaded', fetchPublicHolidays);
