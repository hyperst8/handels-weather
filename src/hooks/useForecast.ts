import { ChangeEvent, KeyboardEvent, useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { forecastType, optionType, weatherType } from "../types";

const useForeCast = () => {
	const [term, setTerm] = useState<string>("");
	const [location, setLocation] = useState<optionType | null>(null);
	const [options, setOptions] = useState<[]>([]);
	const [forecast, setForecast] = useState<forecastType | null>(null);
	const [currentWeather, setCurrentWeather] = useState<weatherType | null>(
		null
	);
	const [highlightedIndex, setHighlightedIndex] = useState<number>(-1);
	const [unit, setUnit] = useState<string>("metric");

	const navigate = useNavigate();

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
		const value = e.target.value;
		setTerm(value);

		if (value === "") {
			setOptions([]);
			return;
		}

		if (value && value.length > 2) {
			getSearchOptions(value);
		}
	};

	const onOptionSelect = (option: optionType) => {
		setLocation(option);
	};

	const getForecast = (location: optionType) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/forecast?lat=${
				location.lat
			}&lon=${location.lon}&units=${unit}&lang=en&appid=${
				import.meta.env.VITE_API_KEY
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				const forecastData = {
					...data.city,
					name: location.name, // Override city name with location name becaause the API returns the name of state instead of city name
					list: data.list.slice(0, 16),
				};
				setForecast(forecastData);
			});
	};

	const getCurrentWeather = (location: optionType) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${
				location.lat
			}&lon=${location.lon}&units=${unit}&lang=en&appid=${
				import.meta.env.VITE_API_KEY
			}`
		)
			.then((res) => res.json())
			.then((data) => {
				const weaterData = {
					name: location.name,
					country: data.sys.country,
					temp: data.main.temp,
					lat: location.lat,
					lon: location.lon,
					id: data.sys.id,
				};
				setCurrentWeather(weaterData);
			});
	};

	const onSubmit = (option: optionType) => {
		if (!option) return;
		navigate(`/details/${option.name}/${option.lat}/${option.lon}`);
	};

	const handleKeyDown = (e: KeyboardEvent<HTMLInputElement>) => {
		if (e.key === "ArrowDown") {
			// Move highlight down, but don’t exceed options length
			setHighlightedIndex((prevIndex) =>
				prevIndex < options.length - 1 ? prevIndex + 1 : 0
			);
		} else if (e.key === "ArrowUp") {
			// Move highlight up, but don’t go below 0
			setHighlightedIndex((prevIndex) =>
				prevIndex > 0 ? prevIndex - 1 : options.length - 1
			);
		} else if (e.key === "Enter" && highlightedIndex >= 0) {
			// Trigger onSelect for the highlighted option
			const selectedOption = options[highlightedIndex];
			onOptionSelect(selectedOption);
			onSubmit(selectedOption); // Navigate to Details page
			setHighlightedIndex(-1); // Reset highlight index after selection
		}
	};

	const handleOptionClick = (option: optionType) => {
		onSubmit(option);
		setHighlightedIndex(-1);
	};

	const changeUnit = (newUnit: string) => {
		setUnit(newUnit);
		localStorage.setItem("unit", newUnit); // Store the unit in localStorage
		if (location) {
			getForecast(location);
		}
	};

	// Load the unit from localStorage on mount
	useEffect(() => {
		const storedUnit = localStorage.getItem("unit");
		if (storedUnit) {
			setUnit(storedUnit);
		} else {
			setUnit("metric");
		}
	}, []);

	useEffect(() => {
		if (location) {
			setTerm(location.name);
			setOptions([]);
		}
	}, [location]);

	return {
		term,
		options,
		forecast,
		currentWeather,
		getForecast,
		getCurrentWeather,
		onInputChange,
		onOptionSelect,
		navigate,
		handleKeyDown,
		handleOptionClick,
		highlightedIndex,
		changeUnit,
		unit,
	};
};

export default useForeCast;
