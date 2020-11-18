import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import { apiQuery } from '../util';

const CityPage: React.FunctionComponent = () => {
  const { country, city } = useParams<{ country: string, city: string }>();
  const [loading, setLoading] = useState(true);
  const [data, setData] = useState<{ name: string, poulation: number }>();

  useEffect(() => {
    const fetch = async () => {
      const res = await apiQuery(country, city);

      if (res != null) {
        setData({
          name: res.geonames[0].name,
          poulation: res.geonames[0].population,
        });
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
      <Jumbotron />
      { `${data?.name} ${data?.poulation}`}
    </div>
  );
};

export default CityPage;
