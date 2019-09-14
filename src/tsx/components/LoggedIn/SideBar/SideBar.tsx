/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState } from 'react';

import bp from '../../../data/mediaQuery';

import SideBarItem from './SideBarItem';
const sideBarStyle = (windowHeight: number) => css`
  background-color: #777;
  height: calc(${windowHeight}px - 11rem);
  min-width: 16rem;
  position: sticky;
  top: 6rem;
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
};

const SideBar = ({ permission }: SideBarProps): JSX.Element => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);
  useEffect(() => {
    window.addEventListener('resize', () => {
      setWindowHeight(window.innerHeight);
    });
  }, []);
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
