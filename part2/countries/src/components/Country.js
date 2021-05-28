import React, { useState } from 'react';
import CountryDetails from './CountryDetails';

const Country = ({ country }) => {
  const [show, setShow] = useState(false);

  const toggleShow = () => setShow(!show);

  return (
    <div>
      <p>
        {country.name}{' '}
        <button onClick={toggleShow}>{show ? 'hide' : 'show'}</button>
      </p>
      {show && <CountryDetails country={country} />}
    </div>
  );
};

export default Country;
