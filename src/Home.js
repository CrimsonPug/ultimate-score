import React, { Component } from 'react';
import {Jumbotron,Button} from 'react-bootstrap';
import './index.css';

class Home extends Component {
    render(){
        return(
            <div>
                <Jumbotron>
                    <h1 className="hero" id="hero1">Ultimate Score</h1>
                    <p className="hero">Keeping it ultimately simple</p>
                </Jumbotron>
            <div className="row">
                
                    <div className="match-container row col-centered">
                        <div className="col-xs-12 col-sm-6">
                            <a className="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a className="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a className="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a className="match-link" href="http://localhost:3000/match">
                                <div className="match-list well">Match List</div>
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-6 ">
                            
                            <a className="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a className="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a className="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a className="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>
                        </div>
                    </div>
                </div>
             </div>   
            
        )
    }
}

export {Home};
