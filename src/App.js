import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import Game from './pages/Game';
import Config from './pages/Config';
import Ranking from './pages/Ranking';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
        <Route path="/game" component={ Game } />
        <Route path="/config" component={ Config } />
        <Route exact path="/ranking" component={ Ranking } />
      </Switch>
    </div>
  );
}
