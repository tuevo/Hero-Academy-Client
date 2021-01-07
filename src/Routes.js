import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Main2 as Main2Layout, Minimal as MinimalLayout } from './layouts';

import {
  Dashboard as DashboardView,
  ProductList as ProductListView,
  UserList as UserListView,
  Typography as TypographyView,
  Icons as IconsView,
  Account as AccountView,
  Settings as SettingsView,
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Home as HomeView
} from './views';

import { availablePages } from 'constants/global.constant';
import { GuardProvider } from 'react-router-guards';
import { localStorageItems } from 'constants/local-storage.constant';

const Routes = () => {
  const requireLogin = (to, from, next) => {
    const accessToken = localStorage.getItem(localStorageItems.ACCESS_TOKEN.name);
    const isAuthenticated = !!accessToken;

    if (to.meta.auth) {
      if (isAuthenticated) {
        next();
      } else {
        next.redirect(availablePages.SIGN_IN.path);
      }
    } else {
      if (!isAuthenticated) {
        next();
      } else {
        next.redirect('/');
      }
    }
  };

  return (
    // <GuardProvider guards={[requireLogin]} error={NotFoundView}>
    <GuardProvider error={NotFoundView}>
      <Switch>
        <Redirect
          exact
          from="/"
          to={availablePages.HOME.path}
        />
        <RouteWithLayout
          component={HomeView}
          exact
          layout={Main2Layout}
          path={availablePages.HOME.path}
          title={availablePages.HOME.title}
        />
        <RouteWithLayout
          component={DashboardView}
          exact
          layout={MainLayout}
          path={availablePages.DASHBOARD.path}
          title={availablePages.DASHBOARD.title}
          meta={{ auth: true }}
        />
        <RouteWithLayout
          component={UserListView}
          exact
          layout={MainLayout}
          path={availablePages.USERS.path}
          title={availablePages.USERS.title}
          meta={{ auth: true }}
        />
        <RouteWithLayout
          component={ProductListView}
          exact
          layout={MainLayout}
          path={availablePages.PRODUCTS.path}
          title={availablePages.PRODUCTS.title}
          meta={{ auth: true }}
        />
        <RouteWithLayout
          component={TypographyView}
          exact
          layout={MainLayout}
          path={availablePages.TYPOGRAPHY.path}
          title={availablePages.TYPOGRAPHY.title}
          meta={{ auth: true }}
        />
        <RouteWithLayout
          component={IconsView}
          exact
          layout={MainLayout}
          path={availablePages.ICONS.path}
          title={availablePages.ICONS.title}
          meta={{ auth: true }}
        />
        <RouteWithLayout
          component={AccountView}
          exact
          layout={MainLayout}
          path={availablePages.ACCOUNT.path}
          title={availablePages.ACCOUNT.title}
          meta={{ auth: true }}
        />
        <RouteWithLayout
          component={SettingsView}
          exact
          layout={MainLayout}
          path={availablePages.SETTINGS.path}
          title={availablePages.SETTINGS.title}
          meta={{ auth: true }}
        />
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path={availablePages.SIGN_UP.path}
          title={availablePages.SIGN_UP.title}
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path={availablePages.SIGN_IN.path}
          title={availablePages.SIGN_IN.title}
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          title={availablePages.NOT_FOUND.title}
        />
        <Redirect to={availablePages.NOT_FOUND.path} />
      </Switch>
    </GuardProvider>
  );
};

export default Routes;
