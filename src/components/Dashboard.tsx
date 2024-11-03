import "@/styles/dashboard.scss";
import useForecast from "../hooks/useForecast";

import Search from "./helpers/Search";
import LocationItem from "./helpers/LocationItem";

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
			name: "Berlin",
			country: "DE",
			lat: 52.5170365,
			lon: 13.3888599,
		},
		{
			name: "London",
			country: "GB",
			lat: 51.5073219,
			lon: -0.1276474,
		},
		{
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
					{locations.map((location, index) => (
						<LocationItem
							key={index}
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
