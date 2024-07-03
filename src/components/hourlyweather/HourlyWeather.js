import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './HourlyWeather.css';

const HourlyWeather = ({ cityName }) => {
  const [hourlyData, setHourlyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchHourlyWeather = async () => {
      if (cityName) {
        setLoading(true);
        setError(null);
        try {
          const response = await fetch(
            `https://api.openweathermap.org/data/2.5/forecast?q=${cityName}&units=metric&appid=f99eb239de6e532f9b61e6cc0379b79b`
          );
          if (!response.ok) {
            throw new Error('Failed to fetch data');
          }
          const data = await response.json();
          setHourlyData(data.list.slice(0, 8)); // Get the next 8 three-hourly forecasts
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchHourlyWeather();
  }, [cityName]);

  return (
    <Container>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {hourlyData.length > 0 && (
        <Row>
        <Row>
          <h4 className='title'>Hourly temperature details</h4>
           </Row>

          <Row>
          {hourlyData.map((weather, index) => (
            <Col key={index} xs={12} md={3}>
              <div className="hourly-weather-card">
                <p className="hourly-weather-data" style={{color:"skyblue"}}>{new Date(weather.dt_txt).toLocaleTimeString()}</p>
                <p className="hourly-weather-data" style={{color:"yellow"}}>{weather.main.temp} °C</p>
                <p className="hourly-weather-data" style={{fontSize:"13px"}}>{weather.weather[0].description}</p>
              </div>
            </Col>
          ))}
        </Row>
        </Row>
      )}
    </Container>
  );
};

export default HourlyWeather;
