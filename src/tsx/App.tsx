/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useState, Fragment, useEffect } from 'react';
import axios from 'axios';

import LoggedIn from './components/LoggedIn/LoggedIn';
import Login from './components/Login';
import { convertPermissionNumToObject } from './modules/convertPermission';
import { TOP_PAGE_PATH, LOGIN_PAGE_PATH } from './data/pages';
import { checkWhetherLoggedIn } from './data/apiClient';

const globalStyle = css`
  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', YuGothic, 'ヒラギノ角ゴ ProN W3',
      Hiragino Kaku Gothic ProN, Arial, 'メイリオ', Meiryo, sans-serif;
    height: 100%;
    position: relative;
    width: 100%;
  }
  html {
    font-size: 62.5%;
    overflow: auto;
    height: 100%;
  }
  * {
    flex-shrink: 0;
  }
`;

const wrapperStyle = css`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState<string>('');
  const [permission, setPermission] = useState<Permission>({ admin: false, editor: false, viewer: false });

  const onSetLoggedIn = (bool: boolean): void => {
    setLoggedIn(bool);
  };
  const onSetLoginUser = (name: string): void => {
    setLoginUser(name);
  };
  const onSetPermission = (permission: number): void => {
    setPermission(convertPermissionNumToObject(permission));
  };

  useEffect(() => {
    axios.get('./api/sessionConfiguration.php');
  }, []);

  useEffect(() => {
    let unmounted: boolean = false;
    const cancelTokenSource = axios.CancelToken.source();
    (async () => {
      const data = await checkWhetherLoggedIn(null, cancelTokenSource);
      if (unmounted) return;
      if (!data) {
        setHasError(true);
        return;
      }
      setLoggedIn(data.loggedIn);
      setLoginUser(data.userID);
      setPermission(convertPermissionNumToObject(Number(data.permission)));
      setIsLoading(false);
    })();
    return () => {
      cancelTokenSource.cancel();
      unmounted = true;
    };
  }, []);

  if (isLoading) {
    return (
      <div css={wrapperStyle}>
        <div
          css={css`
            align-items: center;
            display: flex;
            background-color: #555;
            height: 100%;
            justify-content: center;
          `}
        >
          <p
            css={css`
              color: white;
            `}
          >
            Loading...
          </p>
        </div>
      </div>
    );
  }

  if (hasError) {
    return (
      <div css={wrapperStyle}>
        <div
          css={css`
            align-items: center;
            display: flex;
            background-color: #555;
            height: 100%;
            justify-content: center;
          `}
        >
          <p
            css={css`
              color: tomato;
            `}
          >
            Eroor
          </p>
        </div>
      </div>
    );
  }

  return (
    <Fragment>
      <Global styles={globalStyle} />
      <div css={wrapperStyle}>
        <BrowserRouter>
          <Switch>
            <Route
              path={TOP_PAGE_PATH}
              render={() => (
                <LoggedIn
                  loggedIn={loggedIn}
                  loginUser={loginUser}
                  permission={permission}
                  onSetLoggedIn={onSetLoggedIn}
                  onSetLoginUser={onSetLoginUser}
                  onSetPermission={onSetPermission}
                />
              )}
            />
            <Route
              exact
              path={LOGIN_PAGE_PATH}
              render={() => (
                <Login
                  loggedIn={loggedIn}
                  onSetLoggedIn={onSetLoggedIn}
                  onSetLoginUser={onSetLoginUser}
                  onSetPermission={onSetPermission}
                />
              )}
            />
            {loggedIn ? <Redirect to={TOP_PAGE_PATH} /> : <Redirect to={LOGIN_PAGE_PATH} />}
          </Switch>
        </BrowserRouter>
      </div>
    </Fragment>
  );
};

export default App;
