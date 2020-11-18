import React, { useEffect, useState } from 'react';
import { Link, useParams } from 'react-router-dom';

import { apiQuery } from '../util';

type DataType = {
  city: string,
  country: string,
  code: string,
};

const CountryPage: React.FunctionComponent = () => {
  const { country } = useParams<{ country: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<DataType[]>([]);

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

  if (loading) {
    return <h1>Loading</h1>;
  }
  return (
    <div>
      {data.map((e) => <Link to={`/location/${e.code}/${e.city}`}>{e.city}</Link>)}
    </div>
  );
};

export default CountryPage;
