import React, { useEffect, useState } from 'react';
import { useHistory, useParams } from 'react-router-dom';
import Button from '../components/Button';

import { apiQuery } from '../util';
import '../styles/CountryPage.css';
import Jumbotron from '../components/Jumbotron';
import Loading from '../components/Loading';

type DataType = {
  city: string,
  country: string,
  code: string,
};

const CountryPage: React.FunctionComponent = () => {
  const history = useHistory();
  const { country } = useParams<{ country: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType[]>();

  useEffect(() => {
    const fetch = async () => {
      const res = await apiQuery(country, country);

      if (res != null) {
        const cities = res.geonames.map((e) => ({
          city: e.name,
          country: e.countryName,
          code: e.countryCode,
        }));
        setData(cities.slice(0, 5));
        setLoading(false);
      }
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

  return (
    <div>
      <Jumbotron subHeader={data?.[0].country ?? ''} />
      { loading ? <Loading /> : citiesList }
    </div>
  );
};

export default CountryPage;
