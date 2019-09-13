/** @jsx jsx */
import { jsx, css, Global } from '@emotion/core';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useState, Fragment } from 'react';
import axios from 'axios';
import { useAsync } from 'react-async';

import LoggedIn from './components/LoggedIn/LoggedIn';
import Login from './components/Login';
import { convertPermissionNumToObject } from './modules/convertPermission';

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

type ResultData = {
  loggedIn: boolean;
  userID: string;
  permission: string;
};

type AppDefaultData = {
  loggedIn: boolean;
  userID: string;
  permission: Permission;
};

const getSessionInfo = async () => {
  axios.get('./api/sessionConfiguration.php');
  const returnData: AppDefaultData = {
    loggedIn: false,
    userID: '',
    permission: { admin: false, editor: false, viewer: false },
  };
  await axios
    .post('./api/checkWhetherLoggedIn.php')
    .then((results) => {
      const resultData: ResultData = results.data;
      returnData.loggedIn = resultData.loggedIn;
      returnData.userID = resultData.userID;
      returnData.permission = convertPermissionNumToObject(Number(resultData.permission));
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });
  return returnData;
};

const App = (): JSX.Element => {
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState<string>('');
  const [permission, setPermission] = useState<Permission>({ admin: false, editor: false, viewer: false });
  const [dataSetted, setDataSetted] = useState<boolean>(false);
  const { data, error, isLoading } = useAsync(getSessionInfo);

  const onSetLoggedIn = (bool: boolean): void => {
    setLoggedIn(bool);
  };
  const onSetLoginUser = (name: string): void => {
    setLoginUser(name);
  };
  const onSetPermission = (permission: number): void => {
    setPermission(convertPermissionNumToObject(permission));
  };

  if (error) {
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
            eroor
          </p>
        </div>
      </div>
    );
  }

  if (isLoading || !data) {
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

  if (!dataSetted) {
    setLoggedIn(data.loggedIn);
    setLoginUser(data.userID);
    setPermission(data.permission);
    setDataSetted(true);
  }

  return (
    <Fragment>
      <Global styles={globalStyle} />
      <div css={wrapperStyle}>
        <BrowserRouter>
          {location.pathname === '/' ? <Redirect to="/home" /> : null}
          <Switch>
            <Route
              path="/home"
              render={(props) => (
                <LoggedIn
                  loggedIn={loggedIn}
                  loginUser={loginUser}
                  permission={permission}
                  onSetLoggedIn={onSetLoggedIn}
                  onSetLoginUser={onSetLoginUser}
                  onSetPermission={onSetPermission}
                  urlOfTopPage={props.match.url}
                />
              )}
            />
            <Route
              exact
              path="/login"
              render={() => (
                <Login
                  loggedIn={loggedIn}
                  onSetLoggedIn={onSetLoggedIn}
                  onSetLoginUser={onSetLoginUser}
                  onSetPermission={onSetPermission}
                />
              )}
            />
            <Redirect to="/login" />
          </Switch>
        </BrowserRouter>
      </div>
    </Fragment>
  );
};

export default App;
