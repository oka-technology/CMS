/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import bp from '../../../data/mediaQuery';

import SidebarItem from './SidebarItem';

const sideBarStyle = (windowHeight: number) => css`
  background-color: #777;
  height: calc(${windowHeight}px - 11rem);
  min-width: 16rem;
  width: 20rem;

  ${bp[0]} {
    width: calc(20rem + (100% - 120rem) / 2);
  }
`;

const sidebarListWrapperStyle = css`
  list-style: none;
  margin: 2rem 2rem 0 auto;
  padding: 0;
  width: 16rem;
`;

type SidebarProps = {
  permission: Permission;
  windowHeight: number;
};

const Sidebar = ({ permission, windowHeight }: SidebarProps): JSX.Element => {
  return (
    <aside css={sideBarStyle(windowHeight)}>
      <nav>
        <ul css={sidebarListWrapperStyle}>
          <SidebarItem permission={permission} />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
