import { availablePages } from 'constants/global.constant';
import { localStorageItems } from 'constants/local-storage.constant';
import * as _ from 'lodash';
import React from 'react';
import { useDispatch } from 'react-redux';
import { Redirect, Switch, useHistory } from 'react-router-dom';
import { GuardProvider } from 'react-router-guards';
import { hideNotification, setLoading } from 'redux/actions/app.action';
import { RouteWithLayout } from './components';
import { Main as MainLayout, Main2 as Main2Layout, Minimal as MinimalLayout } from './layouts';
import {
  CategoryCourses as CategoryCoursesView,
  CourseDetails as CourseDetailsView,
  Categories as CategoriesView,
  Courses as CoursesView,
  CourseSearching as CourseSearchingView,
  FavoriteCourses as FavoriteCoursesView,
  Home as HomeView,
  InChargeCourses as InChargeCoursesView,
  NotFound as NotFoundView,
  Profile as ProfileView,
  RegistrationCourses as RegistrationCoursesView,
  SignIn as SignInView,
  SignUp as SignUpView,
  Users as UsersView
} from './views';
import { userRole } from 'constants/user-role.constant';

const Routes = () => {
  const history = useHistory();
  const dispatch = useDispatch();

  const requireLogin = (to, from, next) => {
    dispatch(setLoading(false));
    dispatch(hideNotification());

    const accessToken = localStorage.getItem(localStorageItems.ACCESS_TOKEN.name);
    let authUser = localStorage.getItem(localStorageItems.AUTH_USER.name);
    authUser = authUser ? JSON.parse(authUser) : null;
    const isAuthenticated = !!accessToken && !!authUser;

    if (isAuthenticated) {
      const fromPath = from.location.pathname;
      const toPath = to.location.pathname;
      const authUserPages = _.filter(availablePages, page => page.role === userRole.GUEST.value || (page.auth && page.role === authUser.role));

      if ([availablePages.SIGN_IN.path, availablePages.SIGN_UP.path].includes(toPath)) {
        if (fromPath !== toPath) {
          next.redirect(fromPath);
        } else {
          next.redirect(authUserPages[0].path);
        }
      } else {
        const toPage = authUserPages.find(page => page.path === toPath);
        if (!toPage) {
          history.push(availablePages.NOT_FOUND.path);
        }
      }
    } else {
      if (to.meta.auth) {
        history.push(availablePages.SIGN_IN.path, { from: from.location.pathname });
      }
    }

    next();
  };

  return (
    <GuardProvider guards={[requireLogin]} error={NotFoundView}>
      <Switch>
        <RouteWithLayout
          component={HomeView}
          exact
          layout={Main2Layout}
          path={availablePages.HOME.path}
          title={availablePages.HOME.title}
          meta={{ auth: availablePages.HOME.auth }}
        />
        <RouteWithLayout
          component={CourseDetailsView}
          exact
          layout={Main2Layout}
          path={availablePages.COURSE_DETAILS.path}
          title={availablePages.COURSE_DETAILS.title}
          meta={{ auth: availablePages.COURSE_DETAILS.auth }}
        />
        <RouteWithLayout
          component={CategoryCoursesView}
          exact
          layout={Main2Layout}
          path={availablePages.CATEGORY_COURSES.path}
          title={availablePages.CATEGORY_COURSES.title}
          meta={{ auth: availablePages.CATEGORY_COURSES.auth }}
        />
        <RouteWithLayout
          component={CourseSearchingView}
          exact
          layout={Main2Layout}
          path={availablePages.COURSE_SEARCHING.path}
          title={availablePages.COURSE_SEARCHING.title}
          meta={{ auth: availablePages.COURSE_SEARCHING.auth }}
        />
        <RouteWithLayout
          component={RegistrationCoursesView}
          exact
          layout={MainLayout}
          path={availablePages.REGISTRATION_COURSES.path}
          title={availablePages.REGISTRATION_COURSES.title}
          meta={{ auth: availablePages.REGISTRATION_COURSES.auth }}
        />
        <RouteWithLayout
          component={FavoriteCoursesView}
          exact
          layout={MainLayout}
          path={availablePages.FAVORITE_COURSES.path}
          title={availablePages.FAVORITE_COURSES.title}
          meta={{ auth: availablePages.FAVORITE_COURSES.auth }}
        />
        <RouteWithLayout
          component={InChargeCoursesView}
          exact
          layout={MainLayout}
          path={availablePages.IN_CHARGE_COURSES.path}
          title={availablePages.IN_CHARGE_COURSES.title}
          meta={{ auth: availablePages.IN_CHARGE_COURSES.auth }}
        />
        <RouteWithLayout
          component={CategoriesView}
          exact
          layout={MainLayout}
          path={availablePages.CATEGORIES.path}
          title={availablePages.CATEGORIES.title}
          meta={{ auth: availablePages.CATEGORIES.auth }}
        />
        <RouteWithLayout
          component={CoursesView}
          exact
          layout={MainLayout}
          path={availablePages.COURSES.path}
          title={availablePages.COURSES.title}
          meta={{ auth: availablePages.COURSES.auth }}
        />
        <RouteWithLayout
          component={UsersView}
          exact
          layout={MainLayout}
          path={availablePages.USERS.path}
          title={availablePages.USERS.title}
          meta={{ auth: availablePages.USERS.auth }}
        />
        <RouteWithLayout
          component={ProfileView}
          exact
          layout={MainLayout}
          path={availablePages.PROFILE.path}
          title={availablePages.PROFILE.title}
          meta={{ auth: availablePages.PROFILE.auth }}
        />
        <RouteWithLayout
          component={SignUpView}
          exact
          layout={MinimalLayout}
          path={availablePages.SIGN_UP.path}
          title={availablePages.SIGN_UP.title}
          meta={{ auth: availablePages.SIGN_UP.auth }}
        />
        <RouteWithLayout
          component={SignInView}
          exact
          layout={MinimalLayout}
          path={availablePages.SIGN_IN.path}
          title={availablePages.SIGN_IN.title}
          meta={{ auth: availablePages.SIGN_IN.auth }}
        />
        <RouteWithLayout
          component={NotFoundView}
          exact
          layout={MinimalLayout}
          title={availablePages.NOT_FOUND.title}
          meta={{ auth: availablePages.NOT_FOUND.auth }}
        />
        <Redirect to={availablePages.NOT_FOUND.path} />
      </Switch>
    </GuardProvider>
  );
};

export default Routes;
