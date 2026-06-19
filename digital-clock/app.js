// Default timezones to display
const DEFAULT_TIMEZONES = [
    'America/New_York',
    'Europe/London',
    'Asia/Tokyo',
    'Australia/Sydney'
];

// Initialize app
let timezones = [];

// Load timezones from localStorage
function loadTimezones() {
    const stored = localStorage.getItem('timezones');
    if (stored) {
        timezones = JSON.parse(stored);
    } else {
        timezones = [...DEFAULT_TIMEZONES];
        saveTimezones();
    }
}

// Save timezones to localStorage
function saveTimezones() {
    localStorage.setItem('timezones', JSON.stringify(timezones));
}

// Get all available timezones
function getAvailableTimezones() {
    return Intl.supportedValuesOf('timeZone');
}

// Validate timezone
function isValidTimezone(tz) {
    return getAvailableTimezones().includes(tz);
}

// Format time for a specific timezone
function getTimeInTimezone(timezone) {
    const now = new Date();
    const formatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const dateFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: timezone,
        weekday: 'short',
        year: 'numeric',
        month: 'short',
        day: 'numeric'
    });

    const time = formatter.format(now);
    const date = dateFormatter.format(now);

    // Calculate UTC offset
    const utcFormatter = new Intl.DateTimeFormat('en-US', {
        timeZone: 'UTC',
        hour: '2-digit',
        minute: '2-digit',
        second: '2-digit',
        hour12: false
    });

    const utcTime = utcFormatter.format(now);
    const localTime = formatter.format(now);

    const utcDate = new Date(now.toLocaleString('en-US', { timeZone: 'UTC' }));
    const tzDate = new Date(now.toLocaleString('en-US', { timeZone: timezone }));
    const diffMs = tzDate - utcDate;
    const diffHours = Math.floor(diffMs / (1000 * 60 * 60));
    const diffMinutes = Math.floor((Math.abs(diffMs) % (1000 * 60 * 60)) / (1000 * 60));
    const sign = diffHours >= 0 ? '+' : '-';
    const offset = `UTC ${sign}${String(Math.abs(diffHours)).padStart(2, '0')}:${String(diffMinutes).padStart(2, '0')}`;

    return {
        time,
        date,
        offset
    };
}

// Create clock card HTML
function createClockCard(timezone) {
    const timeData = getTimeInTimezone(timezone);
    const card = document.createElement('div');
    card.className = 'clock-card';
    card.innerHTML = `
        <div class="timezone-name">${timezone.replace(/_/g, ' ')}</div>
        <div class="time-display">${timeData.time}</div>
        <div class="date-display">${timeData.date}</div>
        <div class="utc-offset">${timeData.offset}</div>
        <button class="remove-btn" onclick="removeTimezone('${timezone}')">Remove</button>
    `;
    return card;
}

// Render all clocks
function renderClocks() {
    const container = document.getElementById('clocksContainer');
    container.innerHTML = '';

    timezones.forEach(tz => {
        container.appendChild(createClockCard(tz));
    });
}

// Update all clocks
function updateClocks() {
    const cards = document.querySelectorAll('.clock-card');
    cards.forEach((card, index) => {
        const tz = timezones[index];
        const timeData = getTimeInTimezone(tz);
        card.querySelector('.time-display').textContent = timeData.time;
        card.querySelector('.date-display').textContent = timeData.date;
        card.querySelector('.utc-offset').textContent = timeData.offset;
    });
}

// Add new timezone
function addTimezone() {
    const input = document.getElementById('timezoneInput');
    const tz = input.value.trim();

    if (!tz) {
        showError('Please enter a timezone');
        return;
    }

    if (!isValidTimezone(tz)) {
        showError(`Invalid timezone: ${tz}. Please check the timezone list.`);
        return;
    }

    if (timezones.includes(tz)) {
        showError('This timezone is already added');
        return;
    }

    timezones.push(tz);
    saveTimezones();
    renderClocks();
    input.value = '';
    clearError();
}

// Remove timezone
function removeTimezone(tz) {
    timezones = timezones.filter(t => t !== tz);
    saveTimezones();
    renderClocks();
}

// Reset to default timezones
function resetToDefault() {
    timezones = [...DEFAULT_TIMEZONES];
    saveTimezones();
    renderClocks();
    clearError();
}

// Show error message
function showError(message) {
    clearError();
    const container = document.getElementById('clocksContainer');
    const errorDiv = document.createElement('div');
    errorDiv.className = 'error-message';
    errorDiv.id = 'errorMessage';
    errorDiv.textContent = message;
    container.parentElement.insertBefore(errorDiv, container);
}

// Clear error message
function clearError() {
    const errorDiv = document.getElementById('errorMessage');
    if (errorDiv) {
        errorDiv.remove();
    }
}

// Event listeners
document.getElementById('addBtn').addEventListener('click', addTimezone);
document.getElementById('timezoneInput').addEventListener('keypress', (e) => {
    if (e.key === 'Enter') addTimezone();
});
document.getElementById('resetBtn').addEventListener('click', resetToDefault);

// Initialize and start
loadTimezones();
renderClocks();

// Update time every second
setInterval(updateClocks, 1000);