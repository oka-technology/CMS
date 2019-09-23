/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import CategoriesTable from './CategoriesTable';

import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import { newCategoryRegistrationPage, categoriesPage, TOP_PAGE_PATH } from '../../../../data/pages';
import { Table, THead, TRow, TH } from '../../../../template/Table';

type CategoriesProps = {
  windowHeight: number;
  permission: Permission;
};

const columnWidthPropotions = ['20%', '60%', '20%'];

const Categories = ({ windowHeight, permission }: CategoriesProps): JSX.Element => {
  useEffect(() => {
    document.title = categoriesPage.pageName;
  }, []);
  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Title value={categoriesPage.pageName} additionalStyle={{ float: 'left' }} />
        <Button
          as="routerLink"
          to={newCategoryRegistrationPage.path}
          value="New Registration"
          additionalStyle={{
            backgroundColor: '#e87c00',
            width: '15rem',
            margin: '0 0 0 auto',
          }}
        />
      </div>
      <Table>
        <THead>
          <TRow>
            <TH width={columnWidthPropotions[0]}>ID</TH>
            <TH width={columnWidthPropotions[1]}>Title</TH>
          </TRow>
        </THead>
        <CategoriesTable windowHeight={windowHeight} columnWidthPropotions={columnWidthPropotions} />
      </Table>
      {permission.editor ? null : <Redirect to={TOP_PAGE_PATH} />}
    </Fragment>
  );
};

export default Categories;