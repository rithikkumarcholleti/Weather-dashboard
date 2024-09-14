// src/App.js
import React from 'react';
import WeatherDashboard from './components/WeatherDashboard'; // Import the WeatherDashboard component
import './App.css'; // Ensure this file exists and path is correct


const App = () => {
  return (
    <div className="App">
      <WeatherDashboard />
    </div>
  );
};

export default App;
