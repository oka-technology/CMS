/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import { Table, THead, TRow, TH } from '../../../../template/Table';
import UserList from './UserList';

type UsersProps = {
  urlOfTopPage: string;
  permission: Permission;
};

const Users = ({ urlOfTopPage, permission }: UsersProps): JSX.Element => {
  useEffect(() => {
    document.title = 'ユーザー一覧';
  }, []);
  return (
    <Fragment>
      <Title value="ユーザー一覧" additionalStyle={{ float: 'left' }} />
      <Button
        as="routerLink"
        value="新規登録"
        additionalStyle={{
          backgroundColor: '#e87c00',
          margin: '0 0 0 auto',
          position: 'sticky',
          top: '8rem',
        }}
        to={`${urlOfTopPage}/addUser`}
      />
      <Table>
        <THead>
          <TRow>
            <TH width="15%">ID</TH>
            <TH width="30%">User</TH>
            <TH width="55%">Permission</TH>
          </TRow>
        </THead>
        <UserList />
      </Table>
      {permission.admin ? null : <Redirect to={`${urlOfTopPage}`} />}
    </Fragment>
  );
};

export default Users;
