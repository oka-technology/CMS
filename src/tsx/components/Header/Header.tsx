import * as React from 'react';
import styled, { css, StyledComponent } from 'styled-components';

type HeaderProps = {
  userID: string;
  authority: string;
}

type LogoutImageParam = {
  display:
}
const LogoutImage: StyledComponent<'svg',> = styled.svg`
  display: block;
  fill: white;
  height: 1.8rem;
  margin-right: 0.7rem;
  transform: rotate(180deg);
  width: 1.8rem;
`;

const Header = ({ userID, authority }: HeaderProps): JSX.Element => {
  return(
    <header className="header">
      <p className="header__siteName">CMS</p>
      <div className="header__right">
        <p className="header__right__loginUser">
          {userID}でログイン中（{authority}）
        </p>
        <p className="header__right__logoutLink">
          <a href="logoutProcess.php" className="header__right__logoutLink--anchor">
            <svg className="header__right__logoutLink--img" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 570 487.88"><title>logout</title><polygon points="154.48 349.66 99.43 276.61 362.26 276.61 362.26 212.83 99.43 212.83 154.48 139.78 79.09 139.78 0 244.72 79.09 349.66 154.48 349.66"/><path d="M379,643.94a78.27,78.27,0,0,1-78.18-78.18V504.65h61.78v61.11a16.62,16.62,0,0,0,16.4,16.4H606.82a16.62,16.62,0,0,0,16.4-16.4V234.24a16.62,16.62,0,0,0-16.4-16.4H379a16.62,16.62,0,0,0-16.4,16.4v61H300.8v-61A78.27,78.27,0,0,1,379,156.06H606.82A78.27,78.27,0,0,1,685,234.24V565.76a78.27,78.27,0,0,1-78.18,78.18Z" transform="translate(-115 -156.06)"/></svg>
            Logout
          </a>
        </p>
      </div>
    </header>
  );
}

export default Header;
