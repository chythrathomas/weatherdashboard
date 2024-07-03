import React, { useEffect, useState } from 'react';
import { Container, Row, Col, Spinner, Alert } from 'react-bootstrap';
import './WeeklyWeather.css';

const DailyWeather = ({ cityName }) => {
  const [dailyData, setDailyData] = useState([]);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchDailyWeather = async () => {
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
          const dailyForecasts = data.list.filter((forecast) =>
            forecast.dt_txt.endsWith('12:00:00')
          );
          setDailyData(dailyForecasts);
        } catch (err) {
          setError(err.message);
        } finally {
          setLoading(false);
        }
      }
    };

    fetchDailyWeather();
  }, [cityName]);

  return (
    <Container>
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {dailyData.length > 0 && (
        <Row>
        <Row>
        <h4 className='title'>5 days weather forecast</h4>
         </Row>
         <Row className="justify-content-between">
  {dailyData.map((weather, index) => (
    <Col key={index} xs={12} sm={6} md={2} className="d-flex justify-content-center mb-3">
      <div className="daily-weather-card text-center">
        <p style={{color:"skyblue"}}>{new Date(weather.dt_txt).toLocaleDateString()}</p>
        <p style={{color:"yellow"}}>{weather.main.temp} °C</p>
        <p style={{fontSize:"13px"}}>{weather.weather[0].description}</p>
      </div>
    </Col>
  ))}
</Row>
        </Row>
      )}
    </Container>
  );
};

export default DailyWeather;
