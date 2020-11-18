import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

import { apiQuery } from '../util';
import Jumbotron from '../components/Jumbotron';
import '../styles/CityPage.css';
import Loading from '../components/Loading';

const CityPage: React.FunctionComponent = () => {
  const { country, city } = useParams<{ country: string, city: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ name: string, country: string, poulation: number }>();

  useEffect(() => {
    const fetch = async () => {
      const res = await apiQuery(country, city);

      if (res != null) {
        setData({
          name: res.geonames[0].name,
          poulation: res.geonames[0].population,
          country: res.geonames[0].countryName,
        });
        setLoading(false);
      }
    };

    fetch();
  }, []);

  const populationView = (
    <div className="city_page__population">
      <h5>Population</h5>
      <h2>{ data?.poulation }</h2>
    </div>
  );
  return (
    <div>
      <Jumbotron subHeader={data != null ? `${data?.name}, ${data?.country}` : ''} />
      { loading ? <Loading /> : populationView }
    </div>
  );
};

export default CityPage;
