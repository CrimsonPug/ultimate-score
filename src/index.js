import React, { Component } from 'react';
import ReactDOM from 'react-dom';
import {Router, Route, IndexRoute, browserHistory} from 'react-router';
import {Nav,Register,Login,PrivatePage} from './components/App';
import {Home} from './components/Home';
import {Match} from './components/game/Match';
import {CreateMatch} from './components/create/createMatch';
import {CreateTeam} from './components/create/CreateTeam';
import {CreatePlayer} from './components/create/CreatePlayers';
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