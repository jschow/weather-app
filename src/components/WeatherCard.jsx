export default function WeatherCard({ city, temp, desc }) {
  return (
    <div className="weather-card">
      <h2>{city}</h2>
      <p>{temp}</p>
      <p>{desc}</p>
    </div>
  );
}
