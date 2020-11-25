import { VFC } from 'react';
import { BrowserRouter, Redirect, Route, Switch } from 'react-router-dom';
import Layout from './layout/Layout';
import {
  categoriesPage,
  contentListPage,
  editContentPage,
  LOGIN_PAGE_PATH,
  newCategoryRegistrationPage,
  newContentRegistrationPage,
  newUserRegistrationPage,
  TOP_PAGE_PATH,
  usersPage,
  viewContentPage,
} from './data/pages';
import displayable from './modules/displayable';
import Categories from './pages/Categories';
import ContentList from './pages/ContentList';
import ContentRegistration from './pages/ContentRegistration';
import Login from './pages/Login';
import NewCategoryRegistration from './pages/NewCategoryRegistration';
import NewUserRegistration from './pages/NewUserRegistration';
import Users from './pages/Users';
import ViewContent from './pages/ViewContent';

interface RouterProps {
  loggedIn: boolean;
  loginUser: string;
  permission: Permission;
  onSetLoggedIn: (bool: boolean) => void;
  onSetLoginUser: (name: string) => void;
  onSetPermission: (permission: number) => void;
}

const Router: VFC<RouterProps> = ({
  loggedIn,
  loginUser,
  permission,
  onSetLoggedIn,
  onSetLoginUser,
  onSetPermission,
}) => {
  return (
    <BrowserRouter>
      <Switch>
        {loggedIn && (
          <Route
            path={TOP_PAGE_PATH}
            render={() => (
              <Layout
                loginUser={loginUser}
                permission={permission}
                onSetLoggedIn={onSetLoggedIn}
                onSetLoginUser={onSetLoginUser}
                onSetPermission={onSetPermission}
              >
                <Switch>
                  {displayable(usersPage, permission) && (
                    <Route
                      exact
                      path={usersPage.path}
                      render={() => <Users />}
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
                      render={() => <ContentList permission={permission} />}
                    />
                  )}
                  {displayable(viewContentPage, permission) && (
                    <Route
                      exact
                      path={viewContentPage.path}
                      render={() => <ViewContent />}
                    />
                  )}
                  {displayable(editContentPage, permission) && (
                    <Route
                      exact
                      path={editContentPage.path}
                      render={() => <ContentRegistration mode="edit" />}
                    />
                  )}
                  {displayable(newContentRegistrationPage, permission) && (
                    <Route
                      exact
                      path={newContentRegistrationPage.path}
                      render={() => (
                        <ContentRegistration mode="newRegistration" />
                      )}
                    />
                  )}
                  {displayable(categoriesPage, permission) && (
                    <Route
                      exact
                      path={categoriesPage.path}
                      render={() => <Categories />}
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
              </Layout>
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
  );
};

export default Router;
