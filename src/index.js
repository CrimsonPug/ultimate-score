import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Nav,Register,Login,PrivatePage} from './App';
import {Home} from './Home';
import {Match} from './Match';
import {CreateMatch} from './CreateMatch';
import './index.css';

ReactDOM.render(
    <Router history={browserHistory}>
        <Route path="/" component={Nav}>
            <IndexRoute component={Home} />
            <Route path="/register" component={Register} />
            <Route path="/login" component={Login} />
            <Route path="/match" component={Match} />
            <Route path="/private" component={PrivatePage} />
            <Route path="/createMatch" component={CreateMatch} />
        </Route>
    </Router>,
  document.getElementById('root')
);