/** @jsx jsx */
import { jsx, css } from '@emotion/core'
import { useState, useEffect, Fragment } from 'react';
import { Link } from 'react-router-dom';

type SideBarItemObject = {
  link: string,
  contents: string,
  requiredAuthority: Authority,
}

type SideBarItemProps = {
  authority: Authority,
}

const listItem = css`
  font-size: 1.5rem;
  height: 4.0rem;
  margin: 0 auto;
  width: 12.0rem;
  & + &{
    border-top: 1px solid #ddd;
  }
`;

const listItemAnchor = css`
  color: #eee;
  display: block;
  height: 4.0rem;
  line-height: 4.0rem;
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
    link: '/',
  },
  {
    contents: 'ユーザー登録',
    requiredAuthority: {
      admin: true,
      editor: false,
      viewer: false,
    },
    link: '/',
  },
  {
    contents: 'コンテンツ一覧',
    requiredAuthority: {
      admin: false,
      editor: true,
      viewer: true,
    },
    link: '/',
  },
  {
    contents: 'コンテンツ登録',
    requiredAuthority: {
      admin: false,
      editor: true,
      viewer: false,
    },
    link: '/',
  },
  {
    contents: 'カテゴリ一覧',
    requiredAuthority: {
      admin: false,
      editor: true,
      viewer: false,
    },
    link: '/',
  },
  {
    contents: 'カテゴリ登録',
    requiredAuthority: {
      admin: false,
      editor: true,
      viewer: false,
    },
    link: '/',
  }
]

const authorityList = ['admin', 'editor', 'viewer']

const SideBarItem = ({authority}: SideBarItemProps): JSX.Element => {
  const item: (JSX.Element | undefined)[] = sideBarItemObject.map(object => {
    if (authorityList.some((elem: string) => object.requiredAuthority[elem] === authority[elem])) {
      return <li css={listItem} key={object.link}>
        <Link to={object.link} css={listItemAnchor}>
          {object.contents}
        </Link>
      </li>
    }
  })
  return (
    <Fragment>
      {item}
    </Fragment>
  )
}

export default SideBarItem;
