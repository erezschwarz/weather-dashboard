# 🌤️ Weather Dashboard

A beautiful, responsive weather dashboard that fetches real-time weather data from the OpenWeatherMap API. Get current weather conditions, a 5-day forecast, and save your recent searches.

## Features

✅ **Search Weather by City** - Find weather information for any city worldwide  
✅ **Current Weather Display** - View temperature, description, humidity, pressure, wind speed, and visibility  
✅ **5-Day Forecast** - See daily weather predictions with temperatures and conditions  
✅ **Recent Searches** - Automatically saves and displays your recent searches for quick access  
✅ **Beautiful UI** - Modern gradient design with smooth animations and transitions  
✅ **Fully Responsive** - Works perfectly on desktop, tablet, and mobile devices  
✅ **Real-time Data** - Powered by the free OpenWeatherMap API  

## Screenshots

The dashboard features:
- Clean, intuitive search interface
- Large, easy-to-read temperature display
- Detailed weather metrics (humidity, pressure, wind speed, visibility)
- Beautiful weather emoji icons
- 5-day forecast cards
- Quick-access recent searches

## Getting Started

### Prerequisites

- A free API key from [OpenWeatherMap](https://openweathermap.org/api)
- A modern web browser (Chrome, Firefox, Safari, Edge)
- No installation or build tools required!

### Setup Instructions

1. **Get Your API Key**
   - Visit [OpenWeatherMap API](https://openweathermap.org/api)
   - Sign up for a free account
   - Generate a free API key
   - Wait a few minutes for the key to become active

2. **Add Your API Key**
   - Open `script.js` in your text editor
   - Find this line: `const API_KEY = 'YOUR_API_KEY_HERE';`
   - Replace `'YOUR_API_KEY_HERE'` with your actual API key
   - Save the file

3. **Open in Browser**
   - Open `index.html` in your web browser
   - That's it! You're ready to go!

## Usage

1. **Search for a City**
   - Type a city name in the search box (e.g., "London", "New York", "Tokyo")
   - Press Enter or click the Search button
   - View the current weather and 5-day forecast

2. **Quick Access Recent Searches**
   - Your recent searches are saved automatically
   - Click any button in the "Recent Searches" section to quickly view that city's weather again
   - Up to 10 recent searches are stored

3. **Weather Details**
   - **Temperature**: Current temperature in Celsius
   - **Feels Like**: How the temperature actually feels
   - **Humidity**: Percentage of moisture in the air
   - **Pressure**: Atmospheric pressure in hPa
   - **Wind Speed**: Current wind speed in m/s
   - **Visibility**: How far you can see in km

## API Used

This dashboard uses the **OpenWeatherMap API** with three main endpoints:

- **Geocoding API** - Convert city names to coordinates
- **Current Weather API** - Get real-time weather data
- **5-Day Forecast API** - Get 5-day weather predictions

All endpoints are free with a basic OpenWeatherMap account.

## File Structure

```
weather-dashboard/
├── index.html          # Main HTML structure
├── styles.css          # All styling and animations
├── script.js           # JavaScript logic and API calls
└── README.md           # This file
```

## Technical Details

### Technologies Used
- **HTML5** - Semantic markup
- **CSS3** - Modern styling with animations and gradients
- **Vanilla JavaScript** - No frameworks or dependencies
- **Fetch API** - For making HTTP requests
- **LocalStorage** - For saving recent searches

### Key Features
- Responsive grid layout
- CSS animations and transitions
- Error handling for invalid cities
- Loading states with spinner animation
- Browser localStorage for persistence
- Mobile-first design approach

## Customization

### Change Color Scheme
Edit the gradient in `styles.css` (line ~20):
```css
background: linear-gradient(135deg, #667eea 0%, #764ba2 100%);
```

### Change Temperature Unit
In `script.js`, change `units=metric` to `units=imperial` for Fahrenheit:
```javascript
const response = await fetch(
    `${WEATHER_API}?lat=${lat}&lon=${lon}&units=imperial&appid=${API_KEY}`
);
```

## Troubleshooting

### "Please set your OpenWeatherMap API key"
- Make sure you've added your API key to `script.js`
- Check that the key is correctly placed between the quotes
- Verify the key is active (wait a few minutes after creation)

### "City not found"
- Try using the full city name
- Include country code if needed (e.g., "London, UK")
- Check spelling and spacing

### No weather data appears
- Open the browser console (F12) to check for errors
- Verify your API key is valid and active
- Check your internet connection
- Ensure you're not hitting the API rate limit (free tier has limits)

## Browser Support

- Chrome (latest)
- Firefox (latest)
- Safari (latest)
- Edge (latest)
- Mobile browsers (iOS Safari, Chrome Mobile)

## License

This project is open source and available under the MIT License.

## Credits

- Weather data provided by [OpenWeatherMap API](https://openweathermap.org/)
- Icons and emojis for visual representation
- Inspired by modern weather applications

## Future Enhancements

Potential features to add:
- Multiple language support
- Weather alerts and notifications
- Historical weather data
- Air quality information
- UV index tracking
- Dark/Light theme toggle
- Map integration
- Weather charts and graphs

## Support

If you encounter any issues:
1. Check the troubleshooting section
2. Verify your API key and internet connection
3. Open the browser console (F12) to check for error messages
4. Create an issue in the repository

---

**Enjoy your weather dashboard! 🌤️**