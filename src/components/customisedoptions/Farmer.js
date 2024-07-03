import React from 'react';
import './Farmer.css';
import sunrise from "../../images/sunrise.png";
import sunset from "../../images/sunset.png";

const Farmer = ({ weatherData }) => {
  const { main, wind, sys, rain, alerts } = weatherData;

  return (
    <div className="farmer-container">
        <div className="scrolling-caption">
        <h3>"Empower Your Harvest: Stay Ahead with Real-Time Weather Insights"</h3>
        </div>
     
      <ul className="farmer-data-list">
        <li><strong>Temperature</strong> {main.temp} °C</li>
        <li><strong>Humidity</strong> {main.humidity} %</li>
        <li><strong>Wind Speed</strong> {wind.speed} m/s</li>
        <li><strong>Precipitation</strong> {rain?.['3h'] || 0} mm</li>
        <li><span><strong>Sunrise</strong><img src={sunrise} className="icon" /></span><span>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</span></li>
        <li><span><strong>Sunset</strong><img src={sunset} className="icon" /></span><span>{new Date(sys.sunset * 1000).toLocaleTimeString()}</span> </li>
        <li><strong>Weather Alerts</strong> {alerts?.description || 'No alerts'}</li>
      </ul>
    </div>
  );
};

export default Farmer;

