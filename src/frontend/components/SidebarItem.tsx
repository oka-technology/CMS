import { NavLink } from 'react-router-dom';
import styled from 'styled-components';
import { arrayOfPagesInSidebar } from '../data/pages';
import displayable from '../modules/displayable';

type SideBarItemProps = {
  permission: Permission;
};

const SidebarItem = ({ permission }: SideBarItemProps): JSX.Element => {
  const item: (JSX.Element | undefined)[] = arrayOfPagesInSidebar.map(
    (pageData) => {
      if (displayable(pageData, permission)) {
        const link: string = pageData.path;
        const searchParam = new RegExp(link);
        if (location.pathname === link) {
          return (
            <ListItem key={pageData.path}>
              <ListItemAnchor
                current={searchParam.exec(location.pathname) !== null}
              >
                <Triangle></Triangle>
                {pageData.pageName}
              </ListItemAnchor>
            </ListItem>
          );
        } else {
          return (
            <ListItem key={pageData.path}>
              <NavLink to={link}>
                <ListItemAnchor
                  current={searchParam.exec(location.pathname) !== null}
                >
                  {pageData.pageName}
                </ListItemAnchor>
              </NavLink>
            </ListItem>
          );
        }
      }
    },
  );

  return <>{item}</>;
};

export default SidebarItem;

const ListItem = styled.li`
  display: flex;
  font-size: 1.6rem;
  height: 6rem;
  justify-content: center;
  margin: 0 auto;
  width: 15rem;
  & + & {
    border-top: 1px solid #ddd;
  }
`;

interface ListItemAnchorProps {
  current: boolean;
}

const ListItemAnchor = styled.div<ListItemAnchorProps>`
  align-items: center;
  background-color: ${({ current }) => (current ? '#444' : null)};
  border-radius: 0.5rem;
  color: #fff;
  display: flex;
  height: 5.9rem;
  line-height: 2rem;
  padding-left: 1.2rem;
  text-decoration: none;
  width: 16rem;
  transition: transform 0.1s;

  &:hover {
    background-color: ${({ current }) => (current ? '#444' : '#aaa')};
    transform: ${({ current }) => (current ? null : 'scale(1.2)')};
    transition: transform 0.1s;
  }
`;

const Triangle = styled.span`
  border-top: 0.4rem solid transparent;
  border-left: 0.6rem solid #fff;
  border-bottom: 0.4rem solid transparent;
  display: block;
  height: 0.8rem;
  margin-right: 1rem;
  width: 0.8rem;
`;
