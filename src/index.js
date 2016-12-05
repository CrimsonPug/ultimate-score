import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Nav,Register,Login,PrivatePage} from './App';
import {Home} from './Home';
import {Match} from './Match';
import {CreateMatch} from './CreateMatch';
import {CreateTeam} from './CreateTeam';
import {CreatePlayer} from './CreatePlayers';
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
            <Route path="/createTeam" component={CreateTeam} />
            <Route path="/createPlayers" component={CreatePlayer} />
        </Route>
    </Router>,
  document.getElementById('root')
);