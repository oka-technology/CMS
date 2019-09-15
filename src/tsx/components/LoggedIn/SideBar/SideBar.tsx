/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import bp from '../../../data/mediaQuery';

import SideBarItem from './SideBarItem';
const sideBarStyle = (windowHeight: number) => css`
  background-color: #777;
  height: calc(${windowHeight}px - 11rem);
  min-width: 16rem;
  width: 20rem;

  ${bp[0]} {
    width: calc(20rem + (100% - 120rem) / 2);
  }
`;

const sideBarListWrapperStyle = css`
  list-style: none;
  margin: 2rem 2rem 0 auto;
  padding: 0;
  width: 16rem;
`;

type SideBarProps = {
  permission: Permission;
  windowHeight: number;
};

const SideBar = ({ permission, windowHeight }: SideBarProps): JSX.Element => {
  return (
    <aside css={sideBarStyle(windowHeight)}>
      <nav>
        <ul css={sideBarListWrapperStyle}>
          <SideBarItem permission={permission} />
        </ul>
      </nav>
    </aside>
  );
};

export default SideBar;
