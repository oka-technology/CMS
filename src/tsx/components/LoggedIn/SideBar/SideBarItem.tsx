/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import { Link } from 'react-router-dom';

const listItem = css`
  display: flex;
  font-size: 1.6rem;
  height: 6rem;
  justify-content: center;
  margin: 0 auto;
  width: 15rem;
  & + & {
    border-top: 1px solid #ddd;
  }
`;

const listItemAnchor = (now: boolean) => css`
  align-items: center;
  background-color: ${now ? '#444' : null};
  border-radius: 0.5rem;
  color: #fff;
  display: flex;
  height: 5.9rem;
  line-height: 4rem;
  padding-left: 1.2rem;
  text-decoration: none;
  width: 16rem;

  &:hover {
    background-color: ${now ? '#444' : '#888'};
  }
`;

const triangle = css`
  border-top: 0.4rem solid transparent;
  border-left: 0.6rem solid #fff;
  border-bottom: 0.4rem solid transparent;
  display: block;
  height: 0.8rem;
  margin-right: 1rem;
  width: 0.8rem;
`;

type SideBarItemObject = {
  link: string;
  contents: string;
  requiredAuthority: Authority;
};

type SideBarItemProps = {
  authority: Authority;
  urlOfTopPage: string;
};

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

const SideBarItem = ({ authority, urlOfTopPage }: SideBarItemProps): JSX.Element => {
  const item: (JSX.Element | undefined)[] = sideBarItemObject.map((object) => {
    if (authorityList.some((elem: string) => object.requiredAuthority[elem] === authority[elem])) {
      const link: string = `${urlOfTopPage}/${object.link}`;
      return (
        <li css={listItem} key={object.link}>
          <Link to={link} css={listItemAnchor(location.pathname === link)}>
            <span css={triangle}></span>
            {object.contents}
          </Link>
        </li>
      );
    }
  });
  return <Fragment>{item}</Fragment>;
};

export default SideBarItem;
