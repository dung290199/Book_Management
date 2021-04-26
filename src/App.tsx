import React, { useEffect, useState, FC } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import './App.css';
import routes from './routes';
import NavBar from './components/common/NavBar';
import './scss/style.scss';

const App = () => {
  return (
    <div className="App">
      <Router>
        <NavBar />
        <Switch>
          {routes.map( data => {
            return (
              <Route exact={data.exact} path={data.path} component={data.component}/>
            )
          })}
        </Switch>
      </Router>
    </div>
  );
}

export default App;
