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

type TableProps = {
  children: ReactNode;
};

export const Table = ({ children }: TableProps): JSX.Element => {
  return <table css={tableStyle}>{children}</table>;
};

const theadStyle = css`
  border-top: 3px solid #aaa;
  border-bottom: 3px solid #aaa;
  display: block;
  font-size: 1.8rem;
  padding: 0;
  width: 100%;
`;

type THeadProps = {
  children: ReactNode;
};

export const THead = ({ children }: THeadProps): JSX.Element => {
  return <thead css={theadStyle}>{children}</thead>;
};

const tbodyStyle = (additionalStyle: CSSProperties) => css`
  display: block;
  font-size: 1.6rem;
  overflow: scroll;
  width: 100%;
  ${convertCSSPropertiesObjectToString(additionalStyle)}
`;

type TBodyProps = {
  children: ReactNode;
  additionalStyle?: CSSProperties;
};

export const TBody = ({ children, additionalStyle }: TBodyProps): JSX.Element => {
  additionalStyle = additionalStyle ? additionalStyle : {};
  return <tbody css={tbodyStyle(additionalStyle)}>{children}</tbody>;
};

const trStyle = css`
  display: block;
  height: 6rem;
  width: 100%;

  tbody > & {
    border-bottom: 1px solid #aaa;
  }
`;

type TRowProps = {
  children: ReactNode;
};

export const TRow = ({ children }: TRowProps): JSX.Element => {
  return <tr css={trStyle}>{children}</tr>;
};

const thStyle = (width: string) => css`
  align-items: center;
  display: inline-flex;
  height: 100%;
  padding: 0 0 0 1.5rem;
  text-align: left;
  width: ${width};
`;

type THProps = {
  width: string;
  children: ReactNode;
};

export const TH = ({ children, width }: THProps): JSX.Element => {
  return <th css={thStyle(width)}>{children}</th>;
};

const tdStyle = (width: string) => css`
  align-items: center;
  display: inline-flex;
  height: 100%;
  padding-left: 1.5rem;
  width: ${width};
`;

type TDProps = {
  children: ReactNode;
  width: string;
};

export const TD = ({ children, width }: TDProps): JSX.Element => {
  return <td css={tdStyle(width)}>{children}</td>;
};
