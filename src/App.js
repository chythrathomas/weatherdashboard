import './App.css';
import { Container, Row, Col } from 'react-bootstrap';
import Search from './components/Search/Search';
import CurrentWeather from './components/currentweather/CurrentWeather';
import { useState, useEffect } from 'react';
import HourlyWeather from './components/hourlyweather/HourlyWeather';
import WeeklyWeather from './components/weeklyweather/WeeklyWeather';
import WeatherDetails from './components/weatherdetails/WeatherDetails';
import ModalOverlay from './components/modaloverlay/ModalOverlay';
import GreetingModal from './components/modaloverlay/GreetingModal';

function App() {
  const [searchedCity, setSearchedCity] = useState('Delhi');
  const [userType, setUserType] = useState("");
  const [showGreetingModal, setShowGreetingModal] = useState(true);
  const [weatherDescription, setWeatherDescription] = useState("");

  const citySearched = (city) => {
    setSearchedCity(city);
    console.log(city);
  }

  const handleUserTypeChanged = (userType) => {
    setUserType(userType);
  };

  const closeModalHandler = () => {
    setUserType('');
  }

  const closeGreetingModal = () => {
    setShowGreetingModal(false);
  }

  // Fetch the weather description when the page loads
  useEffect(() => {
    const fetchWeatherDescription = async () => {
      try {
        const response = await fetch(`https://api.openweathermap.org/data/2.5/weather?q=${searchedCity}&appid=f99eb239de6e532f9b61e6cc0379b79b`);
        const data = await response.json();
        setWeatherDescription(data.weather[0].description);
      } catch (error) {
        console.error("Error fetching weather data:", error);
      }
    };

    fetchWeatherDescription();
  }, [searchedCity]);

  return (
    <Container bg="dark">
      <Row className='mb-3'>
        <Search citySearched={citySearched} userTypeChanged={handleUserTypeChanged} />
      </Row>
      <Row className='mb-3 justify-content-between'>
        <Col xs={12} md={3} className='weather me-3 mb-3 mb-md-0'>
          <CurrentWeather cityName={searchedCity} />
        </Col>
        <Col xs={12} md={8} className='weather'>
          <WeatherDetails cityName={searchedCity} />
        </Col>
      </Row>
      <Row className='mb-3 justify-content-between'>
        <Col sm={12} md={6} className='weather me-3 mb-3 mb-md-0'>
          <HourlyWeather cityName={searchedCity} />
        </Col>
        <Col sm={12} md={5} className='weather'>
          <WeeklyWeather cityName={searchedCity} />
        </Col>
      </Row>
      {userType ? <ModalOverlay customOption={userType} cityName={searchedCity} onClose={closeModalHandler} /> : ""}
      <GreetingModal
        show={showGreetingModal}
        onHide={closeGreetingModal}
       
        description={`Currently its ${weatherDescription} in ${searchedCity}`}
      />
    </Container>
  );
}

export default App;

