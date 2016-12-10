import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import match from './../public/homeIcon/football-field.svg';
import whistle from './../public/homeIcon/whistle.svg';
import team from './../public/homeIcon/group.svg';
import player from './../public/homeIcon/icon.svg';
import './index.css';

class Home extends Component {
    render(){
        return(
            <div>
                <div className="hero">
                    <div className="hero-filter">
                    </div>
                    <div className="title-wrapper">
                        <h1 className="title">Ultimate Score</h1>
                        <h5 className="title">Keeping it ultimately simple</h5>
                    </div>
                </div>
                <div className="description">
                    <div className="description-wrapper">
                        <h2>Making Game Statistic Easy</h2>
                        <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nulla ut felis vel nibh tincidunt tempor id vel sapien. Cras sed varius sapien, a fermentum elit. Ut ut est congue, varius massa vitae, gravida dui. In hac habitasse platea dictumst. Nam vitae accumsan urna.</p>
                    </div>
                </div>
                <div className="feature-container row">
                    <div className="col-sm-6 col-lg-3">
                        <img className="icon" src={match} />
                        <h2>Create Match</h2>
                        <p>Get started by creating your own match</p>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <img className="icon" src={whistle} />
                        <h2>Score Keeper</h2>
                        <p>Find out how simple it is to record statistic</p>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <img className="icon" src={team} />
                        <h2>Create Team</h2>
                        <p>Be involved in the game</p>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <img className="icon" src={player} />
                        <h2>Create Roster</h2>
                        <p>Add your friends into the team!</p>
                    </div>
                </div>
            </div>           
        )
    }
}

export {Home};
