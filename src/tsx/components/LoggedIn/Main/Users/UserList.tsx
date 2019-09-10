/** @jsx jsx */
import { jsx } from '@emotion/core';
import { useState, useEffect, Fragment } from 'react';
import axios from 'axios';
import { TBody, TRow, TD } from '../../../../template/Table';
import { convertAuthorityNumToString } from '../../../../modules/convertAuthority';

type UserInfo = {
  id: string;
  name: string;
  authority: string;
};

const UserList = (): JSX.Element => {
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
  const item: JSX.Element[] = userInfoArray.map(({ id, name, authority }) => {
    const stringAuthority = convertAuthorityNumToString(Number(authority));
    return (
      <TRow key={id}>
        <TD>{id}</TD>
        <TD>{name}</TD>
        <TD>{stringAuthority}</TD>
      </TRow>
    );
  });
  return <TBody>{item}</TBody>;
};

export default UserList;
