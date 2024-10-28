import "@/styles/dashboard.scss";
import { Link } from "react-router-dom";

const Dashboard = () => {
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
			<h1>Dashboard</h1>

			<input
				className="location-search"
				type="search"
				placeholder="Search location"
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