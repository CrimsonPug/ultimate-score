import React, { Component } from 'react';
import axios from 'axios';
import './Menu.css';

class Menu extends Component{
    constructor(){
        super();
        this.state= {
            iScorer:'',
            iAssist:''
        }
        this.handleClose = this.handleClose.bind(this)
        this.submitHomeScore = this.submitHomeScore.bind(this)
        this.submitAwayScore = this.submitAwayScore.bind(this)
        this.handleScorer = this.handleScorer.bind(this)
        this.handleAssist = this.handleAssist.bind(this)
    }
     handleClose(){
        this.props.handleClose();
    }
    submitHomeScore(e){
        e.preventDefault();
        this.props.submitHomeScore(this.state.iScorer,this.state.iAssist)
    }
    submitAwayScore(){
        this.props.submitAwayScore(this.state.iScorer,this.state.iAssist)
    }
    handleScorer(e){
        e.preventDefault();
        this.setState({
            iScorer: e.target.value
        })
    }
    handleAssist(e){
        e.preventDefault();
        this.setState({
            iAssist: e.target.value
        })
    }
    render(){
        if (this.props.loading){
            console.log('loading')
            return(
                <div>loading...</div>
            )
        }else{
        let homeRoster = this.props.homeRoster;
        let awayRoster = this.props.awayRoster;
        // console.log(awayRoster);
        return(
            <div>
                <div className={"drawer home " +(this.props.homeShow ? "out":"in")}>                   
                    <span onClick={this.handleClose} className="glyphicon glyphicon-remove" aria-hidden="true"></span>
                    <div className="select home-scorer">   
                        <h3>Home Scorer</h3>
                        <select value={this.state.iScorer} className="form-control" onChange={this.handleScorer}>
                        {
                            homeRoster.map((player) => {
                                return(
                                    <option value={'#' + player.squadNumber + ' ' + player.name}>#{player.squadNumber} {player.name}</option>                                 
                                )
                            })
                        }               
                        </select>
                    </div>
                    <div className="select away-assist">
                        <h3>Home Assist</h3>
                        <select value={this.state.iAssist} className="form-control" onChange={this.handleAssist}>
                        {
                            homeRoster.map((player) => {
                                return(
                                    <option value={'#' + player.squadNumber + ' ' + player.name}>#{player.squadNumber} {player.name}</option>                                 
                                )
                            })
                        }
                        </select>
                    </div>
                    <button onClick={this.submitHomeScore} className="btn submit-score btn-primary" type="submit">Submit</button>
                </div>  
                <div className={"drawer away " +(this.props.awayShow ? "awayout":"in")}>                   
                    <span onClick={this.handleClose} className="glyphicon remove-away glyphicon-remove" aria-hidden="true"></span>          
                    <div className="select away-scorer">
                        <h3>Away Scorer</h3>
                        <select value={this.state.iScorer} className="form-control" onChange={this.handleScorer}>
                        {
                            awayRoster.map((player) => {
                                return(
                                    <option value={'#' + player.squadNumber + ' ' + player.name}>#{player.squadNumber} {player.name}</option>                                 
                                )
                            })
                        }
                        </select>
                    </div>
                    <div className="select away-assist">
                        <h3>Away Assist</h3>
                        <select value={this.state.iAssist} className="form-control" onChange={this.handleAssist}>
                            {
                                awayRoster.map((player) => {
                                    return(
                                        <option value={'#' + player.squadNumber + ' ' + player.name}>#{player.squadNumber} {player.name}</option>                                 
                                    )
                            })
                        }
                        </select>
                    </div>
                    <button onClick={this.submitAwayScore} className="btn submit-score btn-primary" type="submit">Submit</button>
                </div>
            </div>
        
        )
        }
    }
}

export {Menu};