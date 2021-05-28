const CountryDetails = ({ country }) => {
  const { name, capital, population, languages, flag, demonym } = country;

  return (
    <div>
      <h1>{name}</h1>
      <p>capital {capital}</p>
      <p>population {population}</p>

      <h2>languages</h2>
      <ul>{languages.map((lang) => <li key={lang.name}>{lang.name}</li>)}</ul>

      <img style={{ width: 200 }} src={flag} alt={`${demonym} Flag`} />
    </div>
  );
};

export default CountryDetails;
