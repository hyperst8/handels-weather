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
	const { country, sunrise, sunset, list } = forecast;
	const today = list[0];

	// Function to format a timestamp into a human-readable time hour
	const formatHour = (timestamp: number) => {
		const date = new Date(timestamp * 1000).getHours();

		return date;
	};

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
			{/* Render detailed weather information for the selected location here */}
			<div className="details-content">
				{/* Render weather data for current day */}
				<div className="weather-forecast">
					<p className="weather-type">{today.weather[0].description}</p>
					<p className="weather-degree">{Math.round(today.main.temp)} °C</p>
					<div className="degree-h-l">
						<span className="h-l">H: {Math.ceil(today.main.temp_max)} °C</span>
						<span className="h-l">L: {Math.floor(today.main.temp_min)} °C</span>
					</div>
				</div>
				{/* Render weather infon like sunrise, sunset, humidity, visibility */}
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
			{/* Render weather forecast for the next days */}
			<div className="weather-forecast-list">
				{list.map((item, index) => (
					<div key={index} className="weather-forecast-item">
						<p className="weather-forecast-day">
							{index === 0 ? "Nå" : formatHour(item.dt)}
						</p>
						<img
							src={`http://openweathermap.org/img/wn/${item.weather[0].icon}@2x.png`}
							alt={`weather-icon-${item.weather[0].description}`}
						/>
						<p className="weather-forecast-type">
							{item.weather[0].description}
						</p>
						<p className="weather-forecast-degree">
							{Math.round(item.main.temp)} °C
						</p>
					</div>
				))}
			</div>
		</div>
	);
};

export default Details;
