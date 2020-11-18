import React from 'react';
import '../styles/Button.css';

type ButtonProps = {
  onClick?: (e: React.MouseEvent) => void,
};

const Button: React.FunctionComponent<ButtonProps> = ({ onClick, children }) => (
  <button type="button" className="button" onClick={(e) => onClick?.(e)}>
    { children ?? null }
  </button>
);

export default Button;
