import React, { useEffect } from 'react';
import { connect } from 'react-redux';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './containers/LandingPage/LandingPage';
import Header from './components/Header/Header';
import { fetchUser } from './store/actions/user';
import './App.scss';

const App = ({ fetchUser }) => {
  useEffect(() => {
    fetchUser();
  }, [fetchUser]);
  return (
    <BrowserRouter>
      <div className='App'>
        <Header />
        <Switch>
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default connect(null, { fetchUser })(App);
