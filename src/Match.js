import React, { Component } from 'react';
import Scoreboard from './Scoreboard';
import {Button} from 'react-bootstrap';
import './match.css';
import {Score} from './Button';
import {Menu} from './Menu';
import {Stats} from './Stats';
import axios from 'axios';

class Match extends Component {
    constructor(){
        super();
        this.state = {
            match: 1,
            loading:true,
            team: '',
            homeShow:false,
            awayShow:false,
            homeCounter: 0,
            awayCounter: 0,
            currentScore:'0-0',
            homeRoster:[],
            awayRoster:[],
            scorer:'',
            assist:'',
            gameOver:false
        }
        this.handleHomeScore = this.handleHomeScore.bind(this)
        this.handleAwayScore = this.handleAwayScore.bind(this)
        this.submitHomeScore = this.submitHomeScore.bind(this)
        this.submitAwayScore = this.submitAwayScore.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleHomeDelete = this.handleHomeDelete.bind(this)
        this.handleClose = this.handleClose.bind(this)
        this.gameOver = this.gameOver.bind(this)

    }
    gameOver(){
        confirm('Are you sure?')
        if (this.state.homeCounter > this.state.awayCounter){
            alert('Home team wins!')
        }else if(this.state.homeCounter < this.state.awayCounter){
            alert('Away home team wins!')
        }else{
            alert('Draw... boring')
        }    
    }
    handleHomeScore(){
        this.setState({
            homeShow: !this.state.homeShow
        })
    }
    handleAwayScore(){
        this.setState({
            awayShow: !this.state.awayShow
        })
    }
    submitHomeScore(scorer,assist){      
        // console.log(this.state.homeCounter)
        let newHomeCounter = this.state.homeCounter +1;
        let saveData = {
            homeCounter: newHomeCounter,
            team:2,
            match: '1',
            currentScore : newHomeCounter + '-' + this.state.awayCounter,
            scorer: scorer,
            assist:assist
        }
        axios
            .put('/openPlayers/putScoreHome',saveData)
            .then((res) => {
                this.setState({
                    team:2,
                    homeCounter: newHomeCounter,
                    currentScore: newHomeCounter + '-' + this.state.awayCounter,                        
                    homeShow: !this.state.homeShow,
                    scorer:scorer,
                    assist:assist
                    })
                })
        
    }
    submitAwayScore(scorer,assist){
        let newAwayCounter = this.state.awayCounter +1;
        let saveData = {
            awayCounter: newAwayCounter,
            team:1,
            match: '1',
            currentScore : this.state.homeCounter + '-' + newAwayCounter,
            scorer: scorer,
            assist:assist
        }    
        axios
            .put('/openPlayers/putScoreAway',saveData)
            .then((res) => {
                this.setState({
                    team:1,
                    awayCounter: newAwayCounter,
                    currentScore : this.state.homeCounter + '-' + newAwayCounter,
                    awayShow: !this.state.awayShow,
                    scorer:scorer,
                    assist:assist
                    })
                })
    }
    handleDelete(deleteScore){
        var deleteData = confirm('Are you sure you want to delete this item?')
            if (deleteData == true) {
                console.log(deleteScore)
                let newAwayCounter =  this.state.awayCounter -1;
                let saveData = {
                    currentScore : this.state.homeCounter + '-' + newAwayCounter,
                    deleteScore : deleteScore,
                    match : this.state.match
                } 
                console.log(saveData)
                axios
                    .put('/openPlayers/deleteStats',saveData)
                    .then((res) => {
                        // console.log(res.data)
                        this.setState({
                            currentScore: saveData.currentScore,
                            awayCounter: newAwayCounter,
                        })
                    })
            } else {
                console.log('won\'t be deleted')
            }
    }
    handleHomeDelete(homeDelete){
        var deleteData = confirm('Are you sure you want to delete this item?')
        if (deleteData == true) {
                // console.log(homeDelete)
                let newHomeCounter =  this.state.homeCounter -1;
                // console.log(newHomeCounter)
                let saveData = {
                    currentScore : newHomeCounter + '-' + this.state.awayCounter,
                    deleteScore : homeDelete,
                    match : this.state.match
                } 
                console.log(saveData)
                axios
                    .put('/openPlayers/deleteHomeStats',saveData)
                    .then((res) => {
                        // console.log(res.data)
                        this.setState({
                            currentScore: saveData.currentScore,
                            homeCounter: newHomeCounter,
                        })
                    })
            } else {
                console.log('won\'t be deleted')
            }
    }
    componentWillMount(){
        axios
        .get('/openPlayers/')
        .then((res)=> { 
            let currentScore = res.data.currentScore;
            //splitting the score(string) and turn it into integer
            let splitScore = currentScore.split("-");
            let homeCounter = parseInt(splitScore[0]);
            let awayCounter = parseInt(splitScore[1]);
            //grab first char of first/2nd char and turn integer
            //grab last two
            //parseINt
            let roster = res.data.roster;
            let homeTeam =[];
            let awayTeam =[];
            for (let i = 0; i<roster.length;i++){
                if (roster[i].teamid === 2){
                    homeTeam.push(roster[i])
                }else{
                    awayTeam.push(roster[i])
                }
            }
            this.setState({
                loading:false,
                homeRoster: homeTeam,
                awayRoster: awayTeam,
                currentScore: currentScore,
                homeCounter: homeCounter,
                awayCounter:awayCounter
            })
        })
    }
    handleClose(){
        this.setState({
            homeShow: false,
            awayShow: false
        })
    }
    
    render(){
        const wellStyles = {maxWidth: 400, margin: '0 auto 10px'};
        return(
            <div>
                <div>
                    <Scoreboard currentScore = {this.state.currentScore} />                   
                    <Score gameOver={this.state.gameOver} handleAwayScore={this.handleAwayScore} handleHomeScore={this.handleHomeScore}/>
                </div>
                <Menu   loading={this.state.loading}
                        scorer={this.state.scorer}
                        assist={this.state.assist}
                        updateStats={this.updateStats}
                        homeShow={this.state.homeShow} 
                        awayShow={this.state.awayShow}
                        homeRoster={this.state.homeRoster}
                        awayRoster={this.state.awayRoster} 
                        handleClose={this.handleClose}
                        submitHomeScore={this.submitHomeScore}
                        submitAwayScore={this.submitAwayScore}
                />
                <Stats currentScore = {this.state.currentScore}
                       homeRoster={this.state.homeRoster}
                       awayRoster={this.state.awayRoster}
                       handleHomeDelete = {this.handleHomeDelete}
                       handleDelete = {this.handleDelete}
                       match = {this.state.match}
                        />
                <div className="well" style={wellStyles}>
                    <Button bsStyle="primary" onClick={this.gameOver} bsSize="large" block>Game Over!</Button>
                </div>
            </div>
        )
    }
}

export {Match};