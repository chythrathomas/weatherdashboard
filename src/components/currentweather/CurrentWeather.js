import React, { useEffect, useState } from 'react';
import { Container, Spinner, Alert } from 'react-bootstrap';
import './CurrentWeather.css';

const CurrentWeather = ({ cityName }) => {
  const [localDate, setLocalDate] = useState('');
  const [localTime, setLocalTime] = useState('');
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchWeather = async () => {
      if (cityName) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&units=metric&appid=f99eb239de6e532f9b61e6cc0379b79b`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch weather data');
          }
          const data = await response.json();
  
          // Calculate local time using timezone offset
          const timestamp = Date.now(); // Current timestamp in UTC
          console.log(timestamp)
          const timezoneOffset = data.timezone; // Timezone offset in seconds
          console.log(data.timezone)
          const localTimestamp = timestamp + timezoneOffset * 1000; // Convert to local timestamp
          console.log(localTimestamp)
          // Create a new Date object with the local timestamp
          const localDateTime = new Date(localTimestamp);
          console.log(localDateTime)
          // Format date and time separately
          const dateOptions = { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric' };
          const timeOptions = { hour: '2-digit', minute: '2-digit',  hour12: true };
  
          setLocalDate(localDateTime.toLocaleDateString('en-US', dateOptions));
          setLocalTime(localDateTime.toLocaleTimeString('en-US', timeOptions));
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };
  
    fetchWeather();
  }, [cityName]);

  return (
    <Container className="basic-data text-center d-flex flex-column justify-content-center align-items-center" style={{ minHeight: '30vh' }}>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {cityName && localTime && localDate && (
        <div>
          <h2 style={{color:"yellow",fontStyle:"italic"}}>{cityName}</h2>
          <p className="local-time">{localTime}</p>
          <p className="local-date">{localDate}</p>
        </div>
      )}
    </Container>
  );
}

export default CurrentWeather;
