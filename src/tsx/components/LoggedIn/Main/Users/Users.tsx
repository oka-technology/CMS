/** @jsx jsx */
import { jsx } from '@emotion/core';
import { Fragment } from 'react';

import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import { Table, THead, TRow, TH } from '../../../../template/Table';
import UserList from './UserList';

type UsersProps = {
  urlOfTopPage: string;
};

const Users = ({ urlOfTopPage }: UsersProps): JSX.Element => {
  return (
    <Fragment>
      <Title value="ユーザー一覧" />
      <Button
        as="routerLink"
        value="新規登録"
        style={{ backgroundColor: '#4c4cf7', margin: '0' }}
        to={`${urlOfTopPage}/registUser`}
      />
      <Table>
        <THead>
          <TRow>
            <TH>ID</TH>
            <TH>User</TH>
            <TH>Authority</TH>
          </TRow>
        </THead>
      </Table>
      <UserList />
    </Fragment>
  );
};

export default Users;
