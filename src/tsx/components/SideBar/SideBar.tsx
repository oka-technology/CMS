/** @jsx jsx */
import { jsx, css } from '@emotion/core'

import SideBarItem from './SideBarItem';

type SideBarProps = {
  authority: Authority,
}

const sideBar = css`
  background-color: #777;
  width: 15%;
  max-width: 20.0rem;
  min-width: 15.0rem;
`;

const sideBarList = css`
  list-style: none;
  padding: 0;
`;

const SideBar = ({authority}: SideBarProps): JSX.Element => {
  return (
    <aside css={sideBar}>
      <ul css={sideBarList}>
        <SideBarItem authority={authority} />
      </ul>
    </aside>
  );
}

export default SideBar;
