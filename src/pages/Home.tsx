import React from 'react';
import { useHistory } from 'react-router-dom';
import Button from '../components/Button';
import Jumbotron from '../components/Jumbotron';
import '../styles/Home.css';

const Home: React.FunctionComponent = () => {
  const history = useHistory();
  return (
    <div>
      <Jumbotron />
      <div className="home__button_row">
        <Button onClick={() => history.push('/search-by-country')}>
          Search by country
        </Button>
        <Button onClick={() => history.push('/search-by-city')}>
          Search by city
        </Button>
      </div>
    </div>
  );
};

export default Home;
