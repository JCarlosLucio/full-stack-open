import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FindCountries from './components/FindCountries';
import Countries from './components/Countries';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSearch = (event) => setSearch(event.target.value);

  const url = 'https://restcountries.eu/rest/v2/all';

  console.log('RENDER');

  useEffect(() => {
    axios.get(url).then((response) => {
      console.log('EFFECT', response.data);
      setCountries(response.data);
    });
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );
  console.log('countries to show', filteredCountries);

  return (
    <div>
      <FindCountries search={search} handleSearch={handleSearch} />
      <Countries countries={filteredCountries} />
    </div>
  );
};

export default App;
