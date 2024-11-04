import "@/styles/details.scss";
import { useEffect, useState } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import { formatHour, getSunTime } from "../helpers";
import useForeCast from "../hooks/useForecast";
import Degree from "./helpers/Degree";

const Details = (): JSX.Element => {
  const { name, lat, lon } = useParams<{
    name: string;
    lat: string;
    lon: string;
  }>();
  const { getForecast, forecast, navigate, changeUnit, unit } = useForeCast();
  const [message, setMessage] = useState<string>("");

  useEffect(() => {
    if (lat && lon) {
      // Re-fetch forecast data when unit changes
      getForecast({
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        name: name || "",
        country: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, lat, lon, unit]);

  useEffect(() => {
    if (message) {
      const timer = setTimeout(() => {
        setMessage("");
      }, 2000);
      return () => clearTimeout(timer);
    }
  }, [message]);

  const addToDashboard = () => {
    if (!forecast) return; // prevent accessing properties of null

    const storedLocations = JSON.parse(
      localStorage.getItem("locations") || "[]"
    );

    type LocationType = {
      id: number;
      name: string;
      country: string;
      lat: number;
      lon: number;
    };

    const locationExists = storedLocations.some(
      (location: LocationType) => location.id === forecast.id
    );

    if (locationExists) {
      setMessage("Location already added");
      return;
    }

    const newLocation = {
      id: forecast.id,
      name: forecast.name,
      country: forecast.country,
      lat: lat,
      lon: lon,
    };

    const updatedLocations = [...storedLocations, newLocation];
    localStorage.setItem("locations", JSON.stringify(updatedLocations));
    setMessage("Location added to dashboard");
  };

  if (!forecast) {
    return <div className="loading">Loading...</div>;
  }

  // console.log(forecast);
  const { country, sunrise, sunset, list } = forecast;
  const today = list[0];

  return (
    <div className="details">
      <div className="details-header">
        <button
          className="back-btn"
          aria-label="back button"
          onClick={() => navigate("/")}
        >
          <IoArrowBackOutline aria-label="back arrow" />
        </button>
        <h1>
          {forecast.name}, <span className="countryLabel">{country}</span>
        </h1>
      </div>
      <div className="unit-buttons">
        <button
          className={`${unit === "metric" ? "active" : ""}`}
          onClick={() => changeUnit("metric")}
        >
          °C
        </button>
        <button
          className={`${unit === "imperial" ? "active" : ""}`}
          onClick={() => changeUnit("imperial")}
        >
          °F
        </button>
      </div>
      <div className="add-to-dashboard">
        <button
          onClick={addToDashboard}
          className="add-to-dashboard-btn"
        >
          Add to dashboard
        </button>
        {message && <p className="message">{message}</p>}
      </div>
      {/* Render detailed weather information for the selected location here */}
      <div className="details-content">
        {/* Render weather data for current day */}
        <div className="weather-forecast">
          <p className="weather-type">{today.weather[0].description}</p>
          <img
            src={`http://openweathermap.org/img/wn/${today.weather[0].icon}@2x.png`}
            alt={`weather-icon-${today.weather[0].description}`}
          />
          <p className="weather-degree">
            {Math.round(today.main.temp)} <Degree unit={unit} />
          </p>
          <div className="degree-h-l">
            <span className="h-l">
              H: {Math.ceil(today.main.temp_max)} <Degree unit={unit} />
            </span>
            <span className="h-l">
              L: {Math.floor(today.main.temp_min)} <Degree unit={unit} />
            </span>
          </div>
          <div className="feels-like">
            <span className="feels-like-label">Feels like: </span>
            <span className="feels-like-value">
              {Math.round(today.main.feels_like)} <Degree unit={unit} />
            </span>
            <br />
            <span>
              Feels{" "}
              {Math.round(today.main.feels_like) < Math.round(today.main.temp)
                ? "colder"
                : "warmer"}
            </span>
          </div>
        </div>
        {/* Render weather infon like sunrise, sunset, humidity, visibility */}
        <div className="weather-info">
          <div className="weather-info-item">
            <span className="weather-info-label">Sunrise</span>
            <span className="weather-info-value">{getSunTime(sunrise)}</span>
          </div>
          <div className="weather-info-item">
            <span className="weather-info-label">Sunset</span>
            <span className="weather-info-value">{getSunTime(sunset)}</span>
          </div>
          <div className="weather-info-item">
            <span className="weather-info-label">Humidity</span>
            <span className="weather-info-value">{today.main.humidity}%</span>
          </div>
          <div className="weather-info-item">
            <span className="weather-info-label">Visibility</span>
            <span className="weather-info-value">
              {(today.visibility / 1000).toFixed()} km
            </span>
          </div>
        </div>
      </div>
      {/* Render weather forecast for the next days */}
      <div className="weather-forecast-list">
        {list.map((item, index) => (
          <div
            key={index}
            className="weather-forecast-item"
          >
            <p className="weather-forecast-day">
              {index === 0 ? "Now" : formatHour(item.dt)}
            </p>
            <img
              src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
              alt={`weather-icon-${item.weather[0].description}`}
            />
            <p className="weather-forecast-type">
              {item.weather[0].description}
            </p>
            <p className="weather-forecast-degree">
              {Math.round(item.main.temp)} <Degree unit={unit} />
            </p>
          </div>
        ))}
      </div>
    </div>
  );
};

export default Details;
