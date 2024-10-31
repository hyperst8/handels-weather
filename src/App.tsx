import { Route, BrowserRouter as Router, Routes } from "react-router-dom";
import Dashboard from "./components/Dashboard";
import Details from "./components/Details";

const App = (): JSX.Element => {
  return (
    <Router>
      <Routes>
        <Route
          path="/"
          element={<Dashboard />}
        />
        <Route
          path="/details/:name/:lat/:lon"
          element={<Details />}
        />
      </Routes>
    </Router>
  );
};

export default App;
