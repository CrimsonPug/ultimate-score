import React, { Component } from 'react';
import {Jumbotron} from 'react-bootstrap';
import {Link} from 'react-router';
import match from './../public/homeIcon/football-field.svg';
import whistle from './../public/homeIcon/whistle.svg';
import team from './../public/homeIcon/group.svg';
import player from './../public/homeIcon/icon.svg';
import linked from './../public/socialIcon/linked.svg';
import twitter from './../public/socialIcon/twitter.svg';
import gitHub from './../public/socialIcon/gitHub.svg';
import './index.css';

class Home extends Component {
    constructor(){
        super();
            this.matchExample = this.matchExample.bind(this)
    }
    matchExample(){
        localStorage.matchId = 1;
    }
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
                        <p>Score keeping shouldn’t be boring, it should be fun and easy. Ultimate Score is a fresh new way to keep track of the goal, scorer, and the assist at any particular point. It is initially tailored for ultimate frisbee but also suitable for any sport that use similar scoring system like soccer.</p>
                    </div>
                </div>
                <div className="feature-container row">
                    <div className="col-sm-6 col-lg-3">
                        <Link to="/createMatch">
                            <img className="icon" src={match} />
                        </Link>
                        <h2>Create Match</h2>
                        <p>Get started by creating your own match</p>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <Link to="/match">
                            <img onClick={this.matchExample} className="icon" src={whistle} />
                        </Link>
                        <h2>Score Keeper</h2>
                        <p>Find out how simple it is to record statistic</p>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <Link to="/createTeam">
                            <img className="icon" src={team} />
                        </Link>
                        <h2>Create Team</h2>
                        <p>Be involved in the game</p>
                    </div>
                    <div className="col-sm-6 col-lg-3">
                        <Link to="/createPlayers">
                            <img className="icon" src={player} />
                        </Link>
                        <h2>Create Roster</h2>
                        <p>Add your friends into the team!</p>
                    </div>
                </div>
                <footer className="footer">
                    <section >
                        <div className="social">
                            <ul className="footer-list social-list">
                                <li>
                                    <a className="contact-link" href="https://linkedin.com/in/ikram-mustapha-b1210912a" target="_blank">
                                        <img className="icon-social" src={linked} />
                                    </a>
                                </li>
                                <li>
                                    <a className="contact-link" href="https://twitter.com/IkramTM" target="_blank">
                                        <img className="icon-social" src={twitter} />
                                    </a>
                                </li>
                                <li>
                                    <a className="contact-link" href="https://github.com/CrimsonPug" target="_blank">
                                        <img className="icon-social" src={gitHub} />
                                    </a>
                                </li>
                            </ul>
                        </div>
                        <ul className="footer-list">
                            <li>
                                <a className="contact-link" href="https://github.com/CrimsonPug/ultimate-score" target="_blank">
                                    GitHub Repo
                                </a>
                            </li>
                            <li className="divider">.</li>
                            <li>
                                <a className="contact-link" href="mailto:ikram.tuan.mustapha@gmail.com?Subject=Awesome%20project!" target="_top" target="_blank">
                                    Made by Ikram Mustapha
                                </a>
                            </li>
                        </ul>
                    </section>
                </footer>
            </div>           
        )
    }
}

export {Home};
