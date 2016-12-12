import React, { Component } from 'react';
import {Link} from 'react-router';
import axios from 'axios';
import './App.css';

class MatchList extends Component{
    constructor(){
        super();
        this.state = ({
            match:[]
        })
        this.saveMatch = this.saveMatch.bind(this)
    }
    saveMatch(match){ 
        localStorage.matchId = match.matchID
    }
    componentDidMount(){
        axios.get('/createTeam/allMatch')
        .then((res)=>{
            let matchArr = [];
            for(let i=0; i<res.data.length; i++){
                let matchDescription = res.data[i].home_team + ' ' + res.data[i].final_score + ' ' + res.data[i].away_team
                let matchInfo = {
                    matchDescription:matchDescription,
                    matchID:res.data[i].id
                }
                matchArr.push(matchInfo)               
            }
            console.log(matchArr)
            this.setState({
                match:matchArr
            })
        })
    }
    render(){
        return(
            <div className="row">
                <div className="col-lg-6 col-lg-offset-3 col-sm-8 col-sm-offset-2">
                    <h3>Available Matches</h3>
                    {
                        this.state.match.map((match)=>{
                            return(
                                <Link to="/match">
                                        <div className="well " onClick={()=>this.saveMatch(match)} value={match.matchID}>
                                            <h4>{match.matchDescription}</h4>
                                        </div>                                </Link>
                            )
                        })
                    }
                    
                </div>
            </div>
        )
    }
}

export {MatchList};