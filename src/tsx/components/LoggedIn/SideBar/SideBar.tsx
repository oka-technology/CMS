/** @jsx jsx */
import { jsx, css } from '@emotion/core';

import SideBarItem from './SideBarItem';

type SideBarProps = {
  authority: Authority;
  url: string;
};

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

const SideBar = ({ authority, url }: SideBarProps): JSX.Element => {
  return (
    <aside css={sideBar}>
      <ul css={sideBarList}>
        <SideBarItem authority={authority} url={url} />
      </ul>
    </aside>
  );
};

export default SideBar;
