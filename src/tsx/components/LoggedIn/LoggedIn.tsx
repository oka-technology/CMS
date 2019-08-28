/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, useState, Fragment } from 'react';
import axios from 'axios';
import { HashRouter, Route, Switch, Redirect } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';

type LoggedInProps = {
  loggedIn: boolean,
  loginUser: string,
  authority: Authority,
  onSetLoggedIn: (bool: boolean) => void,
  onSetLoginUser: (name: string) => void,
  onSetAuthority: (authority: number) => void,
}

const insideWrapper = css`
  display: flex;
  flex: 1;
`;

const main = css`
  padding: 0 2.0rem;
`;

const LoggedIn = ({ loggedIn, loginUser, authority, onSetAuthority, onSetLoggedIn, onSetLoginUser }: LoggedInProps): JSX.Element => {
  return (
    <Fragment>
      { loggedIn ? null : <Redirect to='/' /> }
      <Header 
        loginUser={loginUser} 
        authority={authority} 
        onSetLoggedIn={onSetLoggedIn}
        onSetLoginUser={onSetLoginUser}
        onSetAuthority={onSetAuthority}
      />
      <div css={insideWrapper}>
        <SideBar authority={authority} />
        <main css={main}>
          <HashRouter>
            <Switch>
              <Route></Route>
            </Switch>
          </HashRouter>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
}

export default LoggedIn;
