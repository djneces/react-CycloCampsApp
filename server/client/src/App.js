/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from './containers/LandingPage/LandingPage';
import CampgroundsPage from './containers/CampgroundsPage/CampgroundsPage';
import CampgroundPage from './containers/CampgroundPage/CampgroundPage';
import AccountDetailsPage from './containers/AccountDetailsPage/AccountDetailsPage';
import NavigationMenu from './components/Navigation/NavigationMenu';
import NewCampgroundPage from './containers/NewCampgroundPage/NewCampgroundPage';
import Alert from './components/UIElements/Alert';
import { fetchUser } from './store/actions/user';

import './App.scss';

const App = ({ fetchUser, isAuthenticated }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);

  let routes = (
    <Switch>
      <Route exact path='/' component={LandingPage} />
      <Route exact path='/campgrounds' component={CampgroundsPage} />
      <Route
        exact
        path='/campgrounds/:campgroundId'
        component={CampgroundPage}
      />
      <Redirect to='/' />
    </Switch>
  );

  if (isAuthenticated) {
    routes = (
      <Switch>
        <Route exact path='/' component={LandingPage} />
        <Route exact path='/campgrounds' component={CampgroundsPage} />
        <Route
          exact
          path='/campgrounds/:campgroundId'
          component={CampgroundPage}
        />
        <Route exact path='/your-account' component={AccountDetailsPage} />
        <Route exact path='/new-campground' component={NewCampgroundPage} />
        <Redirect to='/' />
      </Switch>
    );
  }
  return (
    <BrowserRouter>
      <div className='App'>
        <Alert position='bottom-right' />
        <NavigationMenu />
        {routes}
      </div>
    </BrowserRouter>
  );
};

const mapStateToProps = ({ auth }) => ({
  isAuthenticated: auth.isAuthenticated,
});

export default connect(mapStateToProps, { fetchUser })(App);
