// Function to format a timestamp into a human-readable time hour
export const formatHour = (timestamp: number) => {
	const date = new Date(timestamp * 1000).getHours();

	return date;
};

// Function convert timestamp to human readable hours and minutes
export const getSunTime = (timestamp: number): string => {
	const date = new Date(timestamp * 1000);
	let hours = date.getHours().toString();
	let minutes = date.getMinutes().toString();

	if (hours.length <= 1) hours = `0${hours}`;
	if (minutes.length <= 1) minutes = `0${minutes}`;

	return `${hours}:${minutes}`;
};
