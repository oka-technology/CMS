/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { ReactNode } from 'react';

const tableStyle = css`
  font-size: 1.6rem;
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
  align-items: center;
  display: flex;
  height: 6rem;
  padding: 0;
`;

type THeadProps = {
  children: ReactNode;
};

export const THead = ({ children }: THeadProps): JSX.Element => {
  return <thead css={theadStyle}>{children}</thead>;
};

const tbodyStyle = css`
  & > tr {
    border-top: 1px solid #777;
  }
`;

type TBodyProps = {
  children: ReactNode;
};

export const TBody = ({ children }: TBodyProps): JSX.Element => {
  return <tbody css={tbodyStyle}>{children}</tbody>;
};

const trStyle = css``;

type TRowProps = {
  children: ReactNode;
};

export const TRow = ({ children }: TRowProps): JSX.Element => {
  return <tr css={trStyle}>{children}</tr>;
};

type THProps = {
  children: ReactNode;
};

export const TH = ({ children }: THProps): JSX.Element => {
  return <th>{children}</th>;
};

type TDProps = {
  children: ReactNode;
};

export const TD = ({ children }: TDProps): JSX.Element => {
  return <td>{children}</td>;
};
