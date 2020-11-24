/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import bp from '../../../data/mediaQuery';

import SidebarItem from './SidebarItem';

const sideBarStyle = css`
  background-color: #777;
  min-width: 16rem;
  width: 20rem;

  ${bp[0]} {
    width: calc(20rem + (100% - 120rem) / 2);
  }
`;

const sidebarNavStyle = css`
  position: sticky;
  top: 2rem;
`;

const sidebarListWrapperStyle = css`
  list-style: none;
  margin: 2rem 2rem 0 auto;
  padding: 0;
  width: 16rem;
`;

type SidebarProps = {
  permission: Permission;
};

const Sidebar = ({ permission }: SidebarProps): JSX.Element => {
  return (
    <aside css={sideBarStyle}>
      <nav css={sidebarNavStyle}>
        <ul css={sidebarListWrapperStyle}>
          <SidebarItem permission={permission} />
        </ul>
      </nav>
    </aside>
  );
};

export default Sidebar;
