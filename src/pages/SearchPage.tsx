import React, { useState } from 'react';
import { useHistory } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';

import { apiSearchQuery } from '../util';
import Button from '../components/Button';
import '../styles/SearchPage.css';
import searchIcon from '../search.svg';
import Loading from '../components/Loading';
import Error from '../components/Error';

const SearchPage: React.FunctionComponent<{ type: 'Country' | 'City' }> = ({ type }) => {
  const isCountry = type === 'Country';
  const history = useHistory();
  const [query, setQuery] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorStatus, setErrorStatus] = useState({ error: false, errorMessage: '' });

  const search = async () => {
    setLoading(true);
    const res = await apiSearchQuery(query, isCountry);

    if (res != null) {
      if (res.totalResultsCount > 0) {
        if (isCountry) {
          history.push(`/location/${res.geonames[0].countryCode}`);
        } else {
          history.push(`/location/${res.geonames[0].countryCode}/${res.geonames[0].name}`);
        }
      } else {
        setErrorStatus({
          error: true,
          errorMessage: `That ${type.toLowerCase()} was not found.`,
        });
      }
    } else {
      setErrorStatus({
        error: true,
        errorMessage: 'There was an error reaching the API. Please try again later.',
      });
    }
    setLoading(false);
  };

  return (
    <div>
      <Jumbotron subHeader={`Search by ${type}`} />
      { errorStatus.error ? <Error message={errorStatus.errorMessage} /> : null }
      <div className="search_page__inputs">
        <input type="text" value={query} onChange={(e) => setQuery(e.target.value)} />
        { loading ? <Loading /> : (
          <Button onClick={search}>
            <img src={searchIcon} alt="Search" />
          </Button>
        )}
      </div>
    </div>
  );
};

export default SearchPage;
