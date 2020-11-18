import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiQuery } from '../util';
import Jumbotron from '../components/Jumbotron';
import Loading from '../components/Loading';
import Error from '../components/Error';
import '../styles/CityPage.css';

const CityPage: React.FunctionComponent = () => {
  const { country, city } = useParams<{ country: string, city: string }>();
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, errorMessage: '' });
  const [data, setData] = useState<{ name: string, country: string, poulation: number }>();

  useEffect(() => {
    const fetch = async () => {
      const res = await apiQuery(country, city);

      if (res != null) {
        if (res.totalResultsCount > 0) {
          // Use the first result since it is most accurate.
          setData({
            name: res.geonames[0].name,
            poulation: res.geonames[0].population,
            country: res.geonames[0].countryName,
          });
        } else {
          setErrorStatus({
            error: true,
            errorMessage: 'That city was not found.',
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

    fetch();
  }, []);

  const populationView = (
    <div className="city_page__population">
      <h5>Population</h5>
      <h2>{ data?.poulation }</h2>
    </div>
  );

  let content = <></>;

  if (errorStatus.error) {
    content = <Error message={errorStatus.errorMessage} />;
  } else if (loading) {
    content = <Loading />;
  } else {
    content = populationView;
  }
  return (
    <div>
      <Jumbotron subHeader={data != null ? `${data?.name}, ${data?.country}` : ''} />
      { content }
    </div>
  );
};

export default CityPage;
