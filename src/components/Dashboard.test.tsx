import { render, screen, fireEvent } from "@testing-library/react";
import Dashboard from "./Dashboard";

describe("Dashboard Component", () => {
	test("renders search input and saved locations", () => {
		render(<Dashboard />);

		// Check if saved locations are rendered
		expect(screen.getByText("Berlin")).toBeInTheDocument();
		expect(screen.getByText("London")).toBeInTheDocument();

		// Simulate typing in search input
		const searchInput = screen.getByPlaceholderText("Search location");
		fireEvent.change(searchInput, { target: { value: "New York" } });
		expect(searchInput).toHaveValue("New York");
	});
});
