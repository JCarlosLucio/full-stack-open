import axios from 'axios';
import React, { useState, useEffect } from 'react';

const Weather = ({ city }) => {
  const [weather, setWeather] = useState(null);
  const API_KEY = process.env.REACT_APP_API_KEY;

  const url = `http://api.weatherstack.com/current?access_key=${API_KEY}&query=${city}`;

  useEffect(
    () => {
      axios.get(url).then((response) => setWeather(response.data.current));
    },
    [url]
  );

  return (
    <div>
      <h2>Weather in {city}</h2>

      {weather ? (
        <React.Fragment>
          <p>
            <strong>temperature: </strong>
            {weather.temperature} Celsius
          </p>

          <img
            style={{ width: 100 }}
            src={weather.weather_icons[0]}
            alt={weather.weather_descriptions[0]}
          />

          <p>
            <strong>wind: </strong>
            {weather.wind_speed} mph direction {weather.wind_dir}
          </p>
        </React.Fragment>
      ) : (
        <p>Loading weather...</p>
      )}
    </div>
  );
};

export default Weather;
