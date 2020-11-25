import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';
import { useState, useEffect } from 'react';

import LoggedIn from './components/LoggedIn/LoggedIn';
import Login from './components/Login';
import { convertPermissionNumToObject } from './modules/convertPermission';
import { TOP_PAGE_PATH, LOGIN_PAGE_PATH } from './data/pages';
import { checkWhetherLoggedIn } from './data/apiClient';
import styled, { createGlobalStyle } from 'styled-components';

const GlobalStyle = createGlobalStyle`
  a {
    text-decoration: none;
    color: inherit;
  }
  body {
    font-family: -apple-system, BlinkMacSystemFont, 'Helvetica Neue', YuGothic,
      'ヒラギノ角ゴ ProN W3', Hiragino Kaku Gothic ProN, Arial, 'メイリオ',
      Meiryo, sans-serif;
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

const App = (): JSX.Element => {
  const [isLoading, setIsLoading] = useState(true);
  const [hasError, setHasError] = useState(false);
  const [loggedIn, setLoggedIn] = useState<boolean>(false);
  const [loginUser, setLoginUser] = useState<string>('');
  const [permission, setPermission] = useState<Permission>({
    admin: false,
    editor: false,
    viewer: false,
  });

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
    void fetch('./api/sessionConfiguration.php');
  }, []);

  useEffect(() => {
    let unmounted = false;
    void (async () => {
      const data = await checkWhetherLoggedIn({});
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
      unmounted = true;
    };
  }, []);

  if (isLoading) {
    return (
      <Wrapper>
        <LoadingWrapper>
          <p>Loading...</p>
        </LoadingWrapper>
      </Wrapper>
    );
  }

  if (hasError) {
    return (
      <Wrapper>
        <LoadingWrapper>
          <ErrorMessage>Eroor</ErrorMessage>
        </LoadingWrapper>
      </Wrapper>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <BrowserRouter>
          <Switch>
            {loggedIn && (
              <Route
                path={TOP_PAGE_PATH}
                render={() => (
                  <LoggedIn
                    loginUser={loginUser}
                    permission={permission}
                    onSetLoggedIn={onSetLoggedIn}
                    onSetLoginUser={onSetLoginUser}
                    onSetPermission={onSetPermission}
                  />
                )}
              />
            )}
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
            {loggedIn ? (
              <Redirect to={TOP_PAGE_PATH} />
            ) : (
              <Redirect to={LOGIN_PAGE_PATH} />
            )}
          </Switch>
        </BrowserRouter>
      </Wrapper>
    </>
  );
};

export default App;

const Wrapper = styled.div`
  display: flex;
  flex-direction: column;
  position: absolute;
  top: 0;
  left: 0;
  right: 0;
  bottom: 0;
  height: 100%;
`;

const LoadingWrapper = styled.div`
  align-items: center;
  display: flex;
  background-color: #555;
  height: 100%;
  justify-content: center;
  color: white;
`;

const ErrorMessage = styled.p`
  color: tomato;
`;
