/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import bp from '../../../modules/mediaQuery';

import SideBarItem from './SideBarItem';

const sideBar = css`
  background-color: #777;
  width: 20rem;
  min-width: 16rem;

  ${bp[0]} {
    width: calc(20rem + (100% - 120rem) / 2);
  }
`;

const sideBarList = css`
  list-style: none;
  margin: 2rem 2rem 0 auto;
  padding: 0;
  width: 16rem;
`;

type SideBarProps = {
  permission: Permission;
  urlOfTopPage: string;
};

const SideBar = ({ permission, urlOfTopPage }: SideBarProps): JSX.Element => {
  return (
    <aside css={sideBar}>
      <ul css={sideBarList}>
        <SideBarItem permission={permission} urlOfTopPage={urlOfTopPage} />
      </ul>
    </aside>
  );
};

export default SideBar;
