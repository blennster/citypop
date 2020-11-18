import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../components/Button';

import { apiQuery } from '../util';
import Error from '../components/Error';
import Jumbotron from '../components/Jumbotron';
import Loading from '../components/Loading';
import '../styles/CountryPage.css';

type DataType = {
  city: string,
  country: string,
  code: string,
};

const CountryPage: React.FunctionComponent = () => {
  const history = useHistory();
  const { country } = useParams<{ country: string }>();
  const [loading, setLoading] = useState(true);
  const [errorStatus, setErrorStatus] = useState({ error: false, errorMessage: '' });
  const [data, setData] = useState<DataType[]>();

  useEffect(() => {
    const fetch = async () => {
      const res = await apiQuery(country);

      if (res != null) {
        if (res.totalResultsCount > 0) {
          const cities = res.geonames.map((e) => ({
            city: e.name,
            country: e.countryName,
            code: e.countryCode,
          }));
          setData(cities.slice(0, 5));
        } else {
          setErrorStatus({
            error: true,
            errorMessage: 'That country was not found.',
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

  const citiesList = (
    <div className="country_page__cities">
      {data?.map((e) => (
        <Button onClick={() => history.push(`/location/${e.code}/${e.city}`)}>
          {e.city}
        </Button>
      ))}
    </div>
  );

  let content = <></>;

  if (errorStatus.error) {
    content = <Error message={errorStatus.errorMessage} />;
  } else if (loading) {
    content = <Loading />;
  } else {
    content = citiesList;
  }
  return (
    <div>
      <Jumbotron subHeader={data?.[0].country ?? ''} />
      { content }
    </div>
  );
};

export default CountryPage;
