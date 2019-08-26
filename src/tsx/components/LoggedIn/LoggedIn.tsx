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
}

const wrapper = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;

const insideWrapper = css`
  display: flex;
  flex: 1;
`;

const main = css`
  padding: 0 2.0rem;
`;

const authorityToString = ({ admin, editor, viewer }: Authority): string => {
  const arr = [];
  admin ? arr.push('管理者') : null;
  editor ? arr.push('編集者') : null;
  viewer ? arr.push('閲覧者') : null;
  return arr.join(', ');
}

const LoggedIn = ({ loggedIn, loginUser, authority }: LoggedInProps): JSX.Element => {
  return (
    <Fragment>
      { loggedIn ? null : <Redirect to='/' /> }
      <Header loginUser={loginUser} authority={authorityToString(authority)} />
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
