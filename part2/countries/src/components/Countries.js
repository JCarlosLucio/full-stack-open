import Country from './Country';
import CountryDetails from './CountryDetails';

const Countries = ({ countries }) => {
  return (
    <div>
      {countries.length > 10 ? (
        'Too many matches, specify another filter'
      ) : countries.length > 1 ? (
        countries.map((country) => (
          <Country key={country.name} country={country} />
        ))
      ) : (
        <CountryDetails country={countries[0]} />
      )}
    </div>
  );
};

export default Countries;
