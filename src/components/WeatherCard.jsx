export default function WeatherCard({ city, temp, desc, icon, unit, onToggleUnit }) {
  return (
    <div className="weather-card">
      {/* Toggle button in top-right corner */}
      <button className="unit-toggle" onClick={onToggleUnit}>
        {unit === "metric" ? "°F" : "°C"}
      </button>

      <h2>{city}</h2>
      <p style={{ fontSize: "2rem", fontWeight: "bold" }}>{temp}</p> {/* bigger temp */}
      <p>{desc}</p>
      {icon && (
        <img
          src={`https://openweathermap.org/img/wn/${icon}@2x.png`}
          alt="weather icon"
        />
      )}
    </div>
  );
}
