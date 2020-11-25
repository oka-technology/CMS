import { FC } from 'react';

import Header from '../components/Header';
import Footer from '../components/Footer';
import Sidebar from '../components/Sidebar';
import styled from 'styled-components';
import { WindwoHeightProvider } from './useWindowHeight';

interface LayoutProps {
  loginUser: string;
  permission: Permission;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
}

const Layout: FC<LayoutProps> = ({
  loginUser,
  permission,
  onSetPermission,
  onSetLoggedIn,
  onSetLoginUser,
  children,
}) => {
  return (
    <>
      <Header
        loginUser={loginUser}
        permission={permission}
        onSetLoggedIn={onSetLoggedIn}
        onSetLoginUser={onSetLoginUser}
        onSetPermission={onSetPermission}
      />
      <InsideWrapper>
        <Sidebar permission={permission} />
        <Main>
          <WindwoHeightProvider>{children}</WindwoHeightProvider>
        </Main>
      </InsideWrapper>
      <Footer />
    </>
  );
};

export default Layout;

const InsideWrapper = styled.div`
  display: flex;
  flex: 1;
`;

const Main = styled.main`
  flex-grow: 1;
  margin: 0 auto 0 0;
  max-width: 100rem;
  padding: 0 2rem 2rem;
  width: calc(100% - 20rem);
`;
