import { useState, useEffect, Fragment } from 'react';
import { TBody, TRow, TD } from '../template/Table';
import { convertPermissionNumToString } from '../modules/convertPermission';
import { loadUser, PayloadLoadUser } from '../data/apiClient';
import styled from 'styled-components';

type UserListProps = {
  windowHeight: number;
  columnWidthPropotions: readonly string[];
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
    void (async () => {
      const usersData = await loadUser({});
      if (unmounted) return;
      if (!usersData) {
        setUserInfoArray(null);
        return;
      }
      setUserInfoArray(usersData);
    })();
    return () => {
      unmounted = true;
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
  return (
    <StyledTBody windowHeight={windowHeight}>
      {userInfoArray.map(({ id, name, permission }) => {
        const stringPermission = convertPermissionNumToString(
          Number(permission),
        );
        return (
          <TRow key={id}>
            <TD width={columnWidthPropotions[0]}>{id}</TD>
            <TD width={columnWidthPropotions[1]}>{name}</TD>
            <TD width={columnWidthPropotions[2]}>{stringPermission}</TD>
          </TRow>
        );
      })}
    </StyledTBody>
  );
};

export default UserList;

interface StyledTBodyProps {
  windowHeight: number;
}
const StyledTBody = styled(TBody)<StyledTBodyProps>`
  height: calc(
    ${({ windowHeight }) => windowHeight}px -
      (6rem + 8.5rem + 6.2rem + 2.5rem + 5rem)
  );
`;
