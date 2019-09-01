/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

type SideBarItemObject = {
  link: string;
  contents: string;
  requiredAuthority: Authority;
};

type SideBarItemProps = {
  authority: Authority;
  url: string;
};

const listItem = css`
  font-size: 1.5rem;
  height: 4rem;
  margin: 0 auto;
  width: 12rem;
  & + & {
    border-top: 1px solid #ddd;
  }
`;

const listItemAnchor = css`
  color: #eee;
  display: block;
  height: 4rem;
  line-height: 4rem;
  padding-left: 0.5rem;
  text-decoration: none;
`;

const sideBarItemObject: SideBarItemObject[] = [
  {
    contents: 'ユーザー一覧',
    requiredAuthority: {
      admin: true,
      editor: false,
      viewer: false,
    },
    link: 'users',
  },
  {
    contents: 'ユーザー登録',
    requiredAuthority: {
      admin: true,
      editor: false,
      viewer: false,
    },
    link: 'registUser',
  },
  {
    contents: 'コンテンツ一覧',
    requiredAuthority: {
      admin: false,
      editor: true,
      viewer: true,
    },
    link: 'contents',
  },
  {
    contents: 'コンテンツ登録',
    requiredAuthority: {
      admin: false,
      editor: true,
      viewer: false,
    },
    link: 'registContent',
  },
  {
    contents: 'カテゴリ一覧',
    requiredAuthority: {
      admin: false,
      editor: true,
      viewer: false,
    },
    link: 'category',
  },
  {
    contents: 'カテゴリ登録',
    requiredAuthority: {
      admin: false,
      editor: true,
      viewer: false,
    },
    link: 'registCategory',
  },
];

const authorityList = ['admin', 'editor', 'viewer'];

const SideBarItem = ({ authority, url }: SideBarItemProps): JSX.Element => {
  const item: (JSX.Element | undefined)[] = sideBarItemObject.map((object) => {
    if (authorityList.some((elem: string) => object.requiredAuthority[elem] === authority[elem])) {
      return (
        <li css={listItem} key={object.link}>
          <Link to={`${url}/${object.link}`} css={listItemAnchor}>
            {object.contents}
          </Link>
        </li>
      );
    }
  });
  return <Fragment>{item}</Fragment>;
};

export default SideBarItem;
