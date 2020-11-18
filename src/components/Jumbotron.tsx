import React from 'react';
import '../styles/Jumbotron.css';

type JumbotronProps = {
  title?: string,
  subHeader?: string
};

const Jumbotron: React.FunctionComponent<JumbotronProps> = ({ title = 'CityPop', subHeader }) => (
  <div className="jumbotron__wrapper">
    <div>
      <h1>{ title }</h1>
      { subHeader != null ? <h3>{ subHeader }</h3> : null }
    </div>
  </div>
);

export default Jumbotron;
