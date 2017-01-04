import React, { Component } from 'react';
import {Button} from 'react-bootstrap';
import Scoreboard from './Scoreboard';
import './match.css';
import {Score} from './Button';
import {Menu} from './Menu';
import {Stats} from './Stats';
import {Footer} from './../Footer';
import axios from 'axios';

class Match extends Component {
    constructor(){
        super();
        this.state = {
            match: null,
            loading:true,
            scoreboardData:null,
            team: '',
            homeTeam:null,
            awayTeam:null,
            homeTeamId:null,
            awayTeamId:null,
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
        this.submitHomeScore = this.submitHomeScore.bind(this)
        this.handleDelete = this.handleDelete.bind(this)
        this.handleHomeDelete = this.handleHomeDelete.bind(this)
        this.gameOver = this.gameOver.bind(this)
    }
    gameOver(){
        confirm('Are you sure?')
        if (this.state.homeCounter > this.state.awayCounter){
            alert('Home team wins!')
        }else if(this.state.homeCounter < this.state.awayCounter){
            alert('Away team wins!')
        }else{
            alert('Draw... boring')
        }
        this.setState({
            gameOver:true
        })
        setTimeout(()=>{
            console.log(this.state.gameOver)   
        },300) 
    }
    submitHomeScore(updatedStats){ 
        let newHomeCounter;    
        let newAwayCounter; 
        let saveData = {
                scoreCounter: null,
                team:null,
                match: this.state.match,
                currentScore : null,
                scorer: null,
                assist:null
        }
        if (updatedStats.team === this.state.homeTeamId){
             newHomeCounter = this.state.homeCounter +1;
             saveData.scoreCounter = newHomeCounter;
             saveData.team = updatedStats.team;
             saveData.currentScore = newHomeCounter + '-' + this.state.awayCounter;
             saveData.scorer = updatedStats.scorer;
             saveData.assist = updatedStats.assist;
            } else{
            newAwayCounter = this.state.awayCounter +1;
            saveData.scoreCounter = newAwayCounter;
            saveData.team = updatedStats.team;
            saveData.currentScore = this.state.homeCounter + '-' + newAwayCounter;                saveData.scorer = updatedStats.scorer;
            saveData.assist = updatedStats.assist;
            }
            // console.log(saveData)
        axios
            .put('/openPlayers/putScoreHome',saveData)
            .then((res) => {
                console.log(res.data.goals)
                if (updatedStats.team === this.state.homeTeamId){
                    this.setState({
                        homeCounter: res.data.goals,
                        currentScore: res.data.goals + '-' + this.state.awayCounter,                        
                        // scorer:res.data.scorer,
                        // assist:res.data.assist
                        })
                }else{
                    this.setState({
                        awayCounter: res.data.goals,
                        currentScore: this.state.homeCounter + '-' + res.data.goals,                        
                        scorer:res.data.scorer,
                        assist:res.data.assist
                        })
                    }
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
                // console.log('deleting',saveData)
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
        console.log(localStorage.matchId)
        let genericId = ({
            matchId:localStorage.matchId
        })
        axios
        .post('/openPlayers/',genericId)
        .then((res)=> { 
            console.log(res.data)
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
                if (roster[i].teamid === res.data.homeTeamId){
                    homeTeam.push(roster[i])
                }else if (roster[i].teamid === res.data.awayTeamId){
                    awayTeam.push(roster[i])
                }
            }
            this.setState({
                loading:false,
                scoreboardData:res.data.scoreboardData,
                match:res.data.matchId,
                homeTeam:res.data.homeTeam,
                awayTeam:res.data.awayTeam,
                homeTeamId:res.data.homeTeamId,
                awayTeamId:res.data.awayTeamId,
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
                    <Scoreboard  
                        currentScore = {this.state.currentScore}
                        homeTeam = {this.state.homeTeam}
                        awayTeam = {this.state.awayTeam}
                        scoreboardData = {this.state.scoreboardData} />                  
                    <Score 
                        gameOver={this.state.gameOver} 
                        handleAwayScore={this.handleAwayScore} 
                        handleHomeScore={this.handleHomeScore}/>
                </div>
                <Menu   
                    loading={this.state.loading}
                    // updateStats={this.updateStats}
                    homeTeamId = {this.state.homeTeamId}
                    awayTeamId = {this.state.awayTeamId}
                    homeTeam = {this.state.homeTeam}
                    awayTeam = {this.state.awayTeam}
                    homeRoster={this.state.homeRoster}                        awayRoster={this.state.awayRoster} 
                    handleClose={this.handleClose}
                    submitHomeScore={this.submitHomeScore}
                    gameOver={this.state.gameOver} />

                <Stats 
                    currentScore = {this.state.currentScore}
                    homeTeam = {this.state.homeTeam}
                    awayTeam = {this.state.awayTeam}
                    homeTeamId = {this.state.homeTeamId}
                    awayTeamId = {this.state.awayTeamId}
                    homeRoster={this.state.homeRoster}
                    awayRoster={this.state.awayRoster}
                    handleHomeDelete = {this.handleHomeDelete}
                    handleDelete = {this.handleDelete}
                    match = {this.state.match} />
                        
                <div className="well" style={wellStyles}>
                    <Button bsStyle="primary" onClick={this.gameOver} bsSize="large" block>Game Over!</Button>
                </div>
                <Footer />
            </div>
        )
    }
}

export {Match};