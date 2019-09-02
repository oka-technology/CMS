/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import SideBarItem from './SideBarItem';

const sideBar = css`
  background-color: #777;
  width: 15%;
  max-width: 20rem;
  min-width: 13rem;
`;

const sideBarList = css`
  list-style: none;
  padding: 0;
`;

type SideBarProps = {
  authority: Authority;
  urlOfTopPage: string;
};

const SideBar = ({ authority, urlOfTopPage }: SideBarProps): JSX.Element => {
  return (
    <aside css={sideBar}>
      <ul css={sideBarList}>
        <SideBarItem authority={authority} urlOfTopPage={urlOfTopPage} />
      </ul>
    </aside>
  );
};

export default SideBar;
