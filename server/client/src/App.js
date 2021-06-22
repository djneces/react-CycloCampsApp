import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch, Redirect } from 'react-router-dom';

import LandingPage from './containers/LandingPage/LandingPage';
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
          <Redirect to='/' />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect(null, { fetchUser })(App);
