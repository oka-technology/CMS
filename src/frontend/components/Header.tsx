import { convertPermissionObjectToString } from '../modules/convertPermission';
import mq from '../data/mediaQuery';
import { logout } from '../data/apiClient';
import styled from 'styled-components';

interface HeaderProps {
  loginUser: string;
  permission: Permission;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
}

const Header = ({
  loginUser,
  permission,
  onSetPermission,
  onSetLoggedIn,
  onSetLoginUser,
}: HeaderProps): JSX.Element => {
  const onLogout = async (e: React.MouseEvent<HTMLAnchorElement>) => {
    e.preventDefault();
    if (confirm('Log out of this CMS?')) {
      const data = await logout({});
      if (!data) return;
      onSetPermission(Number(data.permission));
      onSetLoggedIn(data.loggedIn);
      onSetLoginUser(data.userID);
    }
  };

  return (
    <Wrapper>
      <SiteName>CMS</SiteName>
      <RightItem>
        <User>
          You&apos;re logged in with
          <LoggedInUserName> {loginUser} </LoggedInUserName>(
          {convertPermissionObjectToString(permission)})
        </User>
        <LogoutButton onClick={onLogout}>
          <LogoutImage
            xmlns="http://www.w3.org/2000/svg"
            viewBox="0 0 570 487.88"
          >
            <title>log out</title>
            <polygon points="154.48 349.66 99.43 276.61 362.26 276.61 362.26 212.83 99.43 212.83 154.48 139.78 79.09 139.78 0 244.72 79.09 349.66 154.48 349.66" />
            <path
              d="M379,643.94a78.27,78.27,0,0,1-78.18-78.18V504.65h61.78v61.11a16.62,16.62,0,0,0,16.4,16.4H606.82a16.62,16.62,0,0,0,16.4-16.4V234.24a16.62,16.62,0,0,0-16.4-16.4H379a16.62,16.62,0,0,0-16.4,16.4v61H300.8v-61A78.27,78.27,0,0,1,379,156.06H606.82A78.27,78.27,0,0,1,685,234.24V565.76a78.27,78.27,0,0,1-78.18,78.18Z"
              transform="translate(-115 -156.06)"
            />
          </LogoutImage>
          Log out
        </LogoutButton>
      </RightItem>
    </Wrapper>
  );
};

export default Header;

const Wrapper = styled.header`
  align-items: center;
  background-color: #555;
  display: flex;
  flex-shrink: 0;
  height: 6rem;
  justify-content: space-between;
  padding: 0 2rem;
  width: 100%;

  ${mq[0]} {
    padding: 0 calc(2rem + (100% - 120rem) / 2);
  }
`;

const SiteName = styled.p`
  color: #fff;
  font-size: 2.5rem;
  margin: 0px;
`;

const RightItem = styled.div`
  align-items: center;
  display: flex;
`;

const User = styled.p`
  color: #fff;
  font-size: 1.5rem;
`;

const LogoutButton = styled.a`
  align-items: center;
  color: #eee;
  cursor: pointer;
  display: flex;
  font-size: 1.8rem;
  margin: 0 0 0 2rem;
`;

const LogoutImage = styled.svg`
  display: block;
  fill: white !important;
  height: 1.8rem;
  margin-right: 0.7rem;
  transform: rotate(180deg);
  width: 1.8rem;
`;

const LoggedInUserName = styled.span`
  font-weight: bold;
`;
