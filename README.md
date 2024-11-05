**Weather App**

**Introduction**

The Weather App is a user-friendly application that provides real-time weather forecasts for selected locations. Built with **React**, **TypeScript**, and **Vite**, the app leverages the [OpenWeatherMap API](https://openweathermap.org/) to retrieve up-to-date weather information. Users can search for locations, view detailed weather data, switch between metric and imperial units, and save favorite locations for easy access from the dashboard.

**Features**

- Search and select locations to view detailed weather forecasts
- Switch between °C and °F units
- Save locations to the dashboard for quick access
- Responsive and accessible UI for a seamless user experience

**Installation**

**Prerequisites**

Ensure you have [Node.js](https://nodejs.org/) and [npm](https://www.npmjs.com/) or [Yarn](https://yarnpkg.com/) installed.

**Steps**

1. Clone the repository:

bash

Kopier kode

git clone <https://github.com/your-username/weather-app.git>

cd weather-app

1. Install dependencies:

bash

Kopier kode

npm install

\# or

yarn install

1. Create a .env file in the root directory with your OpenWeatherMap API key:

plaintext

Kopier kode

VITE_API_KEY=your_openweathermap_api_key

1. Start the development server:

bash

Kopier kode

npm run dev

\# or

yarn dev

1. Visit the app at <http://localhost:3000>.

**Project Structure**

- **components/**: Contains reusable UI components.
- **hooks/**: Custom React hooks.
- **helpers/**: Utility functions for formatting and data transformations.
- **styles/**: Stylesheets and component-specific styles.

**Component Documentation**

**Dashboard**

The main entry point for the app, displaying the search bar and saved locations. It uses the useForecast hook to manage search state, input changes, and location selection.

- **Props**: None
- **State**: Manages term (search term) and selected locations.
- **Subcomponents**: Search, LocationItem

**Search**

A component for searching and selecting locations. Provides an input field with dropdown suggestions.

- **Props**:
  - term: Current search input
  - options: List of search results
  - onInputChange: Function to update the search input
  - handleOptionClick: Function to select an option
  - highlightedIndex: Index of the currently highlighted option

**Details**

Displays detailed weather information for a selected location, including current temperature, high/low temperatures, feels like temperature, humidity, sunrise/sunset times, and a 5-day forecast.

- **Props**: None
- **State**: Pulls in forecast data and manages unit toggle.
- **Functions**:
  - changeUnit: Switch between metric and imperial units
  - getForecast: Fetches forecast based on current location and unit
  - addToDashboard: Adds location to saved locations in localStorage with feedback if the location already exists

**Degree**

Displays the temperature unit symbol (°C or °F) based on the current unit state.

- **Props**:
  - unit: The unit of temperature, either metric or imperial

**LocationItem**

Renders a saved location with a button for quick access. Displays the name and country for each saved location.

- **Props**:
  - name, country, lat, lon

**Hook Documentation**

**useForecast**

Custom hook that handles the core functionality of fetching and managing weather data.

- **State**:
  - term: Search input value
  - options: List of search suggestions
  - forecast: Current forecast data for a selected location
  - unit: Temperature unit (°C or °F)
- **Functions**:
  - getForecast: Fetches forecast data from OpenWeatherMap based on location and unit.
  - changeUnit: Changes the temperature unit and refetches data.
  - handleOptionClick, handleKeyDown: Manages selection and navigation in the search dropdown.

**Styling Documentation**

The app is styled with **SCSS** and **Tailwind CSS** to provide a clean and responsive layout.

- **dashboard.scss**: Styles for the dashboard page layout, including the search bar and location list.
- **details.scss**: Styles for the details page, including weather information, forecast items, and unit switch buttons.
- **Key Classes**:
  - .unit-buttons: Styling for °C/°F unit toggle buttons
  - .location-list: Layout styling for saved locations list
  - .add-to-dashboard-btn: Custom button styling for adding a location to the dashboard
  - .message: Styled feedback message for duplicate location additions

**Potential Improvements**

1. **Error Handling**: Display user-friendly error messages if the API request fails or if the user enters an invalid location.
2. **Unit Persistence**: Store the selected unit in local storage to persist preferences across sessions.
3. **Advanced Forecast Details**: Add hourly forecast data and more metrics, such as wind speed and precipitation.
4. **Interactive Map**: Integrate a map view with location pins, allowing users to select locations by clicking on the map.
5. **User Authentication**: Allow users to create accounts and save personalized location lists to a database.
6. **Dark Mode**: Add a dark mode toggle for enhanced readability in low-light conditions.
