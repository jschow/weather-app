export default function WeatherCard({ city, temp, desc, icon }) {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>{temp}</p>
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
