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
import NewContentRegistration from './Main/NewContentRegistration/NewContentRegistration';
import ViewContent from './Main/ViewContent/ViewContent';
import EditContent from './Main/EditContent/EditContent';

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
  LOGIN_PAGE_PATH,
} from '../../data/pages';

const insideWrapper = css`
  display: flex;
  flex: 1;
`;

const mainStyle = (windowHeight: number) => css`
  flex-grow: 1;
  height: calc(${windowHeight}px - 11rem);
  margin: 0 auto 0 0;
  max-width: 100rem;
  padding: 0 2rem 2rem;
`;

type LoggedInProps = {
  loggedIn: boolean;
  loginUser: string;
  permission: Permission;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
};

const LoggedIn = ({
  loggedIn,
  loginUser,
  permission,
  onSetPermission,
  onSetLoggedIn,
  onSetLoginUser,
}: LoggedInProps): JSX.Element => {
  const [windowHeight, setWindowHeight] = useState<number>(window.innerHeight);

  useEffect(() => {
    let unmounted = false;
    document.title = 'Login Success';
    window.addEventListener('resize', () => {
      if (unmounted) return;
      setWindowHeight(window.innerHeight);
    });
    return () => {
      window.removeEventListener('resize', () => {
        setWindowHeight(window.innerHeight);
      });
      unmounted = true;
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
      <div css={insideWrapper}>
        <Sidebar permission={permission} windowHeight={windowHeight} />
        <main css={mainStyle(windowHeight)}>
          <Switch>
            <Route
              path={usersPage.path}
              render={() => <Users windowHeight={windowHeight} permission={permission} />}
            />
            <Route
              path={newUserRegistrationPage.path}
              render={() => <NewUserRegistration permission={permission} />}
            />
            <Route
              path={contentListPage.path}
              render={() => <ContentList windowHeight={windowHeight} permission={permission} />}
            />
            <Route path={viewContentPage.path} render={() => <ViewContent permission={permission} />} />
            <Route path={editContentPage.path} render={() => <EditContent permission={permission} />} />
            <Route
              path={newContentRegistrationPage.path}
              render={() => <NewContentRegistration permission={permission} />}
            />
            <Route
              path={categoriesPage.path}
              render={() => <Categories windowHeight={windowHeight} permission={permission} />}
            />
            <Route
              path={newCategoryRegistrationPage.path}
              render={() => <NewCategoryRegistration permission={permission} />}
            />
            <Redirect to={TOP_PAGE_PATH} />
          </Switch>
        </main>
      </div>
      <Footer />
      {!loggedIn && <Redirect to={LOGIN_PAGE_PATH} />}
    </Fragment>
  );
};

export default LoggedIn;
