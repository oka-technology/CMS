/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';
import Users from './Main/Users/Users';

const insideWrapper = css`
  display: flex;
  flex: 1;
`;

const main = css`
  flex-grow: 1;
  margin: 0 auto 0 0;
  max-width: 101rem;
  padding: 0 2rem;
`;

type LoggedInProps = {
  loggedIn: boolean;
  loginUser: string;
  authority: Authority;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetAuthority: (authority: number) => void;
  urlOfTopPage: string;
};

const LoggedIn = ({
  loggedIn,
  loginUser,
  authority,
  onSetAuthority,
  onSetLoggedIn,
  onSetLoginUser,
  urlOfTopPage,
}: LoggedInProps): JSX.Element => {
  useEffect(() => {
    if (loggedIn) {
      document.title = 'ログイン成功';
    }
  }, [loggedIn]);

  return (
    <Fragment>
      {loggedIn ? null : <Redirect to="/login" />}
      <Header
        loginUser={loginUser}
        authority={authority}
        onSetLoggedIn={onSetLoggedIn}
        onSetLoginUser={onSetLoginUser}
        onSetAuthority={onSetAuthority}
      />
      <div css={insideWrapper}>
        <SideBar authority={authority} urlOfTopPage={urlOfTopPage} />
        <main css={main}>
          <Switch>
            <Route path={`${urlOfTopPage}/users`} render={() => <Users urlOfTopPage={urlOfTopPage} />} />
          </Switch>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
};

export default LoggedIn;
