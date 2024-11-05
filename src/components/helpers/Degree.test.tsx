import { render, screen } from "@testing-library/react";
import Degree from "./Degree";

describe("Degree Component", () => {
	test("renders °C when unit is metric", () => {
		render(<Degree unit="metric" />);
		expect(screen.getByText("°C")).toBeInTheDocument();
	});

	test("renders °F when unit is imperial", () => {
		render(<Degree unit="imperial" />);
		expect(screen.getByText("°F")).toBeInTheDocument();
	});
});
