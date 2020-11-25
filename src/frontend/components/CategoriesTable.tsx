import { useState, useEffect, Fragment } from 'react';

import { TBody, TRow, TD } from '../template/Table';
import { loadCategories, PayloadLoadCategories } from '../data/apiClient';
import styled from 'styled-components';

type CategoriesTableProps = {
  windowHeight: number;
  columnWidthPropotions: readonly string[];
};

const CategoriesTable = ({
  windowHeight,
  columnWidthPropotions,
}: CategoriesTableProps): JSX.Element => {
  const [contentInfoArray, setContentInfoArray] = useState<
    PayloadLoadCategories[] | null
  >();

  useEffect(() => {
    let unmounted = false;
    void (async () => {
      const categoriesData = await loadCategories({});
      if (unmounted) return;
      setContentInfoArray(categoriesData);
    })();
    return () => {
      unmounted = true;
    };
  }, []);

  if (contentInfoArray === undefined) return <Fragment />;
  if (contentInfoArray === null)
    return (
      <tbody>
        <tr>
          <td>No Content</td>
        </tr>
      </tbody>
    );
  return (
    <StyledTBody windowHeight={windowHeight}>
      {contentInfoArray.map(({ id, title }) => {
        return (
          <TRow key={id}>
            <TD width={columnWidthPropotions[0]}>{id}</TD>
            <TD width={columnWidthPropotions[1]}>{title}</TD>
            <TD width={columnWidthPropotions[2]}></TD>
          </TRow>
        );
      })}
    </StyledTBody>
  );
};

export default CategoriesTable;

interface StyledTBodyProps {
  windowHeight: number;
}

const StyledTBody = styled(TBody)<StyledTBodyProps>`
  height: calc(
    ${({ windowHeight }) => windowHeight}px -
      (6rem + 8.5rem + 6.2rem + 2.5rem + 5rem)
  );
`;
