import "@/styles/dashboard.scss";
import { ChangeEvent, useState } from "react";
import { Link } from "react-router-dom";
import { PiMagnifyingGlassBold } from "react-icons/pi";

const Dashboard = (): JSX.Element => {
	const [term, setTerm] = useState<string>("");
	const [options, setOptions] = useState<[]>([]);

	const getSearchOptions = (value: string) => {
		fetch(
			`http://api.openweathermap.org/geo/1.0/direct?q=${value.trim()}&limit=5&appid=${
				import.meta.env.VITE_API_KEY
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				setOptions(data);
			});
	};

	const onInputChange = (e: ChangeEvent<HTMLInputElement>) => {
		const value = e.target.value.trim();
		setTerm(value);

		if (value === "") {
			setOptions([]);
			return;
		}

		if (value && value.length > 2) {
			getSearchOptions(value);
		}
	};

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

			<div className="search-container">
				<input
					className="location-search"
					type="text"
					placeholder="Search location"
					onChange={onInputChange}
				/>
				<button className={`search-btn ${term.length >= 2 ? "active" : ""}`}>
					<PiMagnifyingGlassBold className="search-icon" />
				</button>
				{options.length > 0 && (
					<ul className="search-options">
						{options.map((option: { name: string }, index: number) => (
							<li key={index}>
								<button>{option.name}</button>
							</li>
						))}
					</ul>
				)}
			</div>

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
