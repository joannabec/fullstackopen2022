import { useState, useEffect } from 'react';
import axios from 'axios';

function App() {
  const [ allCountries, setAllCountries ] = useState([]);
  const [ countries, setCountries ] = useState([]);
  const [ input, setInput ] = useState('');

  useEffect(() => {
    axios.get('https://restcountries.com/v3.1/all')
    .then((resp) => {
      if(resp.statusText === 'OK') setAllCountries(resp.data);
      else console.log(resp);
    })
  }, []);

  const handleChange = (e) => {
    const filterText = e.target.value;
    setInput(filterText);
    const filteredCountries = allCountries.filter((country) => {
      return country.name.common.toLowerCase().indexOf(filterText) > -1;
    })
    setCountries(filteredCountries);
   }

  return (
    <div>
      <label>find countries</label>
      <input onChange={handleChange} value={input} />
      { countries.length > 10 && <p>Too many matches, specify another filter</p>}
      { countries.length < 10 && countries.length > 1  && countries.map((item) => <p key={item.cca2}>{item.name.common}</p>)}
      { countries.length === 1 &&
        <div>
          <h2>{countries[0].name.common}</h2>
          <p>Capital: {countries[0].capital[0]}</p>
          <h3>Lenguages:</h3>
          <ul>
            {Object.values(countries[0].languages).map((item) => <li key={item}>{item}</li>)}
          </ul>
          <img src={countries[0].flags.png} alt={countries[0].name.common}/>
        </div>
      }
    </div>
  );
}

export default App;
