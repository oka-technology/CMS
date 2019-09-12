/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import ReactDOM from 'react-dom';
import { useState } from 'react';
import axios from 'axios';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { convertPermissionNumToObject } from './modules/convertPermission';

import '../index.html';
import '../.htaccess';
import '../api/loginProcess.php';
import '../api/checkWhetherLoggedIn.php';
import '../api/logoutProcess.php';
import '../api/userList.php';
import '../api/convertPermission.php';
import '../api/sessionConfiguration.php';
import '../api/addUser.php';

import LoggedIn from './components/LoggedIn/LoggedIn';
import Login from './components/Login';

import 'sanitize.css';
import 'sanitize.css/typography.css';
import 'sanitize.css/forms.css';
import '../global.css';

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

type Data = {
  loggedin: boolean;
  loginUser: string;
  permission: Permission;
};

const data: Data = {
  loggedin: false,
  loginUser: '',
  permission: convertPermissionNumToObject(0),
};

(async () => {
  await axios.get('./api/sessionConfiguration.php');
  await axios
    .post('./api/checkWhetherLoggedIn.php')
    .then((results) => {
      data.loggedin = results.data.loggedIn;
      data.loginUser = results.data.userID;
      data.permission = convertPermissionNumToObject(Number(results.data.permission));
    })
    .catch((error) => {
      // eslint-disable-next-line no-console
      console.log(error);
    });

  const App = (): JSX.Element => {
    const [loggedIn, setLoggedIn] = useState<boolean>(data.loggedin);
    const [loginUser, setLoginUser] = useState<string>(data.loginUser);
    const [permission, setPermission] = useState<Permission>(data.permission);

    const onSetLoggedIn = (bool: boolean): void => {
      setLoggedIn(bool);
    };
    const onSetLoginUser = (name: string): void => {
      setLoginUser(name);
    };
    const onSetPermission = (permission: number): void => {
      setPermission(convertPermissionNumToObject(permission));
    };

    return (
      <div css={wrapper}>
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
    );
  };

  ReactDOM.render(<App />, document.querySelector('#App'));
})();
