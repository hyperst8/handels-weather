import { ChangeEvent, useEffect, useState } from "react";
import { optionType } from "../types";

const useForeCast = () => {
	const [term, setTerm] = useState<string>("");
	const [location, setLocation] = useState<optionType | null>(null);
	const [options, setOptions] = useState<[]>([]);
	const [forecast, setForecast] = useState<forecastType | null>(null);

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

	const onOptionSelect = (option: optionType) => {
		setLocation(option);
	};

	const getForecast = (location: optionType) => {
		fetch(
			`https://api.openweathermap.org/data/2.5/weather?lat=${
				location.lat
			}&lon=${location.lon}&units=metric&appid=${import.meta.env.VITE_API_KEY}`
		)
			.then((res) => res.json())
			.then((data) => {
				setForecast(data);
			});
	};

	const onSubmit = () => {
		if (!location) return;

		getForecast(location);
	};

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
		onInputChange,
		onOptionSelect,
		onSubmit,
	};
};

export default useForeCast;
