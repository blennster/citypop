import React from 'react';
import { Link } from 'react-router-dom';
import Error from '../components/Error';
import Jumbotron from '../components/Jumbotron';

const NotFoundPage: React.FunctionComponent = () => (
  <div>
    <Jumbotron />
    <Error message={(
      <span>
        This is unkown land! Please return
        { ' ' }
        <Link style={{ color: 'crimson', textDecoration: 'underline' }} to="/">home</Link>
        .
      </span>
    )}
    />
  </div>
);

export default NotFoundPage;
