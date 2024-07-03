import React from 'react';
import './HealthWorker.css';
import sunrise from "../../images/sunrise.png";
import sunset from "../../images/sunset.png";

const HealthWorker = ({ weatherData }) => {
  const { main, wind, sys, rain, alerts, air_quality } = weatherData;

  return (
    <div className="healthworker-container">
        <div className="scrolling-caption">
        <h3>"Stay Prepared: Essential Weather Updates for Health Workers"</h3>
        </div>
     
      <ul className="healthworker-data-list">
        <li><strong>Temperature</strong> {main.temp} °C</li>
        <li><strong>Humidity</strong> {main.humidity} %</li>
        <li><strong>Wind Speed</strong> {wind.speed} m/s</li>
        <li><strong>Precipitation</strong> {rain?.['3h'] || 0} mm</li>
        <li><strong>UV Index</strong> {weatherData.uvIndex || 'N/A'}</li>
        <li><span><strong>Sunrise</strong><img src={sunrise} className="icon" /></span><span>{new Date(sys.sunrise * 1000).toLocaleTimeString()}</span></li>
        <li><span><strong>Sunset</strong><img src={sunset} className="icon" /></span><span>{new Date(sys.sunset * 1000).toLocaleTimeString()}</span> </li>
        <li><strong>Air Quality</strong> {air_quality || 'N/A'}</li>
        <li><strong>Weather Alerts</strong> {alerts?.description || 'No alerts'}</li>
      </ul>
    </div>
  );
};

export default HealthWorker;

