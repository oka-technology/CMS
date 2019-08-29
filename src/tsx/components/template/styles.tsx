/** @jsx jsx */
import { css } from '@emotion/core';

export const styleOfButton = (backGroundColor: string) =>
  css`
    align-items: center;
    background-color: ${backGroundColor};
    border-radius: 0.5rem;
    color: #fff;
    cursor: pointer;
    display: flex;
    font-size: 1.6rem;
    height: 4.0rem;
    justify-content: center;
    margin-top: 2.0rem;
    text-decoration: none;
    transition: transform 0.2s;
    width: 10.0rem;
    
    &:hover{
      transform: scale(1.15);
      transition: transform 0.3s cubic-bezier(.1,1.06,1,2);
    }
  `;

