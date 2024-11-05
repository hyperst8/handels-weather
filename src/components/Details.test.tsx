import { render, screen, fireEvent } from "@testing-library/react";
import Details from "./Details";
import useForecast from "../hooks/useForecast";

// Mock the useForecast hook for testing purposes
jest.mock("../hooks/useForecast");

describe("Details Component", () => {
	beforeEach(() => {
		const mockForecast = {
			forecast: {
				name: "Berlin",
				list: [{ main: { temp: 20 }, weather: [{ description: "clear sky" }] }],
			},
			unit: "metric",
			changeUnit: jest.fn(),
		};
		(useForecast as jest.Mock).mockReturnValue(mockForecast);
	});

	test("toggles between °C and °F", () => {
		render(<Details />);

		const metricButton = screen.getByText("°C");
		const imperialButton = screen.getByText("°F");

		fireEvent.click(imperialButton);
		expect(useForecast().changeUnit).toHaveBeenCalledWith("imperial");

		fireEvent.click(metricButton);
		expect(useForecast().changeUnit).toHaveBeenCalledWith("metric");
	});
});
