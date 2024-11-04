import "@/styles/locationItem.scss";
import { useEffect } from "react";
import { Link } from "react-router-dom";
import useForeCast from "../../hooks/useForecast";
import Degree from "./Degree";

type ItemProps = {
  name: string;
  country: string;
  lat: number;
  lon: number;
};

const LocationItem = ({ name, country, lat, lon }: ItemProps): JSX.Element => {
  const { getCurrentWeather, currentWeather, unit } = useForeCast();
  useEffect(() => {
    getCurrentWeather({
      lat: lat,
      lon: lon,
      name: name,
      country: country,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [unit]);

  if (!currentWeather) {
    return <div>Loading...</div>;
  }

  return (
    <Link
      to={`/details/${currentWeather.name}/${currentWeather.lat}/${currentWeather.lon}`}
    >
      <div className="location-item">
        <span>
          {name}, {country}
        </span>
        <span>
          {Math.round(currentWeather.temp)}
          <Degree unit={unit} />
        </span>
      </div>
    </Link>
  );
};

export default LocationItem;
