/** @jsx jsx */
import { jsx, css } from '@emotion/core';
import { useEffect, Fragment } from 'react';
import { Route, Switch, Redirect } from 'react-router-dom';

import Header from './Header';
import Footer from './Footer';
import SideBar from './SideBar/SideBar';
import Users from './Main/Users/Users';
import NewUserRegistration from './Main/NewUserRegistration/NewUserRegistration';
import ContentList from './Main/ContentList/ContentList';

import {
  usersPage,
  newUserRegistrationPage,
  contentListPage,
  newContentRegistrationPage,
  categoriesPage,
  newCategoryRegistrationPage,
} from '../../data/pages';

const insideWrapper = css`
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
  useEffect(() => {
    document.title = 'Login Success';
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
        <SideBar permission={permission} />
        <main css={mainStyle}>
          <Switch>
            <Route path={usersPage.path} render={() => <Users permission={permission} />} />
            <Route path={newUserRegistrationPage.path} render={() => <NewUserRegistration permission={permission} />} />
            <Route path={contentListPage.path} render={() => <ContentList permission={permission} />} />
            <Redirect to="/home" />
          </Switch>
        </main>
      </div>
      <Footer />
      {loggedIn ? null : <Redirect to="/login" />}
    </Fragment>
  );
};

export default LoggedIn;
