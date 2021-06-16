import React from 'react';
import { BrowserRouter, Route, Switch } from 'react-router-dom';

import LandingPage from './containers/LandingPage/LandingPage';
import './App.scss';

const App = () => {
  return (
    <BrowserRouter>
      <div className='App'>
        Header
        <Switch>
          <Route exact path='/' component={LandingPage} />
        </Switch>
      </div>
    </BrowserRouter>
  );
};

export default App;
