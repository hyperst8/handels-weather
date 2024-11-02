import "@/styles/dashboard.scss";
import { Link } from "react-router-dom";
import useForecast from "../hooks/useForecast";

import Search from "./helpers/Search";

const Dashboard = (): JSX.Element => {
  const { term, options, onInputChange, onOptionSelect, onSubmit } =
    useForecast();

  const locations = [
    { id: "my-location", name: "My location", temp: 14 },
    { id: "berlin", name: "Berlin", temp: 12 },
    { id: "london", name: "London", temp: 10 },
    { id: "paris", name: "Paris", temp: 11 },
    { id: "tokyo", name: "Tokyo", temp: 15 },
    { id: "new-york", name: "New York", temp: 13 },
  ];

  return (
    <div className="dashboard">
      <h1>Handelsbanken Weather</h1>

      <Search
        term={term}
        options={options}
        onInputChange={onInputChange}
        onOptionSelect={onOptionSelect}
        onSubmit={onSubmit}
      />

      <div className="locations-container">
        <div className="location-list">
          {locations.map((location) => (
            <Link
              className="link-btn"
              key={location.id}
              to={`/details/${location.id}`}
            >
              <div className="location-item">
                <span>{location.name}</span>
                <span>{location.temp}°C</span>
              </div>
            </Link>
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
