import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';

import { apiSearchQuery } from '../util';
import Button from '../components/Button';
import '../styles/SearchPage.css';
import searchIcon from '../search.svg';

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
      <div className="search_page__inputs">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        <Button onClick={search}>
          <img src={searchIcon} alt="Search" />
        </Button>
      </div>
    </div>
  );
};

export default SearchPage;
