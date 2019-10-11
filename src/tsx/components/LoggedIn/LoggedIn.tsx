/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, Fragment, useState } from 'react';
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

const insideWrapperStyle = css`
  display: flex;
  flex: 1;
`;

const mainStyle = css`
  flex-grow: 1;
  margin: 0 auto 0 0;
  max-width: 100rem;
  padding: 0 2rem 2rem;
  width: calc(100% - 20rem);
`;

type LoggedInProps = {
  loginUser: string;
  permission: Permission;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
};

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
    <Fragment>
      <Header
        loginUser={loginUser}
        permission={permission}
        onSetLoggedIn={onSetLoggedIn}
        onSetLoginUser={onSetLoginUser}
        onSetPermission={onSetPermission}
      />
      <div css={insideWrapperStyle}>
        <Sidebar permission={permission} />
        <main css={mainStyle}>
          <Switch>
            {displayable(usersPage, permission) && (
              <Route exact path={usersPage.path} render={() => <Users windowHeight={windowHeight} />} />
            )}
            {displayable(newUserRegistrationPage, permission) && (
              <Route exact path={newUserRegistrationPage.path} render={() => <NewUserRegistration />} />
            )}
            {displayable(contentListPage, permission) && (
              <Route
                exact
                path={contentListPage.path}
                render={() => <ContentList windowHeight={windowHeight} permission={permission} />}
              />
            )}
            {displayable(viewContentPage, permission) && (
              <Route exact path={viewContentPage.path} render={({ match }) => <ViewContent match={match} />} />
            )}
            {displayable(editContentPage, permission) && (
              <Route
                exact
                path={editContentPage.path}
                render={({ match }) => <ContentRegistration mode="edit" match={match} />}
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
              <Route exact path={categoriesPage.path} render={() => <Categories windowHeight={windowHeight} />} />
            )}
            {displayable(newContentRegistrationPage, permission) && (
              <Route
                exact
                path={newCategoryRegistrationPage.path}
                render={() => <NewCategoryRegistration permission={permission} />}
              />
            )}
            <Redirect to={TOP_PAGE_PATH} />
          </Switch>
        </main>
      </div>
      <Footer />
    </Fragment>
  );
};

export default LoggedIn;
