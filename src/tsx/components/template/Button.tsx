/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const buttonStyle = (bgColor: string, margin: string) => css`
  align-items: center;
  background-color: ${bgColor};
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 1.6rem;
  height: 4rem;
  justify-content: center;
  margin: ${margin};
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
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  bgColor: string;
  margin: string;
  to?: string;
};

const Button = ({ as, value, onClick, bgColor, margin, to }: ButtonProps): JSX.Element => {
  if (as === 'submit') {
    return <input css={buttonStyle(bgColor, margin)} type="submit" value={value} onClick={onClick} />;
  } else if (as === 'button') {
    return (
      <button css={buttonStyle(bgColor, margin)} onClick={onClick}>
        {value}
      </button>
    );
  } else if (as === 'anchor' && to !== undefined) {
    return (
      <a css={buttonStyle(bgColor, margin)} href={to}>
        {value}
      </a>
    );
  } else if (as === 'routerLink' && to !== undefined) {
    return (
      <Link css={buttonStyle(bgColor, margin)} to={to}>
        {value}
      </Link>
    );
  } else {
    return <Fragment />;
  }
};

export default Button;
