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
} from '../../data/pages';
import canPageBeDisplayed from '../../modules/canPageBeDisplayed';

const insideWrapperStyle = css`
  display: flex;
  flex: 1;
`;

const mainStyle = css`
  flex-grow: 1;
  margin: 0 auto 0 0;
  max-width: 100rem;
  padding: 0 2rem 2rem;
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
      <div css={insideWrapperStyle}>
        <Sidebar permission={permission} />
        <main css={mainStyle}>
          <Switch>
            {canPageBeDisplayed(usersPage, permission) && (
              <Route exact path={usersPage.path} render={() => <Users windowHeight={windowHeight} />} />
            )}
            {canPageBeDisplayed(newUserRegistrationPage, permission) && (
              <Route exact path={newUserRegistrationPage.path} render={() => <NewUserRegistration />} />
            )}
            {canPageBeDisplayed(contentListPage, permission) && (
              <Route
                exact
                path={contentListPage.path}
                render={() => <ContentList windowHeight={windowHeight} permission={permission} />}
              />
            )}
            {canPageBeDisplayed(viewContentPage, permission) && (
              <Route exact path={viewContentPage.path} render={({ match }) => <ViewContent match={match} />} />
            )}
            {canPageBeDisplayed(editContentPage, permission) && (
              <Route exact path={editContentPage.path} render={({ match }) => <EditContent match={match} />} />
            )}
            {canPageBeDisplayed(newContentRegistrationPage, permission) && (
              <Route exact path={newContentRegistrationPage.path} render={() => <NewContentRegistration />} />
            )}
            {canPageBeDisplayed(categoriesPage, permission) && (
              <Route exact path={categoriesPage.path} render={() => <Categories windowHeight={windowHeight} />} />
            )}
            {canPageBeDisplayed(newContentRegistrationPage, permission) && (
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
