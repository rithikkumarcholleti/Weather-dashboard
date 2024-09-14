import React, { useState } from 'react';
import axios from 'axios';
import WeatherCard from './WeatherCard';
import './WeatherDashboard.css'; // Ensure correct path to the CSS file

const WeatherDashboard = () => {
  const [city, setCity] = useState('');
  const [weatherData, setWeatherData] = useState(null);
  const [forecastData, setForecastData] = useState(null); // State for 5-day forecast data
  const [isDarkMode, setIsDarkMode] = useState(false); // State for dark mode toggle

  const API_KEY = 'c83895044c89ebcd1a20f8d19be4eaa6'; // Your API key

  const handleSearch = async () => {
    try {
      const weatherResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const forecastResponse = await axios.get(
        `https://api.openweathermap.org/data/2.5/forecast?q=${city}&appid=${API_KEY}&units=metric`
      );
      setWeatherData(weatherResponse.data);
      setForecastData(forecastResponse.data);
    } catch (error) {
      console.error('Error fetching weather data:', error);
    }
  };

  const getCurrentTime = (timezone) => {
    const offset = timezone / 3600; // Convert seconds to hours
    const localTime = new Date(new Date().getTime() + offset * 3600 * 1000).toUTCString();
    return localTime.slice(-12, -4); // Extract the time portion from the string
  };

  const toggleDarkMode = () => {
    setIsDarkMode(!isDarkMode);
  };

  return (
    <div className={`weather-dashboard ${isDarkMode ? 'dark-mode' : 'light-mode'}`}>
      <h1>Weather Dashboard</h1>
      <div className="weather-dashboard-header">
        <input
          type="text"
          placeholder="Enter your city"
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>

        {/* Toggle Button for Light/Dark Mode */}
        <label className="toggle-switch">
          <input
            type="checkbox"
            checked={isDarkMode}
            onChange={toggleDarkMode}
          />
          <span className="slider"></span>
          <span className="toggle-text">{isDarkMode ? 'Light' : 'Dark'}</span>
        </label>
      </div>

      {weatherData && (
        <>
          <WeatherCard
            data={weatherData}
            currentTime={getCurrentTime(weatherData.timezone)}
          />
          {/* Display additional weather information */}
          <div className="weather-info">
            <div className="current-weather">
              <h2>{`Current Temperature: ${weatherData.main.temp}°C`}</h2>
              <p>Humidity: {weatherData.main.humidity}%</p>
              <p>Wind Speed: {weatherData.wind.speed} m/s</p>
              <p>Pressure: {weatherData.main.pressure} hPa</p>
              <p>Sunrise: {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString()}</p>
              <p>Sunset: {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString()}</p>
            </div>
          </div>

          {/* Display 5-day forecast */}
          {forecastData && (
            <div className="forecast-section">
              <h2>5-Day Weather Forecast</h2>
              <div className="forecast-container">
                {forecastData.list.slice(0, 5).map((item, index) => (
                  <div className="forecast-card" key={index}>
                    <p>{new Date(item.dt * 1000).toLocaleDateString()}</p>
                    <p>{item.weather[0].description}</p>
                    <p>Temp: {item.main.temp}°C</p>
                    <p>Humidity: {item.main.humidity}%</p>
                  </div>
                ))}
              </div>
            </div>
          )}

          {/* Display hourly forecast */}
          {forecastData && (
            <div className="hourly-forecast-section">
              <h2>Next 5-Hourly Forecast</h2>
              <div className="hourly-forecast-container">
                {forecastData.list.slice(0, 5).map((item, index) => (
                  <div className="hourly-forecast-card" key={index}>
                    <p>{new Date(item.dt * 1000).toLocaleTimeString()}</p>
                    <p>{item.weather[0].description}</p>
                    <p>Temp: {item.main.temp}°C</p>
                  </div>
                ))}
              </div>
            </div>
          )}
        </>
      )}
    </div>
  );
};

export default WeatherDashboard;
