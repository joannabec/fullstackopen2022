import { useState, useEffect } from 'react';
import axios from 'axios';
import CountryInfo from './components/CountryInfo';

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
    }).map((item) => ({...item, show: false}));
    setCountries(filteredCountries);
  }

  const showInfo = (id) => {
    const arr = countries.map((item) => {
      if (item.cca2 === id) {
        return ({...item, show: !item.show});
      }
      else return item;
    })
    setCountries(arr);
  }

  return (
    <div>
      <label>find countries</label>
      <input onChange={handleChange} value={input} />

      { countries.length > 10 && <p>Too many matches, specify another filter</p>}

      { countries.length < 10 && countries.length > 1  && 
        countries.map((item) => 
          <div key={item.cca2}>
            <span>{item.name.common} </span>
            <button onClick={() => showInfo(item.cca2)}>{item.show ? 'hide' : 'show'}</button>
            { item.show && <CountryInfo item={item}/> }
          </div>
        )
      }

      { countries.length === 1 && <CountryInfo item={countries[0]}/> }
    </div>
  );
}

export default App;
