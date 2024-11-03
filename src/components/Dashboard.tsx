import "@/styles/dashboard.scss";
import { Link } from "react-router-dom";
import useForecast from "../hooks/useForecast";

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
		{ id: "berlin", name: "Berlin", temp: 12, lat: 52.52, lon: 13.41 },
		{ id: "london", name: "London", temp: 10, lat: 51.51, lon: -0.13 },
		{ id: "paris", name: "Paris", temp: 11, lat: 48.86, lon: 2.35 },
		{ id: "tokyo", name: "Tokyo", temp: 15, lat: 35.69, lon: 139.69 },
		{ id: "new-york", name: "New York", temp: 13, lat: 40.71, lon: -74.01 },
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
						<Link
							className="link-btn"
							key={location.id}
							to={`/details/${location.name}/${location.lat}/${location.lon}`}
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
