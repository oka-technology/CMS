import { useEffect, VFC } from 'react';

import Title from '../template/Title';
import Button from '../template/Button';
import { Table, THead, TRow, TH } from '../template/Table';
import UserTable from '../components/UsersTable';

import { newUserRegistrationPage, usersPage } from '../data/pages';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface UsersProps {}

const columnWidthPropotions = ['15%', '35%', '50%'] as const;

const Users: VFC<UsersProps> = () => {
  useEffect(() => {
    document.title = usersPage.pageName;
  }, []);
  return (
    <>
      <Head>
        <Title value={usersPage.pageName} />
        <Link to={newUserRegistrationPage.path}>
          <NewRegistrationButton>New Registration</NewRegistrationButton>
        </Link>
      </Head>
      <Table>
        <THead>
          <TRow>
            <StyledTH width={columnWidthPropotions[0]}>ID</StyledTH>
            <StyledTH width={columnWidthPropotions[1]}>E-mail</StyledTH>
            <StyledTH width={columnWidthPropotions[2]}>Permission</StyledTH>
          </TRow>
        </THead>
        <UserTable columnWidthPropotions={columnWidthPropotions} />
      </Table>
    </>
  );
};

export default Users;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const NewRegistrationButton = styled(Button)`
  background-color: #e87c00;
  width: 15rem;
  margin: 0 0 0 auto;
`;

interface StyledTHProps {
  width: `${number}%`;
}
const StyledTH = styled(TH)<StyledTHProps>`
  width: ${({ width }) => width};
`;
