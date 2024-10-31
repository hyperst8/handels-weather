import "@/styles/details.scss";
import { useEffect } from "react";
import { IoArrowBackOutline } from "react-icons/io5";
import { useParams } from "react-router-dom";
import useForeCast from "../hooks/useForecast";

const Details = (): JSX.Element => {
  const { name, lat, lon } = useParams<{
    name: string;
    lat: string;
    lon: string;
  }>();
  const { getForecast, forecast, navigate } = useForeCast();

  useEffect(() => {
    if (lat && lon) {
      getForecast({
        lat: parseFloat(lat),
        lon: parseFloat(lon),
        name: name || "",
        country: "",
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [name, lat, lon]);

  if (!forecast) {
    return <div>Loading...</div>;
  }

  console.log(forecast);
  const { country, sunrise, sunset } = forecast;

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
          {forecast.name}, <span>{country}</span>
        </h1>
      </div>
      {/* Render detailed weather information for the selected location here */}
      <div className="details-content">
        <div className="weather-forecast">
          <p className="weather-type">Sunny</p>
          <p className="weather-degree">12 °C</p>
          <div className="degree-h-l">
            <span className="h-l">H: 14 °C</span>
            <span className="h-l">L: 11 °C</span>
          </div>
        </div>

        <div className="weather-info">
          <div className="weather-info-item">
            <span className="weather-info-label">Sunrise</span>
            <span className="weather-info-value">06:00</span>
          </div>
          <div className="weather-info-item">
            <span className="weather-info-label">Sunset</span>
            <span className="weather-info-value">20:20</span>
          </div>
          <div className="weather-info-item">
            <span className="weather-info-label">Humidity</span>
            <span className="weather-info-value">75%</span>
          </div>
          <div className="weather-info-item">
            <span className="weather-info-label">Visibility</span>
            <span className="weather-info-value">10 km</span>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Details;
