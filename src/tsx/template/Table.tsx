/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ReactNode } from 'react';

const tableStyle = css`
  background-color: white;
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
  font-size: 1.8rem;
  padding: 0;
`;

type THeadProps = {
  children: ReactNode;
};

export const THead = ({ children }: THeadProps): JSX.Element => {
  return <thead css={theadStyle}>{children}</thead>;
};

const tbodyStyle = css`
  font-size: 1.6rem;
`;

type TBodyProps = {
  children: ReactNode;
};

export const TBody = ({ children }: TBodyProps): JSX.Element => {
  return <tbody css={tbodyStyle}>{children}</tbody>;
};

const trStyle = css`
  border-bottom: 1px solid #aaa;
  height: 6rem;
`;

type TRowProps = {
  children: ReactNode;
};

export const TRow = ({ children }: TRowProps): JSX.Element => {
  return <tr css={trStyle}>{children}</tr>;
};

const thStyle = (width: string) => css`
  height: 6rem;
  padding-left: 1.5rem;
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

const tdStyle = css`
  padding-left: 1.5rem;
`;

type TDProps = {
  children: ReactNode;
};

export const TD = ({ children }: TDProps): JSX.Element => {
  return <td css={tdStyle}>{children}</td>;
};
