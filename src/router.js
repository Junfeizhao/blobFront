import React from 'react';
import {HashRouter, Route, Switch} from 'react-router-dom';
import Index from './index/index'
import Login from './login/login'


const BasicRoute = () => (
    <HashRouter>
        <Switch>
            <Route exact path="/" component={Index}/>
            <Route exact path="/login" component={Login}/>
        </Switch>
    </HashRouter>
);

export default BasicRoute;