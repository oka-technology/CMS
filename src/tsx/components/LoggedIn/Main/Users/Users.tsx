/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';

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
};

const Users = ({ urlOfTopPage }: UsersProps): JSX.Element => {
  return (
    <Fragment>
      <div css={titleWrapperStyle}>
        <Title value="ユーザー一覧" />
        <Button
          as="routerLink"
          value="新規登録"
          style={{ backgroundColor: '#4c4cf7', margin: '0 0 0 auto' }}
          to={`${urlOfTopPage}/registUser`}
        />
      </div>
      <Table>
        <THead>
          <TRow>
            <TH width="15%">ID</TH>
            <TH width="30%">User</TH>
            <TH width="55%">Authority</TH>
          </TRow>
        </THead>
        <UserList />
      </Table>
    </Fragment>
  );
};

export default Users;