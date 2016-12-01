import React, { Component } from 'react';
import './index.css';

class Home extends Component {
    render(){
        return(
            <div className="row">
                
                
                    <div className="match-container row col-centered">
                        <div className="col-xs-12 col-sm-6">
                            <a class="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a class="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a class="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a class="match-link" href="http://localhost:3000/match">
                                <div className="match-list well">Match List</div>
                            </a>
                        </div>
                        <div className="col-xs-12 col-sm-6 ">
                            
                            <a class="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a class="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a class="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>

                            <a class="match-link" href="http://localhost:3000/match">
                                <div className="match-list well" align="center">Match List</div>
                            </a>
                        </div>
                    </div>
                </div>
                
            
        )
    }
}

export {Home};
