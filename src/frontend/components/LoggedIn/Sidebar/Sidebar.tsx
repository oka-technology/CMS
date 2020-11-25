import styled from 'styled-components';
import mq from '../../../data/mediaQuery';

import SidebarItem from './SidebarItem';

type SidebarProps = {
  permission: Permission;
};

const Sidebar = ({ permission }: SidebarProps): JSX.Element => {
  return (
    <SideBar>
      <SidebarNav>
        <SidebarListWrapper>
          <SidebarItem permission={permission} />
        </SidebarListWrapper>
      </SidebarNav>
    </SideBar>
  );
};

export default Sidebar;

const SideBar = styled.aside`
  background-color: #777;
  min-width: 16rem;
  width: 20rem;

  ${mq[0]} {
    width: calc(20rem + (100% - 120rem) / 2);
  }
`;

const SidebarNav = styled.nav`
  position: sticky;
  top: 2rem;
`;

const SidebarListWrapper = styled.ul`
  list-style: none;
  margin: 2rem 2rem 0 auto;
  padding: 0;
  width: 16rem;
`;
