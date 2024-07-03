import React from 'react';
import './Traveller.css';
import sunrise from "../../images/sunrise.png";
import sunset from "../../images/sunset.png";

const Traveller = ({ weatherData }) => {
  const { main, wind, sys, weather } = weatherData;

  return (
    <div className="traveler-container">
      <div className="scrolling-caption">
        <h3>"Travel Smart: Plan Your Adventures with Accurate Weather Updates"</h3>
      </div>
      <ul className="traveler-data-list">
        <li><strong>Temperature</strong> {main.temp} °C</li>
        <li><strong>Humidity</strong> {main.humidity} %</li>
        <li><strong>Wind Speed</strong> {wind.speed} m/s</li>
        <li><strong>Weather Condition</strong> {weather[0].description}</li>
        <li><span><strong>Sunrise</strong><img src={sunrise} className="icon" alt="Sunrise icon" /></span><span>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</span></li>
        <li><span><strong>Sunset</strong><img src={sunset} className="icon" alt="Sunset icon" /></span><span>{new Date(sys.sunset * 1000).toLocaleTimeString()}</span></li>
      </ul>
    </div>
  );
};

export default Traveller;
