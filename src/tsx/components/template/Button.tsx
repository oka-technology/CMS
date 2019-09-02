/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const buttonStyle = (bgColor: string) => css`
  align-items: center;
  background-color: ${bgColor};
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 1.6rem;
  height: 4rem;
  justify-content: center;
  margin-top: 2rem;
  text-decoration: none;
  transition: transform 0.1s;
  width: 10rem;

  &:hover {
    transform: scale(1.15);
    transition: transform 0.1s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
`;

type ButtonProps = {
  as: 'submit' | 'button' | 'anchor' | 'routerLink';
  value: string;
  onClick: (e: React.MouseEvent<HTMLElement>) => void;
  bgColor: string;
  to?: string;
};

const Button = ({ as, value, onClick, bgColor, to }: ButtonProps): JSX.Element => {
  if (as === 'submit') {
    return <input css={buttonStyle(bgColor)} type="submit" value={value} onClick={onClick} />;
  } else if (as === 'button') {
    return (
      <button css={buttonStyle(bgColor)} onClick={onClick}>
        {value}
      </button>
    );
  } else if (as === 'anchor') {
    return (
      <a css={buttonStyle(bgColor)} onClick={onClick} href={to}>
        {value}
      </a>
    );
  } else if (as === 'routerLink' && to !== undefined) {
    return (
      <Link css={buttonStyle(bgColor)} onClick={onClick} to={to}>
        {value}
      </Link>
    );
  } else {
    return <Fragment />;
  }
};

export default Button;
