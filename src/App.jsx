import { useState } from 'react'
import './App.css'

export default function App() {
  const [count, setCount] = useState(0)

  return (
    <div className="app" >
      <h1>Weather App</h1>
      <div className="search-bar">
        <input type="text" placeholder="Enter city..." />
        <button>Search</button>
      </div>
      <div className="weather-result">
        {/* Weather results will be displayed here */}
      </div>
    </div>
  )
}

