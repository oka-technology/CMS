/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';

type ButtonProps = {
  as: ('submit' | 'button' | 'anchor'),
  value: string,
  onClick: (e: React.MouseEvent<HTMLElement>) => void,
  bgColor: string,
}


const buttonStyle = (bgColor: string) => css`
  align-items: center;
  background-color: ${bgColor};
  border-radius: 0.5rem;
  color: #fff;
  cursor: pointer;
  display: flex;
  font-size: 1.6rem;
  height: 4.0rem;
  justify-content: center;
  margin-top: 2.5rem;
  text-decoration: none;
  transition: transform 0.1s;
  width: 10.0rem;
  
  &:hover{
    transform: scale(1.15);
    transition: transform 0.1s cubic-bezier(0.22, 0.61, 0.36, 1);
  }
`;

const Button = ({ as, value, onClick, bgColor }: ButtonProps): JSX.Element => {
  if (as === 'submit') {
    return(
      <input css={buttonStyle(bgColor)} type='submit' value={value} onClick={onClick} />
    )
  } else if (as === 'button') {
    return(
      <button css={buttonStyle(bgColor)} onClick={onClick} >{value}</button>
    )
  } else if (as === 'anchor') {
    return(
      <a css={buttonStyle(bgColor)} onClick={onClick} >{value}</a>
    )
  } else {
    return(<Fragment />);
  }
}

export default Button;
