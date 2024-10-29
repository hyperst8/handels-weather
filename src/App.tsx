import Dashboard from "@/components/Dashboard";
import Details from "@/components/Details";
import { Route, BrowserRouter as Router, Routes } from "react-router-dom";

const App = (): JSX.Element => {
	return (
		<Router>
			<Routes>
				<Route path="/" element={<Dashboard />} />
				<Route path="/details/:locationId" element={<Details />} />
			</Routes>
		</Router>
	);
};

export default App;
