export type optionType = {
	name: string;
	country: string;
	lat: number;
	lon: number;
};

export type forecastType = {
	name: string;
	country: string;
	sunset: number;
	sunrise: number;
	list: [
		{
			dt: number;
			main: {
				feels_like: number;
				humidity: number;
				pressure: number;
				temp: number;
				temp_min: number;
				temp_max: number;
			};
			weather: [
				{
					id: number;
					main: string;
					description: string;
					icon: string;
				}
			];
			clouds: {
				all: number;
			};
			wind: {
				speed: number;
				deg: number;
				gust: number;
			};
			visibility: number;
			pop: number;
		}
	];
};
