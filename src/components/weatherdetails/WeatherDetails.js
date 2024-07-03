import React, { useEffect, useState } from "react";
import { Container, Row, Col, Spinner, Alert } from "react-bootstrap";
import "./WeatherDetails.css";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import {
  faTint,
  faWind,
  faTachometerAlt,
  faSun,
} from "@fortawesome/free-solid-svg-icons";
import defaultimage from "../../images/defaultImage.png";
import sunrise from "../../images/sunrise.png";
import sunset from "../../images/sunset.png";

const WeatherDetails = ({ cityName }) => {
  const [weatherData, setWeatherData] = useState(null);
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

    fetchWeather();
  }, [cityName]);

  const getImageForDescription = (description) => {
    const descriptionMapping = {
      haze: 'haze.png',
      thunderstorm: 'thunderstorm.png',
      rain: 'rain.png',
      sunny: 'sunny.png',
      mist: 'mist.png',
      cloudy: 'cloudy.png',
      snow: 'snow.png',
      'shower rain': 'shower.png',
      'broken clouds': 'broken_clouds.png',
      'scattered clouds': 'scattered_clouds.png',
      'clear sky' :'clear_sky.png'
    };

    const normalizedDescription = description.toLowerCase();
    return descriptionMapping[normalizedDescription] || 'defaultImage.png';
  };

  const getImagePath = (imageName) => {
    try {
      return require(`../../images/${imageName}`);
    } catch (error) {
      return defaultimage;
    }
  };

  return (
    <Container className="weather-details">
      {loading && <Spinner animation="border" />}
      {error && <Alert variant="danger">{error}</Alert>}
      {weatherData && (
        <Row>
          <Col className="temp-details">
            <Row>
              <Col>
                <h2>{weatherData.main.temp} °C</h2>
              </Col>
            </Row>
            <Row>
              <Col>
                <p>Feels Like {weatherData.main.feels_like} °C</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <Row>
                  <div>
                    <span className="small-size">Sunrise</span>
                    <span><img src={sunrise} className="icon" /></span>
                  </div>
                  <p className="sundetail">
                    {new Date(weatherData.sys.sunrise * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                </Row>
                <Row>
                  <div>
                    <span className="small-size">Sunset</span>
                    <span><img src={sunset} className="icon" /></span>
                  </div>
                  <p className="sundetail">
                    {new Date(weatherData.sys.sunset * 1000).toLocaleTimeString('en-US', { hour: '2-digit', minute: '2-digit', hour12: true })}
                  </p>
                </Row>
              </Col>
            </Row>
          </Col>
          <Col className="weather-description">
            <Row>
              <Col>
                <img
                  src={getImagePath(getImageForDescription(weatherData.weather[0].description))}
                  alt="Weather Icon"
                  className="icon-large"
                />
              </Col>
            </Row>
            <Row>
              <Col>
                <h2>{weatherData.weather[0].description}</h2>
              </Col>
            </Row>
          </Col>
          <Col className="additional-details">
            <Row>
              <Col>
                <FontAwesomeIcon icon={faTint} className="icon" />
                <p>{weatherData.main.humidity} %</p>
                <p className="small-size">Humidity</p>
              </Col>
              <Col>
                <FontAwesomeIcon icon={faWind} className="icon" />
                <p>{weatherData.wind.speed} m/s</p>
                <p className="small-size">Wind Speed</p>
              </Col>
            </Row>
            <Row>
              <Col>
                <FontAwesomeIcon icon={faTachometerAlt} className="icon" />
                <p>{weatherData.main.pressure} hPa</p>
                <p className="small-size">Pressure</p>
              </Col>
              <Col>
                <FontAwesomeIcon icon={faSun} className="icon" />
                <p>{weatherData.uv_index}</p>
                <p className="small-size">UV Index</p>
              </Col>
            </Row>
          </Col>
        </Row>
      )}
    </Container>
  );
};

export default WeatherDetails;