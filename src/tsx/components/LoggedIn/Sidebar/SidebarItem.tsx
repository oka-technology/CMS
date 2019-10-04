/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { Fragment } from 'react';
import { NavLink } from 'react-router-dom';
import { arrayOfPagesInSidebar } from '../../../data/pages';
import canPageBeDisplayed from '../../../modules/canPageBeDisplayed';

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
    transition: transform 0.1s;
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

const SidebarItem = ({ permission }: SideBarItemProps): JSX.Element => {
  const item: (JSX.Element | undefined)[] = arrayOfPagesInSidebar.map((pageData) => {
    if (canPageBeDisplayed(pageData, permission)) {
      const link: string = pageData.path;
      if (location.pathname === link) {
        return (
          <li css={listItem} key={pageData.path}>
            <div css={listItemAnchor(location.pathname.match(link) !== null)}>
              <span css={triangle}></span>
              {pageData.pageName}
            </div>
          </li>
        );
      } else {
        return (
          <li css={listItem} key={pageData.path}>
            <NavLink to={link} css={listItemAnchor(location.pathname.match(link) !== null)}>
              <span css={triangle}></span>
              {pageData.pageName}
            </NavLink>
          </li>
        );
      }
    }
  });

  return <Fragment>{item}</Fragment>;
};

export default SidebarItem;
