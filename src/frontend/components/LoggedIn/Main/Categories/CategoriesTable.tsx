/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';

import { TBody, TRow, TD } from '../../../../template/Table';
import Button from '../../../../template/Button';
import {
  loadCategories,
  PayloadLoadCategories,
} from '../../../../data/apiClient';

type CategoriesTableProps = {
  windowHeight: number;
  columnWidthPropotions: string[];
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
    const cancelTokenSource = axios.CancelToken.source();
    (async () => {
      const categoriesData = await loadCategories(null, cancelTokenSource);
      if (unmounted) return;
      setContentInfoArray(categoriesData);
    })();
    return () => {
      cancelTokenSource.cancel();
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
  const item: JSX.Element[] = contentInfoArray.map(({ id, title }) => {
    return (
      <TRow key={id}>
        <TD width={columnWidthPropotions[0]}>{id}</TD>
        <TD width={columnWidthPropotions[1]}>{title}</TD>
        <TD width={columnWidthPropotions[2]}>
          <Button
            as="routerLink"
            value="Edit"
            additionalStyle={css`
              background-color: #00ed33;
            `}
          />
        </TD>
      </TRow>
    );
  });
  return (
    <TBody
      additionalStyle={css`
        height: calc(
          ${windowHeight}px - (6rem + 8.5rem + 6.2rem + 2.5rem + 5rem)
        );
      `}
    >
      {item}
    </TBody>
  );
};

export default CategoriesTable;
