/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import bp from '../../../modules/mediaQuery';

import SideBarItem from './SideBarItem';

const sideBar = css`
  background-color: #777;
  width: 19rem;
  min-width: 16rem;

  ${bp[0]} {
    width: calc(19rem + (100% - 120rem) / 2);
  }
`;

const sideBarList = css`
  list-style: none;
  margin: 2rem 2rem 0 auto;
  padding: 0;
  width: 16rem;
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
