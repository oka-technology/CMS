import { useEffect, useState } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import Sidebar from './Sidebar/Sidebar';
import Users from './Main/Users/Users';
import NewUserRegistration from './Main/NewUserRegistration/NewUserRegistration';
import ContentList from './Main/ContentList/ContentList';
import NewCategoryRegistration from './Main/NewCategoryRegistration/NewCategoryRegistration';
import Categories from './Main/Categories/Categories';
import ContentRegistration from './Main/ContentRegistration/ContentRegistration';
import ViewContent from './Main/ViewContent/ViewContent';

import {
  usersPage,
  newUserRegistrationPage,
  contentListPage,
  newContentRegistrationPage,
  categoriesPage,
  newCategoryRegistrationPage,
  viewContentPage,
  editContentPage,
  TOP_PAGE_PATH,
} from '../../data/pages';
import displayable from '../../modules/displayable';
import styled from 'styled-components';

interface LoggedInProps {
  loginUser: string;
  permission: Permission;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
}

const LoggedIn = ({
  loginUser,
  permission,
  onSetPermission,
  onSetLoggedIn,
  onSetLoginUser,
}: LoggedInProps): JSX.Element => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    const resizeEvent = () => {
      setWindowHeight(window.innerHeight);
    };
    document.title = 'Login Success';
    window.addEventListener('resize', resizeEvent);
    return () => {
      window.removeEventListener('resize', resizeEvent);
    };
  }, []);

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
          <Switch>
            {displayable(usersPage, permission) && (
              <Route
                exact
                path={usersPage.path}
                render={() => <Users windowHeight={windowHeight} />}
              />
            )}
            {displayable(newUserRegistrationPage, permission) && (
              <Route
                exact
                path={newUserRegistrationPage.path}
                render={() => <NewUserRegistration />}
              />
            )}
            {displayable(contentListPage, permission) && (
              <Route
                exact
                path={contentListPage.path}
                render={() => (
                  <ContentList
                    windowHeight={windowHeight}
                    permission={permission}
                  />
                )}
              />
            )}
            {displayable(viewContentPage, permission) && (
              <Route
                exact
                path={viewContentPage.path}
                render={({ match }) => <ViewContent match={match} />}
              />
            )}
            {displayable(editContentPage, permission) && (
              <Route
                exact
                path={editContentPage.path}
                render={({ match }) => (
                  <ContentRegistration mode="edit" match={match} />
                )}
              />
            )}
            {displayable(newContentRegistrationPage, permission) && (
              <Route
                exact
                path={newContentRegistrationPage.path}
                render={() => <ContentRegistration mode="newRegistration" />}
              />
            )}
            {displayable(categoriesPage, permission) && (
              <Route
                exact
                path={categoriesPage.path}
                render={() => <Categories windowHeight={windowHeight} />}
              />
            )}
            {displayable(newContentRegistrationPage, permission) && (
              <Route
                exact
                path={newCategoryRegistrationPage.path}
                render={() => (
                  <NewCategoryRegistration permission={permission} />
                )}
              />
            )}
            <Redirect to={TOP_PAGE_PATH} />
          </Switch>
        </Main>
      </InsideWrapper>
      <Footer />
    </>
  );
};

export default LoggedIn;

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
