import { useState, useEffect, Fragment, VFC } from 'react';

import { TBody, TRow, TD } from '../template/Table';
import { loadCategories, PayloadLoadCategories } from '../data/apiClient';
import styled from 'styled-components';
import useWindowHeight from '../layout/useWindowHeight';

interface CategoriesTableProps {
  columnWidthPropotions: readonly string[];
}

const CategoriesTable: VFC<CategoriesTableProps> = ({
  columnWidthPropotions,
}) => {
  const [contentInfoArray, setContentInfoArray] = useState<
    PayloadLoadCategories[] | null
  >();

  const windowHeight = useWindowHeight();

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
