/* eslint-disable no-unused-vars */
import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from './containers/LandingPage/LandingPage';
import CampgroundsPage from './containers/CampgroundsPage/CampgroundsPage';
import CampgroundPage from './containers/CampgroundPage/CampgroundPage';
import AccountDetailsPage from './containers/AccountDetailsPage/AccountDetailsPage';
import NavigationMenu from './components/Navigation/NavigationMenu';
import { fetchUser } from './store/actions/user';

import './App.scss';

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <BrowserRouter>
      <div className='App'>
        <NavigationMenu />
        <Switch>
          <Route exact path='/' component={LandingPage} />
          <Route exact path='/campgrounds' component={CampgroundsPage} />
          <Route
            exact
            path='/campgrounds/:campgroundId'
            component={CampgroundPage}
          />
          {/* TODO is loggedIn */}
          <Route exact path='/your-account' component={AccountDetailsPage} />
          {/* <Redirect to='/' /> */}
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect(null, { fetchUser })(App);
