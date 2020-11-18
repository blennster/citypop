import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';

import { apiSearchQuery } from '../util';

const SearchPage: React.FunctionComponent<{ type: 'Country' | 'City' }> = ({ type }) => {
  const isCountry = type === 'Country';
  const history = useHistory();
  const [query, setQuery] = useState('');

  const search = async () => {
    const res = await apiSearchQuery(query, isCountry);

    if (res != null) {
      if (isCountry) {
        history.push(`/location/${res.geonames[0].countryCode}`);
      } else {
        history.push(`/location/${res.geonames[0].countryCode}/${res.geonames[0].name}`);
      }
    }
  };

  return (
    <div>
      <Jumbotron subHeader={`Search by ${type}`} />
      <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
      <button type="button" onClick={search}>Submit</button>
    </div>
  );
};

export default SearchPage;
