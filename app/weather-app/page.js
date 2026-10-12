"use client";

import { useState } from "react";

export default function WeatherApp() {
  const [city, setCity] = useState("");
  const [weatherData, setWeatherData] = useState(null);
  

const fetchWeatherData = async () => {
 
  const response = await fetch(
    `https://api.weatherapi.com/v1/current.json?key=f81b873b0ac840a3902104519261210&q=${encodeURIComponent(city)}`
  );

  const data = await response.json();


  setWeatherData(data);

 
};

  return (
    <div>
      <h1>Weather App</h1>
      <input
        type="text"
        placeholder="Enter city"
        value={city}
        onChange={(e) => setCity(e.target.value)}
      />
      <button onClick={fetchWeatherData}>Get Weather</button>

   {weatherData?.location && weatherData?.current && (
  <div>
    <h2>Weather in {weatherData.location.name}</h2>
    <p>Temperature: {weatherData.current.temp_c}°C</p>
    <p>Wind Speed: {weatherData.current.wind_kph} km/h</p>
    <p>Condition: {weatherData.current.condition.text}</p>
    <p>Humidity: {weatherData.current.humidity}%</p>
    <p>Feels Like: {weatherData.current.feelslike_c}°C</p>
  </div>
)}

{weatherData?.error && (
  <p>{weatherData.error.message}</p>
)}
    </div>
  );
}

