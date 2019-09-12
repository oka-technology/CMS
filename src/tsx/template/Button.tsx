/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, CSSProperties } from 'react';
import { Link } from 'react-router-dom';

import convertCSSPropertiesObjectToString from '../modules/convertCSSPropertiesObjectToString';

const buttonStyle = (style: CSSProperties, additionalHoverStyle: CSSProperties) => css`
  align-items: center;
  border-radius: 0.5rem;
  border: 0px;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 1.6rem;
  height: 4rem;
  justify-content: center;
  text-decoration: none;
  transition: transform 0.1s;
  width: 10rem;
  ${convertCSSPropertiesObjectToString(style)}

  &:hover {
    transform: scale(1.25);
    transition: transform 0.1s cubic-bezier(0.22, 0.61, 0.36, 1);
    ${convertCSSPropertiesObjectToString(additionalHoverStyle)}
  }
`;

type ButtonProps = {
  as: 'submit' | 'button' | 'anchor' | 'routerLink';
  value: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  to?: string;
  additionalStyle?: CSSProperties;
  additionalHoverStyle?: CSSProperties;
};

const Button = ({ as, value, onClick, to, additionalStyle, additionalHoverStyle }: ButtonProps): JSX.Element => {
  additionalStyle = additionalStyle ? additionalStyle : {};
  additionalHoverStyle = additionalHoverStyle ? additionalHoverStyle : {};
  if (as === 'submit') {
    return (
      <input css={buttonStyle(additionalStyle, additionalHoverStyle)} type="submit" value={value} onClick={onClick} />
    );
  } else if (as === 'button') {
    return (
      <button css={buttonStyle(additionalStyle, additionalHoverStyle)} onClick={onClick}>
        {value}
      </button>
    );
  } else if (as === 'anchor' && to !== undefined) {
    return (
      <a css={buttonStyle(additionalStyle, additionalHoverStyle)} href={to}>
        {value}
      </a>
    );
  } else if (as === 'routerLink' && to !== undefined) {
    return (
      <Link css={buttonStyle(additionalStyle, additionalHoverStyle)} to={to}>
        {value}
      </Link>
    );
  } else {
    return <Fragment />;
  }
};

export default Button;
