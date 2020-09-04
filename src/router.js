import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Index from './apps/index/index'
import Login from './apps/login/login'
import Register from './apps/register'


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Index}/>
            <Route exact path="/login" component={Login}/>
            <Route exact path="/register" component={register}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;