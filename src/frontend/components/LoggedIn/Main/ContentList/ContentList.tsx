import { useEffect } from 'react';

import ContentListTable from './ContentListTable';

import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import {
  newContentRegistrationPage,
  contentListPage,
} from '../../../../data/pages';
import { Table, THead, TRow, TH } from '../../../../template/Table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

type ContentListProps = {
  permission: Permission;
  windowHeight: number;
};

const columnWidthPropotions = [
  '7%',
  '20%',
  '35%',
  '18%',
  '10%',
  '10%',
] as const;

const ContentList = ({
  permission,
  windowHeight,
}: ContentListProps): JSX.Element => {
  useEffect(() => {
    document.title = contentListPage.pageName;
  }, []);

  return (
    <>
      <Head>
        <Title value={contentListPage.pageName} />
        {permission.editor ? (
          <Link to={newContentRegistrationPage.path}>
            <RegisterButton>New Registration</RegisterButton>
          </Link>
        ) : null}
      </Head>
      <Table>
        <THead>
          <TRow>
            <StyledTH width={columnWidthPropotions[0]}>ID</StyledTH>
            <StyledTH width={columnWidthPropotions[1]}>Category</StyledTH>
            <StyledTH width={columnWidthPropotions[2]}>Title</StyledTH>
            <StyledTH width={columnWidthPropotions[3]}>
              Registration Date
            </StyledTH>
          </TRow>
        </THead>
        <ContentListTable
          windowHeight={windowHeight}
          columnWidthPropotions={columnWidthPropotions}
          permission={permission}
        />
      </Table>
    </>
  );
};

export default ContentList;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const RegisterButton = styled(Button)`
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
