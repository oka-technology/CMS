/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { TBody, TRow, TD } from '../../../../template/Table';
import { convertPermissionNumToString } from '../../../../modules/convertPermission';

type UserListProps = {
  windowHeight: number;
  columnWidthPropotions: string[];
};

type UserInfo = {
  id: string;
  name: string;
  permission: string;
};

const UserList = ({ windowHeight, columnWidthPropotions }: UserListProps): JSX.Element => {
  const [userInfoArray, setUserInfoArray] = useState<UserInfo[]>();
  const [isLoading, setIsLoading] = useState<boolean>(false);
  useEffect(() => {
    (() => {
      setIsLoading(true);
    })();
    axios
      .get('./api/userList.php')
      .then(({ data }) => {
        if (isLoading === true) {
          setUserInfoArray(data);
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

  if (userInfoArray === undefined) return <Fragment />;
  const item: JSX.Element[] = userInfoArray.map(({ id, name, permission }) => {
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
    <TBody additionalStyle={{ height: `calc(${windowHeight}px - (6rem + 8.5rem + 6.2rem + 2.5rem + 5rem))` }}>
      {item}
    </TBody>
  );
};

export default UserList;
