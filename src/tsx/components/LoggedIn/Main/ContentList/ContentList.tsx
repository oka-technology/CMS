/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment, useEffect } from 'react';

import ContentListTable from './ContentListTable';

import Title from '../../../../template/Title';
import Button from '../../../../template/Button';
import { newContentRegistrationPage, contentListPage } from '../../../../data/pages';
import { Table, THead, TRow, TH } from '../../../../template/Table';

type ContentListProps = {
  permission: Permission;
  windowHeight: number;
};

const columnWidthPropotions = ['7%', '20%', '35%', '18%', '10%', '10%'];

const ContentList = ({ permission, windowHeight }: ContentListProps): JSX.Element => {
  useEffect(() => {
    document.title = contentListPage.pageName;
  }, []);

  return (
    <Fragment>
      <div
        css={css`
          display: flex;
          align-items: center;
        `}
      >
        <Title value={contentListPage.pageName} />
        {permission.editor ? (
          <Button
            as="routerLink"
            to={newContentRegistrationPage.path}
            value="New Registration"
            additionalStyle={{
              backgroundColor: '#e87c00',
              width: '15rem',
              margin: '0 0 0 auto',
            }}
          />
        ) : null}
      </div>
      <Table>
        <THead>
          <TRow>
            <TH width={columnWidthPropotions[0]}>ID</TH>
            <TH width={columnWidthPropotions[1]}>Category</TH>
            <TH width={columnWidthPropotions[2]}>Title</TH>
            <TH width={columnWidthPropotions[3]}>Registration Date</TH>
          </TRow>
        </THead>
        <ContentListTable
          windowHeight={windowHeight}
          columnWidthPropotions={columnWidthPropotions}
          permission={permission}
        />
      </Table>
    </Fragment>
  );
};

export default ContentList;
