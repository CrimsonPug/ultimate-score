import React, { Component } from 'react';
import './match.css';

class Score extends Component {
    constructor(){
        super();
        this.handleHomeScore = this.handleHomeScore.bind(this)
        this.handleAwayScore = this.handleAwayScore.bind(this)
    }
    handleHomeScore(e){
        e.preventDefault();
        this.props.handleHomeScore()
    }
    handleAwayScore(e){
        e.preventDefault();
        this.props.handleAwayScore()
    }
    render(){
        console.log('meh')
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
                                Lol!
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