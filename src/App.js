import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route exact path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
      </Switch>
    </div>
  );
}
