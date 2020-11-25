import styled from 'styled-components';

export const Table = styled.table`
  background-color: white;
  display: block;
  margin: 0 auto;
  padding: 0;
  width: 100%;
`;

export const THead = styled.thead`
  border-top: 3px solid #aaa;
  border-bottom: 3px solid #aaa;
  display: block;
  font-size: 1.8rem;
  padding: 0;
  width: 100%;
`;

export const TBody = styled.tbody`
  display: block;
  font-size: 1.6rem;
  overflow: scroll;
  width: 100%;
`;

export const TRow = styled.tr`
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

export const TH = styled.th`
  align-items: center;
  display: inline-flex;
  height: 100%;
  padding: 0 0 0 1.5rem;
  text-align: left;
`;

export const TD = styled.td`
  align-items: center;
  display: inline-flex;
  height: 100%;
  padding-left: 1.5rem;
`;
