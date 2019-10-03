/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { TBody, TRow, TD } from '../../../../template/Table';
import Button from '../../../../template/Button';
import { loadContentList, PayloadLoadContentList } from '../../../../data/apiClient';
import { editContentPage, viewContentPage } from '../../../../data/pages';

type ContentListTableProps = {
  windowHeight: number;
  columnWidthPropotions: string[];
  permission: Permission;
};

const ContentListTable = ({ windowHeight, columnWidthPropotions, permission }: ContentListTableProps): JSX.Element => {
  const [contentInfoArray, setContentInfoArray] = useState<PayloadLoadContentList[] | null>();

  useEffect(() => {
    let unmounted = false;
    const cancelTokenSource = axios.CancelToken.source();
    (async () => {
      const contentListData = await loadContentList(null, cancelTokenSource);
      if (unmounted) return;
      setContentInfoArray(contentListData);
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
  const item: JSX.Element[] = contentInfoArray.map(({ id, category, title, registrationDate }) => {
    return (
      <TRow key={id}>
        <TD width={columnWidthPropotions[0]}>{id}</TD>
        <TD width={columnWidthPropotions[1]}>{category}</TD>
        <TD width={columnWidthPropotions[2]}>{title}</TD>
        <TD width={columnWidthPropotions[3]}>{registrationDate}</TD>
        <TD width={columnWidthPropotions[4]}>
          <Button
            as="routerLink"
            to={viewContentPage.path.replace(':id', id)}
            value="View"
            additionalStyle={{ backgroundColor: '#00c8ff', width: '6rem' }}
          />
        </TD>
        {permission.editor && (
          <TD width={columnWidthPropotions[5]}>
            <Button
              as="routerLink"
              to={editContentPage.path.replace(':id', id)}
              value="Edit"
              additionalStyle={{ backgroundColor: '#00ed33', width: '6rem' }}
            />
          </TD>
        )}
      </TRow>
    );
  });
  return (
    <TBody additionalStyle={{ height: `calc(${windowHeight}px - (6rem + 8.5rem + 6.2rem + 2.5rem + 5rem))` }}>
      {item}
    </TBody>
  );
};

export default ContentListTable;
