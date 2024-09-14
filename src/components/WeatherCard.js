import React from 'react';
import './WeatherCard.css'; // Correct path to the CSS file

const WeatherCard = ({ data, currentTime }) => {
  const weather = data.weather[0];
  const temp = data.main.temp;
  const weatherCondition = weather.main;
  
  // Map weather conditions to emojis
  const weatherIcons = {
    Clear: '🌞',
    Clouds: '☁️',
    Rain: '🌧️',
    Snow: '❄️',
    Thunderstorm: '⚡',
    Drizzle: '🌦️'
  };

  return (
    <div className="weather-card">
      <h2>{data.name}</h2>
      <p>{weatherIcons[weatherCondition] || '🌫️'}</p>
      <p>Temperature: {temp}°C</p>
      <p>Condition: {weatherCondition}</p>
      <p>Time: {currentTime}</p>
    </div>
  );
};

export default WeatherCard;
