import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from './containers/LandingPage/LandingPage';
import CampgroundsPage from './containers/CampgroundsPage/CampgroundsPage';
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
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect(null, { fetchUser })(App);
