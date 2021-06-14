import React from 'react';
import { Route, Switch } from 'react-router';
import Login from './pages/Login';
import './App.css';

export default function App() {
  return (
    <div>
      <Switch>
        <Route exact path="/" component={ Login } />
      </Switch>
    </div>
  );
}
