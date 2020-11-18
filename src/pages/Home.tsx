import React from 'react';
import { Link } from 'react-router-dom';
import Jumbotron from '../components/Jumbotron';
import '../styles/Home.css';

const Home: React.FunctionComponent = () => (
  <div>
    <Jumbotron />
    <div>
      <Link to="/search-by-country">Search by country</Link>
      <Link to="/search-by-city">Search by city</Link>
    </div>
  </div>
);

export default Home;
