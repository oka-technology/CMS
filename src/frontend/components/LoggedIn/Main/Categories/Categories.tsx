import { useEffect } from 'react';
import CategoriesTable from './CategoriesTable';
import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import {
  newCategoryRegistrationPage,
  categoriesPage,
} from '../../../../data/pages';
import { Table, THead, TRow, TH } from '../../../../template/Table';
import styled from 'styled-components';
import { Link } from 'react-router-dom';

interface CategoriesProps {
  windowHeight: number;
}

const columnWidthPropotions = ['20%', '60%', '20%'] as const;

const Categories = ({ windowHeight }: CategoriesProps): JSX.Element => {
  useEffect(() => {
    document.title = categoriesPage.pageName;
  }, []);
  return (
    <>
      <Head>
        <StyledTitle value={categoriesPage.pageName} />
        <Link to={newCategoryRegistrationPage.path}>
          <StyledButton>New Registration</StyledButton>
        </Link>
      </Head>
      <Table>
        <THead>
          <TRow>
            <StyledTH width={columnWidthPropotions[0]}>ID</StyledTH>
            <StyledTH width={columnWidthPropotions[1]}>Title</StyledTH>
          </TRow>
        </THead>
        <CategoriesTable
          windowHeight={windowHeight}
          columnWidthPropotions={columnWidthPropotions}
        />
      </Table>
    </>
  );
};

export default Categories;

const Head = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
`;

const StyledTitle = styled(Title)`
  float: left;
`;

const StyledButton = styled(Button)`
  background-color: #e87c00;
  width: 15rem;
  margin: 0 0 auto;
`;

interface StyledTHProps {
  width: `${number}%`;
}

const StyledTH = styled(TH)<StyledTHProps>`
  width: ${({ width }) => width};
`;
