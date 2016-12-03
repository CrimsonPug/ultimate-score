import React, { Component } from 'react';
import './match.css';

class Score extends Component {
    constructor(){
        super();
        this.handleHomeScore = this.handleHomeScore.bind(this)
        this.handleAwayScore = this.handleAwayScore.bind(this)
    }
    handleHomeScore(){
        this.props.handleHomeScore()
    }
    handleAwayScore(){
        this.props.handleAwayScore()
    }
    render(){
        if (this.props.gameOver === true){
            return(
                <div className="Done">
                    <h3>You're Done!</h3>
                </div>
            )
        }else{
            return(
                <div className="button-container">
                    <div className="home-btn">
                        <button type="button"
                                onClick={this.handleHomeScore}
                                className="btn score-btn btn-success"
                                >
                                Score!
                        </button>
                    </div>             
                    <div className="away-btn">
                        <button type="button" 
                                onClick={this.handleAwayScore}
                                className="btn score-btn btn-success"
                                >
                                Score!
                        </button>
                    </div>
                </div>
            )
        }
    }
}

export {Score};