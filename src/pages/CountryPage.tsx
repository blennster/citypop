import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiQuery } from '../util';

const CountryPage: React.FunctionComponent = () => {
  const { country } = useParams<{ country: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<string[]>([]);

  useEffect(() => {
    const fetch = async () => {
      const res = await apiQuery(country, country);

      if (res != null) {
        const cities = res.geonames.map((e) => `${e.name}, ${e.countryName}`);
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
      {data.map((e) => <h1>{e}</h1>)}
    </div>
  );
};

export default CountryPage;
