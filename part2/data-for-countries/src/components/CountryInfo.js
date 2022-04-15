import { useState, useEffect } from 'react';
import axios from 'axios';

const api_key = process.env.REACT_APP_API_KEY;

const CountryInfo = ({item}) => {
  const [ weather, setWeather ] = useState(null);

  useEffect(() => {
    axios.get(`http://api.openweathermap.org/data/2.5/weather?q=${item.capital[0]}&units=metric&APPID=${api_key}`)
    .then((resp) => {
      setWeather(resp.data);
    });
  }, [item.capital]);

  return (
    <div>
      <h2>{item.name.common}</h2>
      <p>Capital: {item.capital[0]}</p>
      <h3>Lenguages:</h3>
      <ul>
        {Object.values(item.languages).map((item) => <li key={item}>{item}</li>)}
      </ul>
      <img src={item.flags.png} alt={item.name.common}/>
      {weather && 
        <div>
          <h3>Weather in {weather.name}</h3>
          <p>temperature: {weather.main.temp} Celsius</p>
          <img src={`http://openweathermap.org/img/wn/${weather.weather[0].icon}@2x.png`} alt="" />
          <p>wind {weather.wind.speed}</p>
        </div>
      }
    </div>
  )
}

export default CountryInfo;