import React from 'react';
import ReactDOM from 'react-dom';
import Index from './apps/index/index';
import Login from './apps/login/login';
import Register from './apps/register/register'
import Publish from './apps/buplish/index'
import {HashRouter, Route, Switch} from 'react-router-dom';
import * as serviceWorker from './serviceWorker';

ReactDOM.render(
  <HashRouter>
  <Switch>
      <Route exact path="/" component={Index}/>
      <Route exact path="/login" component={Login}/>
      <Route exact path="/publish" component={Publish}/>
      <Route exact path="/register" component={Register}/>
  </Switch>
</HashRouter>,
  document.getElementById('root')
);

// If you want your app to work offline and load faster, you can change
// unregister() to register() below. Note this comes with some pitfalls.
// Learn more about service workers: https://bit.ly/CRA-PWA
serviceWorker.unregister();
