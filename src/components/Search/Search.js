import React, { useState } from "react";
import { Navbar, Col, Row, Container, Dropdown, DropdownButton } from "react-bootstrap";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faSearch, faLocationArrow } from "@fortawesome/free-solid-svg-icons";
import locationIcon from "../../images/location.png";
import "./Search.css";

const Search = ({ citySearched, userTypeChanged }) => {
  const [cityName, setCityName] = useState("");
  const [location, setLocation] = useState('Delhi');
  const [suggestions, setSuggestions] = useState([]);
  const [error, setError] = useState(null);
  const [userType, setUserType] = useState("Traveler");

  const api = {
    key: "f99eb239de6e532f9b61e6cc0379b79b",
    base: "https://api.openweathermap.org/data/2.5/",
  };

  const inputHandler = async (e) => {
    const input = e.target.value;
    setCityName(input);
    setLocation(input);
    if (input.length > 2) {
      try {
        const response = await fetch(
          `https://api.openweathermap.org/data/2.5/find?q=${input}&type=like&sort=population&cnt=5&appid=${api.key}`
        );
        if (!response.ok) {
          throw new Error("Failed to fetch data");
        }
        const data = await response.json();
        if (data && data.list) {
          setSuggestions(data.list);
        } else {
          setSuggestions([]);
        }
      } catch (err) {
        console.error("Error fetching data:", err);
        setError("Failed to fetch city suggestions. Please try again.");
        setSuggestions([]);
      }
    } else {
      setSuggestions([]);
    }
  };

  const selectHandler = (city) => {
    setCityName(city.name);
    setLocation(city.name);
    setSuggestions([]);
    citySearched(city.name);
    setCityName('');
  };

  const onKeyDownHandler = (e) => {
    if (e.key === "Enter") {
      const value = e.target.value;
      setCityName(value);
      setLocation(value);
      if (suggestions.length > 0) {
        selectHandler(suggestions[0]);
      }
      citySearched(value);
      setCityName('');
    }
  };

  const handleCurrentLocation = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        async (position) => {
          const { latitude, longitude } = position.coords;
          try {
            const response = await fetch(
              `https://api.openweathermap.org/data/2.5/weather?lat=${latitude}&lon=${longitude}&appid=${api.key}`
            );
            if (!response.ok) {
              throw new Error("Failed to fetch weather data for current location");
            }
            const data = await response.json();
            setLocation(data.name);
            citySearched(data.name);
          } catch (err) {
            console.error("Error fetching current location weather data:", err);
            setError("Failed to fetch weather data for current location. Please try again.");
          }
        },
        (error) => {
          console.error("Error getting current location:", error);
          setError("Failed to get current location. Please enable location services and try again.");
        }
      );
    } else {
      setError("Geolocation is not supported by this browser.");
    }
  };

  const handleUserTypeChange = (selectedUserType) => {
    setUserType(selectedUserType);
    userTypeChanged(selectedUserType);
  };

  return (
    <div className="nav">
      <Navbar className="navbar">
        <Container fluid>
          <Row className="w-100 justify-content-between align-items-center">
            <Col lg={3} md={4} xs={12} className="mb-2 mb-md-0">
              <div className="header">
                <h2 className="title">WEATHER DASHBOARD</h2>
              </div>
            </Col>
            <Col lg={2} md={3} xs={6} className="mb-2 mb-md-0 text-center text-md-start">
              <span>
                <img src={locationIcon} className="location-icon" />
              </span>
              <span>{location}</span>
            </Col>
            <Col lg={3} md={5} xs={12} className="mb-2 mb-md-0">
              <div className="searchBar">
                <FontAwesomeIcon icon={faSearch} />
                <input
                  type="text"
                  placeholder="Search the city here"
                  name="city"
                  className="form-control"
                  value={cityName}
                  onChange={inputHandler}
                  onKeyDown={onKeyDownHandler}
                />
              </div>
              <div className="suggestions">
                {suggestions.length > 0 && (
                  <ul className="suggestions-list">
                    {suggestions.map((city) => (
                      <li key={city.id} onClick={() => selectHandler(city)}>
                        {city.name}, {city.sys.country}
                      </li>
                    ))}
                  </ul>
                )}
              </div>
            </Col>
            <Col lg={2} md={6} xs={6} className="mb-2 mb-md-0 text-center text-md-end">
              <button onClick={handleCurrentLocation} className="btn btn-secondary location-button">
                <FontAwesomeIcon icon={faLocationArrow} /> Current Location
              </button>
            </Col>
            <Col lg={2} md={6} xs={6} className="text-center text-md-end">
              <DropdownButton
                id="dropdown-basic-button"
                title="I am a"
                className="custom-dropdown-button"
              >
                <Dropdown.Item onClick={() => handleUserTypeChange("Farmer")}>
                  Farmer
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleUserTypeChange("Event Planner")}>
                  Event Planner
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleUserTypeChange("Traveler")}>
                  Traveller
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleUserTypeChange("Student")}>
                  Student
                </Dropdown.Item>
                <Dropdown.Item onClick={() => handleUserTypeChange("Health Worker")}>
                 Health Worker
                </Dropdown.Item>
              </DropdownButton>
            </Col>
          </Row>
        </Container>
      </Navbar>
    </div>
  );
};

export default Search;