/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import { Table, THead, TRow, TH } from '../../../../template/Table';
import UserList from './UserList';

import { TOP_PAGE_PATH, newUserRegistrationPage, usersPage } from '../../../../data/pages';

type UsersProps = {
  permission: Permission;
  windowHeight: number;
};

const columnWidthPropotions: string[] = ['15%', '30%', '55%'];

const Users = ({ permission, windowHeight }: UsersProps): JSX.Element => {
  useEffect(() => {
    document.title = usersPage.pageName;
  }, []);
  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Title value={usersPage.pageName} />
        <Button
          as="routerLink"
          value="New Registration"
          additionalStyle={{
            backgroundColor: '#e87c00',
            width: '15rem',
            margin: '0 0 0 auto',
          }}
          to={newUserRegistrationPage.path}
        />
      </div>
      <Table>
        <THead>
          <TRow>
            <TH width={columnWidthPropotions[0]}>ID</TH>
            <TH width={columnWidthPropotions[1]}>E-mail</TH>
            <TH width={columnWidthPropotions[2]}>Permission</TH>
          </TRow>
        </THead>
        <UserList windowHeight={windowHeight} columnWidthPropotions={columnWidthPropotions} />
      </Table>
      {permission.admin ? null : <Redirect to={TOP_PAGE_PATH} />}
    </Fragment>
  );
};

export default Users;
