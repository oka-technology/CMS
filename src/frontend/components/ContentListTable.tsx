import { useState, useEffect, Fragment } from 'react';
import { TBody, TRow, TD } from '../template/Table';
import Button from '../template/Button';
import { loadContentList, PayloadLoadContentList } from '../data/apiClient';
import { editContentPage, viewContentPage } from '../data/pages';
import displayable from '../modules/displayable';
import { Link } from 'react-router-dom';
import styled from 'styled-components';

type ContentListTableProps = {
  windowHeight: number;
  columnWidthPropotions: readonly string[];
  permission: Permission;
};

const ContentListTable = ({
  windowHeight,
  columnWidthPropotions,
  permission,
}: ContentListTableProps): JSX.Element => {
  const [contentInfoArray, setContentInfoArray] = useState<
    PayloadLoadContentList[] | null
  >();

  useEffect(() => {
    let unmounted = false;
    void (async () => {
      const contentListData = await loadContentList({});
      if (unmounted) return;
      setContentInfoArray(contentListData);
    })();
    return () => {
      unmounted = true;
    };
  }, []);

  if (contentInfoArray === undefined) return <Fragment />;
  if (contentInfoArray === null)
    return (
      <tbody>
        <tr>
          <td>No Content</td>
        </tr>
      </tbody>
    );
  return (
    <StyledTBody windowHeight={windowHeight}>
      {contentInfoArray.map(({ id, category, title, registrationDate }) => {
        return (
          <TRow key={id}>
            <TD width={columnWidthPropotions[0]}>{id}</TD>
            <TD width={columnWidthPropotions[1]}>{category}</TD>
            <TD width={columnWidthPropotions[2]}>{title}</TD>
            <TD width={columnWidthPropotions[3]}>{registrationDate}</TD>
            <TD width={columnWidthPropotions[4]}>
              {displayable(viewContentPage, permission) && (
                <Link to={viewContentPage.path.replace(':id', id)}>
                  <ViewButton>View</ViewButton>
                </Link>
              )}
            </TD>
            <TD width={columnWidthPropotions[5]}>
              {displayable(editContentPage, permission) && (
                <Link to={editContentPage.path.replace(':id', id)}>
                  <EditButton>Edit</EditButton>
                </Link>
              )}
            </TD>
          </TRow>
        );
      })}
    </StyledTBody>
  );
};

export default ContentListTable;

interface StyledTBodyProps {
  windowHeight: number;
}
const StyledTBody = styled(TBody)<StyledTBodyProps>`
  height: calc(
    ${({ windowHeight }) => windowHeight}px -
      (6rem + 8.5rem + 6.2rem + 2.5rem + 5rem)
  );
`;

const ViewButton = styled(Button)`
  background-color: #00c8ff;
  width: 6rem;
`;

const EditButton = styled(Button)`
  background-color: #00ed33;
  width: 6rem;
`;
