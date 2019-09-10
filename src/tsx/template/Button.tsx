/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, CSSProperties } from 'react';
import { Link } from 'react-router-dom';

const buttonStyle = (style: CSSProperties, hoverStyle: CSSProperties) => css`
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
    ${convertCSSPropertiesObjectToString(hoverStyle)}
  }
`;

type ButtonProps = {
  as: 'submit' | 'button' | 'anchor' | 'routerLink';
  value: string;
  onClick?: (e: React.MouseEvent<HTMLElement>) => void;
  to?: string;
  style?: CSSProperties;
  hoverStyle?: CSSProperties;
};

const convertCSSPropertiesObjectToString = (objCSS: CSSProperties) =>
  Object.entries(objCSS)
    .map(([name, value]: string[]) => {
      const replacedName = name.replace(/[A-Z]/g, (match) => `-${match.toLowerCase()}`);
      return `${replacedName}: ${value};`;
    })
    .join('');

const Button = ({ as, value, onClick, to, style, hoverStyle }: ButtonProps): JSX.Element => {
  const styleObj = style === undefined ? {} : style;
  const hoverStyleObj = hoverStyle === undefined ? {} : hoverStyle;
  if (as === 'submit') {
    return <input css={buttonStyle(styleObj, hoverStyleObj)} type="submit" value={value} onClick={onClick} />;
  } else if (as === 'button') {
    return (
      <button css={buttonStyle(styleObj, hoverStyleObj)} onClick={onClick}>
        {value}
      </button>
    );
  } else if (as === 'anchor' && to !== undefined) {
    return (
      <a css={buttonStyle(styleObj, hoverStyleObj)} href={to}>
        {value}
      </a>
    );
  } else if (as === 'routerLink' && to !== undefined) {
    return (
      <Link css={buttonStyle(styleObj, hoverStyleObj)} to={to}>
        {value}
      </Link>
    );
  } else {
    return <Fragment />;
  }
};

export default Button;
