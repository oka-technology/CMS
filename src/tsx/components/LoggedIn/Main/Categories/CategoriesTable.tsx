/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { TBody, TRow, TD } from '../../../../template/Table';
import Button from '../../../../template/Button';

type CategoriesTableProps = {
  windowHeight: number;
  columnWidthPropotions: string[];
};

type CategoriesInfo = {
  id: string;
  title: string;
};

const CategoriesTable = ({ windowHeight, columnWidthPropotions }: CategoriesTableProps): JSX.Element => {
  const [contentInfoArray, setContentInfoArray] = useState<CategoriesInfo[] | null>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    (() => {
      setIsLoading(true);
    })();
    axios
      .get('./api/categories.php')
      .then(({ data }) => {
        const resultData: CategoriesInfo[] = data;
        if (isLoading === true) {
          setContentInfoArray(resultData);
        }
      })
      .catch((error) => {
        // eslint-disable-next-line no-console
        console.log(error);
      });
    return () => {
      setIsLoading(false);
      axios.CancelToken.source().cancel();
    };
  }, [isLoading]);

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
          <Button as="routerLink" value="Edit" additionalStyle={{ backgroundColor: '#00ed33' }} />
        </TD>
      </TRow>
    );
  });
  return (
    <TBody additionalStyle={{ height: `calc(${windowHeight}px - (6rem + 8.5rem + 6.2rem + 2.5rem + 5rem))` }}>
      {item}
    </TBody>
  );
};

export default CategoriesTable;
