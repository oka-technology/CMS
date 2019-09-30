/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ReactNode, CSSProperties } from 'react';

import convertCSSPropertiesObjectToString from '../modules/convertCSSPropertiesObjectToString';

const tableStyle = css`
  background-color: white;
  display: block;
  margin: 0 auto;
  padding: 0;
  width: 100%;
`;

const theadStyle = css`
  border-top: 3px solid #aaa;
  border-bottom: 3px solid #aaa;
  display: block;
  font-size: 1.8rem;
  padding: 0;
  width: 100%;
`;

const tbodyStyle = (additionalStyle: CSSProperties) => css`
  display: block;
  font-size: 1.6rem;
  overflow: scroll;
  width: 100%;
  ${convertCSSPropertiesObjectToString(additionalStyle)}
`;

const trStyle = css`
  display: block;
  height: 6rem;
  line-height: 2rem;
  width: 100%;

  thead > & {
    height: 4.5rem;
  }

  tbody > & {
    border-bottom: 1px solid #aaa;
  }
`;

const thStyle = (width: string) => css`
  align-items: center;
  display: inline-flex;
  height: 100%;
  padding: 0 0 0 1.5rem;
  text-align: left;
  width: ${width};
`;

const tdStyle = (width: string) => css`
  align-items: center;
  display: inline-flex;
  height: 100%;
  padding-left: 1.5rem;
  width: ${width};
`;

type TableProps = {
  children: ReactNode;
};

type THeadProps = {
  children: ReactNode;
};

type TBodyProps = {
  children: ReactNode;
  additionalStyle?: CSSProperties;
};

type TRowProps = {
  children: ReactNode;
};

type THProps = {
  width: string;
  children: ReactNode;
};

type TDProps = {
  children: ReactNode;
  width: string;
};

export const Table = ({ children }: TableProps): JSX.Element => {
  return <table css={tableStyle}>{children}</table>;
};

export const THead = ({ children }: THeadProps): JSX.Element => {
  return <thead css={theadStyle}>{children}</thead>;
};

export const TBody = ({ children, additionalStyle }: TBodyProps): JSX.Element => {
  additionalStyle = additionalStyle ? additionalStyle : {};
  return <tbody css={tbodyStyle(additionalStyle)}>{children}</tbody>;
};

export const TRow = ({ children }: TRowProps): JSX.Element => {
  return <tr css={trStyle}>{children}</tr>;
};

export const TH = ({ children, width }: THProps): JSX.Element => {
  return <th css={thStyle(width)}>{children}</th>;
};

export const TD = ({ children, width }: TDProps): JSX.Element => {
  return <td css={tdStyle(width)}>{children}</td>;
};
