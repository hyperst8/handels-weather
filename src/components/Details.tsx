import { useNavigate, useParams } from "react-router-dom";
import { IoArrowBackOutline } from "react-icons/io5";
import "@/styles/details.scss";

const Details = () => {
	const navigate = useNavigate();
	const { locationId } = useParams();

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
				<h1>{locationId}</h1>
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
