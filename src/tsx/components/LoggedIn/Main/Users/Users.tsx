/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useEffect } from 'react';
import { Redirect } from 'react-router-dom';

import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import { Table, THead, TRow, TH } from '../../../../template/Table';
import UserList from './UserList';

const titleWrapperStyle = css`
  align-items: center;
  display: flex;
`;

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
      {permission.admin ? null : <Redirect to={`${urlOfTopPage}`} />}
      <div css={titleWrapperStyle}>
        <Title value="ユーザー一覧" />
        <Button
          as="routerLink"
          value="新規登録"
          additionalStyle={{ backgroundColor: '#e87c00', margin: '0 0 0 auto' }}
          to={`${urlOfTopPage}/addUser`}
        />
      </div>
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
    </Fragment>
  );
};

export default Users;
