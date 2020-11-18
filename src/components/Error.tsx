import React from 'react';
import '../styles/Error.css';

type ErrorProps = {
  message?:string
};

const Error: React.FunctionComponent<ErrorProps> = ({ message }) => (
  <h3 className="error">
    {message}
  </h3>
);

export default Error;
