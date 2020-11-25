import { useState, useEffect } from 'react';
import { convertPermissionNumToObject } from './modules/convertPermission';
import { checkWhetherLoggedIn } from './data/apiClient';
import styled, { createGlobalStyle } from 'styled-components';
import Router from './Router';

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
    letter-spacing: 0.5;
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

  const onSetLoggedIn = (bool: boolean) => {
    setLoggedIn(bool);
  };
  const onSetLoginUser = (name: string) => {
    setLoginUser(name);
  };
  const onSetPermission = (permission: number) => {
    setPermission(convertPermissionNumToObject(permission));
  };

  useEffect(() => {
    void fetch('http://localhost:8080/api/sessionConfiguration.php', {
      mode: 'no-cors',
    });
  }, []);

  useEffect(() => {
    let unmounted = false;
    void (async () => {
      const data = await checkWhetherLoggedIn({});
      if (unmounted) return;
      if (!data) {
        setHasError(true);
        setIsLoading(false);
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
          <ErrorMessage>Error</ErrorMessage>
        </LoadingWrapper>
      </Wrapper>
    );
  }

  return (
    <>
      <GlobalStyle />
      <Wrapper>
        <Router
          loggedIn={loggedIn}
          loginUser={loginUser}
          onSetLoggedIn={onSetLoggedIn}
          onSetLoginUser={onSetLoginUser}
          onSetPermission={onSetPermission}
          permission={permission}
        />
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
