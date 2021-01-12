import React from 'react';
import { Switch, Redirect } from 'react-router-dom';

import { RouteWithLayout } from './components';
import { Main as MainLayout, Main2 as Main2Layout, Minimal as MinimalLayout } from './layouts';

import {
  SignUp as SignUpView,
  SignIn as SignInView,
  NotFound as NotFoundView,
  Home as HomeView,
  CourseDetails as CourseDetailsView,
  CategoryCourses as CategoryCoursesView,
  CourseSearching as CourseSearchingView,
  InChargeCourse as InChargeCourseView
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
          component={CourseDetailsView}
          exact
          layout={Main2Layout}
          path={availablePages.COURSE_DETAILS.path}
          title={availablePages.COURSE_DETAILS.title}
        />
        <RouteWithLayout
          component={CategoryCoursesView}
          exact
          layout={Main2Layout}
          path={availablePages.CATEGORY_COURSES.path}
          title={availablePages.CATEGORY_COURSES.title}
        />
        <RouteWithLayout
          component={CourseSearchingView}
          exact
          layout={Main2Layout}
          path={availablePages.COURSE_SEARCHING.path}
          title={availablePages.COURSE_SEARCHING.title}
        />
        <RouteWithLayout
          component={InChargeCourseView}
          exact
          layout={MainLayout}
          path={availablePages.IN_CHARGE_COURSE.path}
          title={availablePages.IN_CHARGE_COURSE.title}
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
