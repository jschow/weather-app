import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  // Load saved weather from localStorage when app starts
  useEffect(() => {
    const saved = localStorage.getItem("weather");
    if (saved) {
      setWeather(JSON.parse(saved));
    }
  }, []);

  async function handleSearch() {
    if (city.trim() === "") return;

    try {
      const res = await fetch(`https://wttr.in/${city}?format=j1`);
      const data = await res.json();

      const current = data.current_condition[0];
      const weatherData = {
        city,
        temp: current.temp_C + "°C",
        desc: current.weatherDesc[0].value,
      };

      setWeather(weatherData);

      // Save to localStorage so it persists across refresh
      localStorage.setItem("weather", JSON.stringify(weatherData));
    } catch (err) {
      console.error("Error fetching weather:", err);
      setWeather(null);
    }
  }

  return (
    <div className="app">
      <h1>Weather App</h1>
      <div className="search-bar">
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button onClick={handleSearch}>Search</button>
      </div>

      <div className="weather-result">
        {weather && (
          <WeatherCard
            city={weather.city}
            temp={weather.temp}
            desc={weather.desc}
          />
        )}
      </div>
    </div>
  );
}
