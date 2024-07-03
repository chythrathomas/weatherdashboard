import React, { useState, useEffect } from 'react';
import './ModalOverlay.css';
import Traveller from '../customisedoptions/Traveller';
import HealthWorker from '../customisedoptions/HealthWorker';
import Farmer from '../customisedoptions/Farmer';
import EventPlanner from '../customisedoptions/EventPlanner';
import Student from '../customisedoptions/Student';

const ModalOverlay = ({ customOption, cityName, onClose }) => {
  const [weatherData, setWeatherData] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      if (cityName) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f99eb239de6e532f9b61e6cc0379b79b`
          );
          if (!response.ok) {
            throw new Error("Failed to fetch weather data");
          }
          const data = await response.json();
          setWeatherData(data);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchData();
  }, [cityName]);

  const renderContent = () => {
    if (loading) {
      return <p>Loading...</p>;
    }

    if (error) {
      return <p>{error}</p>;
    }

    if (!weatherData) {
      return <p>No data available</p>;
    }

    switch (customOption) {
      case "Farmer":
        return <Farmer weatherData={weatherData} />;
      case "Event Planner":
        return <EventPlanner weatherData={weatherData} />;
      case "Traveler":
        return <Traveller weatherData={weatherData} />;
        case "Student":
        return <Student weatherData={weatherData} />;
        case "Health Worker":
          return <HealthWorker weatherData={weatherData} />;
      default:
        return <p>Select a user type to see more information.</p>;
    }
  };

  return (
    <div className="modalBackground">
      <div className="modalContainer">
        <button className="closeButton" onClick={onClose}>X</button>
        {renderContent()}
      </div>
    </div>
  );
};

export default ModalOverlay;
