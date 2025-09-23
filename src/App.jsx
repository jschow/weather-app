import { useState, useEffect } from "react";
import "./App.css";
import WeatherCard from "./components/WeatherCard";

const API_KEY = import.meta.env.VITE_OPENWEATHER_KEY;

export default function App() {
  const [city, setCity] = useState("");
  const [weather, setWeather] = useState(null);

  useEffect(() => {
    const saved = localStorage.getItem("weather");
    if (saved) {
      setWeather(JSON.parse(saved));
    }
  }, []);

  async function handleSearch() {
    if (city.trim() === "") return;

    try {
      const res = await fetch(
        `https://api.openweathermap.org/data/2.5/weather?q=${city}&appid=${API_KEY}&units=metric`
      );
      const data = await res.json();

      if (data.cod === 200) {
        const weatherData = {
          city: data.name,
          temp: Math.round(data.main.temp) + "°C",
          desc: data.weather[0].description,
          icon: data.weather[0].icon, // like "04d"
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
            icon={weather.icon}
          />
        )}
      </div>
    </div>
  );
}
