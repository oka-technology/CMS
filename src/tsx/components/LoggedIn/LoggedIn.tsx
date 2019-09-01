/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { Route, Switch, Redirect, match } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';
import Users from './Main/Users/Users';

type LoggedInProps = {
  loggedIn: boolean,
  loginUser: string,
  authority: Authority,
  onSetLoggedIn: (bool: boolean) => void,
  onSetLoginUser: (name: string) => void,
  onSetAuthority: (authority: number) => void,
  match: match;
}

const insideWrapper = css`
  display: flex;
  flex: 1;
`;

const main = css`
  padding: 0 2.0rem;
`;

const LoggedIn = ({ loggedIn, loginUser, authority, onSetAuthority, onSetLoggedIn, onSetLoginUser, match }: LoggedInProps): JSX.Element => {
  useEffect(() => {
    if (loggedIn) {
      document.title = 'ログイン成功';
    }
  }, []);

  return (
    <Fragment>
      { loggedIn ? null : <Redirect to='/login' /> }
      <Header 
        loginUser={loginUser} 
        authority={authority} 
        onSetLoggedIn={onSetLoggedIn}
        onSetLoginUser={onSetLoginUser}
        onSetAuthority={onSetAuthority}
      />
      <div css={insideWrapper}>
        <SideBar authority={authority} url={match.url}/>
        <main css={main}>
          <Switch>
            <Route path={`${match.url}/users`} render={ props => <Users />} />
          </Switch>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
}

export default LoggedIn;
