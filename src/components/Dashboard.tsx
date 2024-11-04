import "@/styles/dashboard.scss";
import useForecast from "../hooks/useForecast";

import LocationItem from "./helpers/LocationItem";
import Search from "./helpers/Search";

const Dashboard = (): JSX.Element => {
  const {
    term,
    options,
    onInputChange,
    handleKeyDown,
    handleOptionClick,
    highlightedIndex,
  } = useForecast();

  const locations = [
    {
      id: 7576815,
      name: "Berlin",
      country: "DE",
      lat: 52.5170365,
      lon: 13.3888599,
    },
    {
      id: 2643743,
      name: "London",
      country: "GB",
      lat: 51.5073219,
      lon: -0.1276474,
    },
    {
      id: 1861060,
      name: "Tokyo",
      country: "JP",
      lat: 35.6828387,
      lon: 139.7594549,
    },
  ];

  return (
    <div className="dashboard">
      <h1>Handelsbanken Weather</h1>

      <Search
        term={term}
        options={options}
        onInputChange={onInputChange}
        handleKeyDown={handleKeyDown}
        handleOptionClick={handleOptionClick}
        highlightedIndex={highlightedIndex}
      />

      <div className="locations-container">
        <div className="location-list">
          {locations.map((location) => (
            <LocationItem
              key={location.id}
              name={location.name}
              country={location.country}
              lat={location.lat}
              lon={location.lon}
            />
          ))}
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
