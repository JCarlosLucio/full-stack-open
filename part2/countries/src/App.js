import axios from 'axios';
import React, { useState, useEffect } from 'react';
import FindCountries from './components/FindCountries';
import Countries from './components/Countries';

const App = () => {
  const [search, setSearch] = useState('');
  const [countries, setCountries] = useState([]);

  const handleSearch = (event) => setSearch(event.target.value);

  const url = 'https://restcountries.eu/rest/v2/all';

  useEffect(() => {
    axios.get(url).then((response) => setCountries(response.data));
  }, []);

  const filteredCountries = countries.filter((country) =>
    country.name.toLowerCase().includes(search.toLowerCase())
  );

  return (
    <div>
      <FindCountries search={search} handleSearch={handleSearch} />
      {countries.length > 1 ? (
        <Countries countries={filteredCountries} />
      ) : (
        <p>Loading...</p>
      )}
    </div>
  );
};

export default App;
