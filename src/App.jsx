import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

function capitalizeFirst(str) {
  return str.charAt(0).toUpperCase() + str.slice(1);
}

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);
  const [unit, setUnit] = useState("metric");

  useEffect(() => {
    const saved = localStorage.getItem("weather");
    if (saved) {
      setWeather(JSON.parse(saved));
    }
  }, []);

  async function fetchWeather(cityName, units = unit) {
    if (!cityName) return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${cityName}&appid=${API_KEY}&units=${units}`
      );
      const data = await res.json();

      if (data.cod === 200) {
        const weatherData = {
          city: data.name,
          temp: Math.round(data.main.temp) + (units === "metric" ? "°C" : "°F"),
          desc: capitalizeFirst(data.weather[0].description),
          icon: data.weather[0].icon,
        };

        setWeather(weatherData);
        localStorage.setItem("weather", JSON.stringify(weatherData));
      } else {
        alert("City not found");
        setWeather(null);
      }
    } catch (err) {
      console.error("Error fetching weather:", err);
      setWeather(null);
    }
  }

  function handleSearch() {
    if (city.trim() === "") return;
    fetchWeather(city, unit);
    setCity(""); // ✅ clear the input after searching
  }

  function toggleUnit() {
    setUnit((prev) => (prev === "metric" ? "imperial" : "metric"));
  }

  // ✅ Whenever unit changes, refetch for the current weather.city
  useEffect(() => {
    if (weather) {
      fetchWeather(weather.city, unit);
    }
  }, [unit]);

  return (
    <div className="app">
      <h1>Weather App</h1>

      <form
        className="search-bar"
        onSubmit={(e) => {
          e.preventDefault();
          handleSearch();
        }}
      >
        <input
          type="text"
          placeholder="Enter city..."
          value={city}
          onChange={(e) => setCity(e.target.value)}
        />
        <button type="submit">Search</button>
      </form>

      <div className="weather-result">
        {weather && (
          <WeatherCard
            city={weather.city}
            temp={weather.temp}
            desc={weather.desc}
            icon={weather.icon}
            unit={unit}
            onToggleUnit={toggleUnit}
          />
        )}
      </div>
    </div>
  );
}
