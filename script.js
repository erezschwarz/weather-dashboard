// Replace with your OpenWeatherMap API key from https://openweathermap.org/api
const API_KEY = 'dc275f824809250b69ce7d6de5f049ad';
const GEOCODING_API = 'https://api.openweathermap.org/geo/1.0/direct';
const WEATHER_API = 'https://api.openweathermap.org/data/2.5/weather';
const FORECAST_API = 'https://api.openweathermap.org/data/2.5/forecast';

const searchInput = document.getElementById('searchInput');
const searchBtn = document.getElementById('searchBtn');
const errorDiv = document.getElementById('error');
const loadingDiv = document.getElementById('loading');
const currentWeatherDiv = document.getElementById('currentWeather');
const forecastSection = document.getElementById('forecastSection');
const recentSection = document.getElementById('recentSection');

// Event Listeners
searchBtn.addEventListener('click', handleSearch);
searchInput.addEventListener('keypress', (e) => {
    if (e.key === 'Enter') handleSearch();
});

// Main search handler
async function handleSearch() {
    const city = searchInput.value.trim();
    
    if (!city) {
        showError('Please enter a city name');
        return;
    }

    if (API_KEY === 'YOUR_API_KEY_HERE') {
        showError('Please set your OpenWeatherMap API key in script.js');
        return;
    }

    clearError();
    showLoading(true);

    try {
        // Get coordinates from city name
        const coords = await getCoordinates(city);
        if (!coords) {
            showError('City not found. Please try another city.');
            showLoading(false);
            return;
        }

        // Fetch current weather and forecast
        const [currentWeather, forecast] = await Promise.all([
            getCurrentWeather(coords.lat, coords.lon),
            getForecast(coords.lat, coords.lon)
        ]);

        // Display data
        displayCurrentWeather(currentWeather);
        displayForecast(forecast);
        saveRecentSearch(city);
        displayRecentSearches();
        searchInput.value = '';
    } catch (error) {
        showError('An error occurred. Please try again.');
        console.error(error);
    } finally {
        showLoading(false);
    }
}

// Get coordinates from city name using Geocoding API
async function getCoordinates(city) {
    try {
        const response = await fetch(
            `${GEOCODING_API}?q=${encodeURIComponent(city)}&limit=1&appid=${API_KEY}`
        );
        const data = await response.json();
        
        if (data.length === 0) return null;
        
        return {
            lat: data[0].lat,
            lon: data[0].lon,
            name: data[0].name,
            country: data[0].country
        };
    } catch (error) {
        console.error('Geocoding error:', error);
        return null;
    }
}

// Get current weather
async function getCurrentWeather(lat, lon) {
    const response = await fetch(
        `${WEATHER_API}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return await response.json();
}

// Get 5-day forecast
async function getForecast(lat, lon) {
    const response = await fetch(
        `${FORECAST_API}?lat=${lat}&lon=${lon}&units=metric&appid=${API_KEY}`
    );
    return await response.json();
}

// Display current weather
function displayCurrentWeather(data) {
    const temperature = Math.round(data.main.temp);
    const feelsLike = Math.round(data.main.feels_like);
    const description = data.weather[0].main;
    const icon = getWeatherEmoji(description);

    document.getElementById('cityName').textContent = `${data.name}, ${data.sys.country}`;
    document.getElementById('weatherDate').textContent = new Date().toLocaleDateString('en-US', {
        weekday: 'long',
        year: 'numeric',
        month: 'long',
        day: 'numeric'
    });
    document.getElementById('temperature').textContent = `${temperature}°C`;
    document.getElementById('weatherIcon').textContent = icon;
    document.getElementById('description').textContent = description;
    document.getElementById('feelsLike').textContent = `Feels like ${feelsLike}°C`;
    document.getElementById('humidity').textContent = `${data.main.humidity}%`;
    document.getElementById('pressure').textContent = `${data.main.pressure} hPa`;
    document.getElementById('windSpeed').textContent = `${data.wind.speed} m/s`;
    document.getElementById('visibility').textContent = `${(data.visibility / 1000).toFixed(1)} km`;

    currentWeatherDiv.style.display = 'block';
}

// Display 5-day forecast
function displayForecast(data) {
    const forecastContainer = document.getElementById('forecastContainer');
    forecastContainer.innerHTML = '';

    // Get daily forecasts (every 8 forecasts = 1 day)
    const dailyForecasts = {};
    
    data.list.forEach(forecast => {
        const date = new Date(forecast.dt * 1000).toLocaleDateString('en-US');
        
        if (!dailyForecasts[date]) {
            dailyForecasts[date] = forecast;
        }
    });

    // Display first 5 days
    Object.values(dailyForecasts).slice(0, 5).forEach(forecast => {
        const card = document.createElement('div');
        card.className = 'forecast-card';
        
        const date = new Date(forecast.dt * 1000);
        const temp = Math.round(forecast.main.temp);
        const condition = forecast.weather[0].main;
        const icon = getWeatherEmoji(condition);

        card.innerHTML = `
            <div class="date">${date.toLocaleDateString('en-US', { month: 'short', day: 'numeric' })}</div>
            <div class="icon">${icon}</div>
            <div class="temp">${temp}°C</div>
            <div class="condition">${condition}</div>
        `;

        forecastContainer.appendChild(card);
    });

    forecastSection.style.display = 'block';
}

// Get weather emoji based on description
function getWeatherEmoji(description) {
    const desc = description.toLowerCase();
    
    if (desc.includes('cloud')) return '☁️';
    if (desc.includes('rain') || desc.includes('drizzle')) return '🌧️';
    if (desc.includes('clear') || desc.includes('sunny')) return '☀️';
    if (desc.includes('snow')) return '❄️';
    if (desc.includes('thunder') || desc.includes('storm')) return '⛈️';
    if (desc.includes('mist') || desc.includes('fog')) return '🌫️';
    if (desc.includes('wind')) return '💨';
    
    return '🌤️';
}

// Recent searches management
function saveRecentSearch(city) {
    let searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    // Remove if already exists
    searches = searches.filter(s => s.toLowerCase() !== city.toLowerCase());
    
    // Add to beginning
    searches.unshift(city);
    
    // Keep only last 10
    searches = searches.slice(0, 10);
    
    localStorage.setItem('recentSearches', JSON.stringify(searches));
}

function displayRecentSearches() {
    const searches = JSON.parse(localStorage.getItem('recentSearches') || '[]');
    
    if (searches.length === 0) {
        recentSection.style.display = 'none';
        return;
    }

    const container = document.getElementById('recentSearches');
    container.innerHTML = '';

    searches.forEach(search => {
        const btn = document.createElement('button');
        btn.className = 'recent-search-btn';
        btn.textContent = search;
        btn.addEventListener('click', () => {
            searchInput.value = search;
            handleSearch();
        });
        container.appendChild(btn);
    });

    recentSection.style.display = 'block';
}

// UI Helper functions
function showLoading(show) {
    loadingDiv.style.display = show ? 'block' : 'none';
}

function showError(message) {
    errorDiv.textContent = message;
    errorDiv.style.display = 'block';
}

function clearError() {
    errorDiv.textContent = '';
    errorDiv.style.display = 'none';
}

// Load recent searches on page load
displayRecentSearches();
