/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { arrayOfPagesAfterLoggedIn } from '../../../data/pages';
import permissions from '../../../data/permissions';

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
  line-height: 2rem;
  padding-left: 1.2rem;
  text-decoration: none;
  width: 16rem;
  transition: transform 0.1s;

  &:hover {
    background-color: ${now ? '#444' : '#aaa'};
    transform: ${now ? null : 'scale(1.2)'};
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

type SideBarItemProps = {
  permission: Permission;
};

const SideBarItem = ({ permission }: SideBarItemProps): JSX.Element => {
  const item: (JSX.Element | undefined)[] = arrayOfPagesAfterLoggedIn.map((pageData) => {
    if (
      permissions.some(
        (elem: string) =>
          pageData.requiredPermission[elem] === true && pageData.requiredPermission[elem] === permission[elem],
      )
    ) {
      const link: string = pageData.path;
      return (
        <li css={listItem} key={pageData.path}>
          <NavLink to={link} css={listItemAnchor(location.pathname === link)}>
            <span css={triangle}></span>
            {pageData.pageName}
          </NavLink>
        </li>
      );
    }
  });
  return <Fragment>{item}</Fragment>;
};

export default SideBarItem;
