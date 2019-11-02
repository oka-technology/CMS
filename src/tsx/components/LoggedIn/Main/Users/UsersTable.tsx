/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { TBody, TRow, TD } from '../../../../template/Table';
import { convertPermissionNumToString } from '../../../../modules/convertPermission';
import { loadUser, PayloadLoadUser } from '../../../../data/apiClient';

type UserListProps = {
  windowHeight: number;
  columnWidthPropotions: string[];
};

const UserList = ({
  windowHeight,
  columnWidthPropotions,
}: UserListProps): JSX.Element => {
  const [userInfoArray, setUserInfoArray] = useState<
    PayloadLoadUser[] | null
  >();

  useEffect(() => {
    let unmounted = false;
    const cancelTokenSource = axios.CancelToken.source();
    (async () => {
      const usersData = await loadUser(null, cancelTokenSource);
      if (unmounted) return;
      if (!usersData) {
        setUserInfoArray(null);
        return;
      }
      setUserInfoArray(usersData);
    })();
    return () => {
      unmounted = true;
      cancelTokenSource.cancel();
    };
  }, []);

  if (userInfoArray === undefined) return <Fragment />;
  if (userInfoArray === null)
    return (
      <tbody>
        <tr>
          <td>No Content</td>
        </tr>
      </tbody>
    );
  const rows: JSX.Element[] = userInfoArray.map(({ id, name, permission }) => {
    const stringPermission = convertPermissionNumToString(Number(permission));
    return (
      <TRow key={id}>
        <TD width={columnWidthPropotions[0]}>{id}</TD>
        <TD width={columnWidthPropotions[1]}>{name}</TD>
        <TD width={columnWidthPropotions[2]}>{stringPermission}</TD>
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
      {rows}
    </TBody>
  );
};

export default UserList;
